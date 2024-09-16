"use client";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from 'next/image';
import { Id } from '../../../../convex/_generated/dataModel';

export default function LinkedAccounts() {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const [modalShow, setModalShow] = React.useState(false);
  const user = useQuery(api.user.getUser);
  const cards = useQuery(api.authorization.getAuthorization, {userId: user!?._id});
  const paymentDetails = useQuery(api.paymentMethod.getPaymentMethods, {userId: user!?._id})
  return (
    <div className='position-relative'>
      <div className="d-flex justify-content-center gap-3">
      <div className="d-flex justify-content-start mx-3 w-50 gap-3 border border-1 click py-3 px-2 rounded-3 border-dark mt-3"
            // onClick={() => setShowModal("createRecipient")}
          >
            <Icon
            icon={"fa:bank"} />
            <div className='mt-2 text-md font-bold'>
              
                <p>{paymentDetails?.[0].account_name}</p>
              
            </div>
        </div>
      <div className="d-flex justify-content-start mx-3 w-50 gap-3 border border-1 click py-3 px-2 rounded-3 border-dark mt-3"
            // onClick={() => setShowModal("createRecipient")}
          >
            <Icon
            icon={"fa:bank"} />
            <div className='mt-2 text-md font-bold'>
              
                <p>{paymentDetails?.[0].account_name}</p>
              
            </div>
        </div>
      </div>

      <div className="bottom-5 right-3 rounded-circle bg-white click position-absolute">
        <Icon
          icon="akar-icons:plus"
          width="4rem"
          height="4rem"
          className="p-3 text-blue font-bold"
          onClick={() => setModalShow(true)}
        />
      </div>
      <AddLinkedAccountModal show={modalShow} onHide={() => setModalShow(false)}/>

    </div>
  );
}

interface AddLinkedAccountModalProps {
  show: boolean;
  onHide: () => void;
}

function AddLinkedAccountModal(props: AddLinkedAccountModalProps) {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const initializeTransaction = useAction(
    api.payments.initializePaystackTransaction
  );
  const user = useQuery(api.user.getUser);
  const addCard = async () => {
    const res = await initializeTransaction({
      amount: 100,
      email: user?.email as string,
      metadata: {
        userId: user?._id as Id<"users">,
        details: "add card",
      },
    });
    if (res) {
      window.open(res.data.authorization_url, "_blank");
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter" className='d-flex gap-3'>
          <span className="go-back-arrow click" onClick={props.onHide}>
            <Image
              src="/long-arrow-left.svg"
              alt="back"
              height={20}
              width={20}
            />
          </span>
          <span>Link card or Bank Account</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column gap-3 justify-content-center">
          <div className="d-flex justify-content-start mx-3 gap-3 border border-1 click py-3 px-2 rounded-3 border-dark mt-3"
            onClick={() => setShowModal("createRecipient")}
          >
            <div style={{width: "30px", height: "30px", backgroundColor: "purple", opacity: 0.2}} className='bg-purple-50 rounded-circle'></div>
            <div className='mt-2 text-md font-bold'>
              Add Bank Account
            </div>
          </div>
          <div className="d-flex justify-content-start mx-3 gap-3 border border-1 click py-3 px-2 rounded-3 border-dark mb-3"
            onClick={addCard}
          >
            <div style={{width: "30px", height: "30px", backgroundColor: "blue", opacity: 0.2}} className='bg-blue-50'></div>
            <div className='mt-2 text-md font-bold'>
              Add Card
            </div>
          </div>
        </div>
      </Modal.Body>

    </Modal>
  )
}