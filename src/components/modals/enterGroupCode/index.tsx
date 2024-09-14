"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import Button from "@/components/forms/Button";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import "./styles.scss";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const EnterGroupCodeModal = () => {
  const {
    showModal,
    setShowModal,
    user,
  }: {
    user: any;
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [discountCode, setDiscountCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValues, setInputValues] = useState(Array(6).fill(""));
  const router = useRouter();
  const accessGroupWithInviteCode = useMutation(
    api.group.joinGroupWithInviteCode
  );

  const verifygroup = async () => {
    setIsLoading(true);

    try {
      const group = await accessGroupWithInviteCode({
        userId: user!?._id,
        code: discountCode,
      });
      setShowModal("success");
      router.push(`/dashboard/groups/${group}`);
    } catch (error: any) {
      toast.error("Unable to join group", error);
    }
    setIsLoading(false);
  };

  const onChangeInput = (value: string, inputNumber: number) => {
    setErrorMessage("");
    const currentInput: HTMLInputElement | null = document.querySelector(
      `#group-code-input-${inputNumber}`
    );
    console.log(currentInput?.value);
    if (inputValues[inputNumber] && value) return;
    const nextInput = document.querySelector(
      `#group-code-input-${inputNumber + 1}`
    );
    if (value && nextInput && nextInput instanceof HTMLInputElement) {
      nextInput.focus();
    }
    const _inputValues = [...inputValues];
    const splittedValues = value
      .split(" ")
      .join("")
      .split("")
      .slice(0, 6 - inputNumber);
    console.log({ splittedValues });
    if (!value) {
      _inputValues[inputNumber] = "";
    }

    for (let i = 0; i < splittedValues.length && i < 5; i++) {
      const index = (inputNumber + i) % 5;
      _inputValues[index] = splittedValues[i];
      const _nextInput = document.querySelector(
        `#group-code-input-${index + 1}`
      );
      if (_nextInput && _nextInput instanceof HTMLInputElement) {
        _nextInput.focus();
      }
    }
    setInputValues(_inputValues);
    console.log({ _inputValues });
    if (_inputValues.length === 5) {
      setDiscountCode(_inputValues.join(""));
    } else {
      setDiscountCode("");
    }
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "groupCode"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <div className="enter-group-wrapper">
            <div>
              <div className="px-5_5 border mt-7 mx-auto py-8 mb-4_5">
                <p className="text-center fw-bold text-black-000">
                  ENTER GROUP CODE
                </p>
                <div className="d-flex justify-content-center gap-md-4 gap-2">
                  {[...Array(5)].map((_, index) => (
                    <input
                      // maxLength={1}
                      className="group-code-input border"
                      key={index}
                      id={`group-code-input-${index}`}
                      type="text"
                      onChange={({ target: { value } }) =>
                        onChangeInput(value, index)
                      }
                      value={inputValues[index]}
                    />
                  ))}
                </div>
                {errorMessage && (
                  <p className="text-error mt-3 mb-0 text-center text-sm">
                    {errorMessage}
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-center mb-9">
                <Button
                  title="Proceed"
                  loading={isLoading}
                  // disabled={!isLoading}
                  loadingTitle={"Please wait..."}
                  className="btn-lg btn btn-primary"
                  style={{ borderRadius: "1rem" }}
                  onClick={verifygroup}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
