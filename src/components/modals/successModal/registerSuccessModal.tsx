"use client";

import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";

import Image from "next/image";

export const RegisterSuccessModal = () => {
  const {
    showModal,
    setShowModal,
    countdown,
  }: {
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
    countdown: number | null;
  } = useContext(LayoutContext);

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "registerSuccess"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <div className="my-5 d-flex align-items-center flex-column">
            <p className="text-green text-2xl">Nailed It!</p>
            <Image
              src={"/success.svg"}
              alt="success img"
              width={120}
              height={120}
              className="pe-3"
            />
            <p className="text-green text-2xl">
              You&apos;ll be redirected to your profile page, where you can
              verify your account and update your profile details.
            </p>

            {countdown && (
              <p
                className="text-xs text-white-000 text-center bg-primary-500 d-flex align-items-center justify-content-center rounded-circle mt-5"
                style={{ width: "3.5rem", height: "3.5rem" }}
              >
                {countdown}s
              </p>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
