import React from "react";
import _x32_0_Success from "assets/images/_x32_0_Success.svg";
import { Icon } from "@iconify/react";
import "./style.scss";
import Modal from "react-bootstrap/Modal";

export const VerifySuccess = ({
  show,
  handleClose,
  openLogin,
}: {
  show: boolean;
  handleClose: any;
  openLogin: any;
}) => {
  const login = () => {
    handleClose();
    openLogin();
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Body>
        <div className="text-center">
          <div className="close-modal" onClick={handleClose}>
            <Icon icon="charm:square-cross" />
          </div>
          <img className="success-img" src={_x32_0_Success} alt="Success" />
          <h2 className="sub-title mt-5 mb-5">
            Account Successfully Verified!
          </h2>
          <button
            className="btn btn-blue-dark btn-md mx-auto mb-9"
            onClick={login}
          >
            Sign In Now
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
