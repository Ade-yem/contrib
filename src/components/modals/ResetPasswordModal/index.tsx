"use client";

import { ResetPasswordWithEmailCode } from "@/components/forms/auth/ResetPasswordWithEmailCode";
import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";
import React, {useContext} from "react";
import { Modal } from "react-bootstrap";
import { Icon } from "@iconify/react";

export const ResetPassword: React.FC = () => {
  const {
    showModal,
    setShowModal,
  }: {
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
    <Modal
        show={showModal === "resetPassword"}
        onHide={closeModal}
        centered
        backdrop="static"
        size="lg"
      >
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6 col-12 pt-5 pb-5 px-lg-5_6 px-5">
              <div className="close-modal" onClick={closeModal}>
                <Icon icon="charm:square-cross" />
              </div>
              <ResetPasswordWithEmailCode handleCancel={() => setShowModal("login")} provider="password-code" />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}