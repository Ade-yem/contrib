"use client";
import Modal from 'react-bootstrap/Modal';
import React, { useState } from "react";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { useContext } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from 'next/image';
import { Id } from '../../../../convex/_generated/dataModel';
import { Accordion, Card, useAccordionButton } from 'react-bootstrap';

function CustomToggle({eventKey}: {eventKey: string}) {
  const [up, setUp] = useState(false);
  const decOnClick = useAccordionButton(eventKey, () => setUp(prev => !prev))
  return(
    <Icon
    icon={!up  ? "ph:caret-right-bold" : "ph:caret-left-bold"}
    className='click mt-2'
    onClick={decOnClick}
    />
  )
}

export default function LinkedAccounts() {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const [modalShow, setModalShow] = React.useState(false);
  const user = useQuery(api.user.getUser);
  const cards = useQuery(api.authorization.getAuthorizations, {userId: user?._id});
  const paymentDetails = useQuery(api.paymentMethod.getPaymentMethods, {userId: user?._id});

  return (
    <div className='container'>
      <div className="ms-auto rounded-circle bg-white d-flex justify-content-center align-items-center click " style={{height: "4rem", width: "4rem"}}>
        <Icon
          icon="akar-icons:plus"
          width="4rem"
          height="4rem"
          className="p-3 font-weight-bold"
          style={{color: '#3c0df5'}}
          onClick={() => setModalShow(true)}
        />
      </div>
      <div className="row">
        <Accordion className="w-100 w-lg-50 w-md-70 mt-2 col">
          <h2 className="m-2">
            Linked Accounts
          </h2>
          {paymentDetails?.map((details, index) => (
          <Card key={details._id} className="p-2 mt-4"
          >
            <Card.Header className="d-flex justify-content-start w-100 gap-3 click bg-transparent rounded-3 p-4">  
              <Icon
              icon={"fa:bank"} 
              className='text-lg mt-2' style={{color: '#3c0df5'}}
              />
              <div className='mt-2 text-md font-weight-bold'>
                <p>{details.bank_name.toUpperCase()}</p>
              </div>
              <div>
                <CustomToggle eventKey={`${index}`}/>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`}>
            <Card.Body className='d-flex flex-column gap-2'>
              <span className='text-sm font-weight-light'>Account details</span>
              <span className='text-lg font-weight-bold'>{details.account_number || "No account number"}</span>
              <span className='text-sm font-weight-light'>{details.account_name || "No name"}</span>
            </Card.Body>
            </Accordion.Collapse>
          </Card>
          ))}
        </Accordion>
        <div className="w-100 d-block d-sm-none"></div>
          <Accordion className="w-100 w-lg-50 w-md-70 mt-2 col">
            <h2 className="m-2">Linked Card</h2>
          {cards?.map((card, index) => (
          <Card  key={card._id} className="p-2 mt-4"
          >
            <Card.Header className="d-flex justify-content-start w-100 gap-3 click bg-transparent rounded-3 p-4"> 
              <div className='mt-2 text-md font-weight-bold'>
                <p>{card.brand.toUpperCase()}</p>
              </div>
              <div className='mt-2 text-md font-weight-bold'>
                <p>{card.bank.toUpperCase()}</p>
              </div>
              <div>
                <CustomToggle eventKey={`${index}`}/>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={`${index}`} className="mt-2 w-100 mx-auto bg-purple">
            <Card.Body className="rounded-5 p-4 col-6 d-flex flex-column w-100 justify-content-between gap-4">
              <div className="d-flex justify-content-between">
                <p className="text-white-000 text-xs fw-bold">{card?.bank}</p>
                <p className="text-white-000 text-xs">
                  {card?.brand.toUpperCase()}
                </p>
              </div>
              <p className="text-white-000 text-xs">
                {card?.bin} **** **** {card?.last4}
              </p>
              <div className="d-flex justify-content-between">
                <p className="text-white-000 text-xs">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-white-000 text-xs">
                  {card?.exp_month}/{card?.exp_year}
                </p>
              </div>
            </Card.Body>
            </Accordion.Collapse>
          </Card>
          ))}
        </Accordion>
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
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="p-4">
        <Modal.Title id="contained-modal-title-vcenter" className='d-flex gap-3'>
          <span className="go-back-arrow click ml-3" onClick={props.onHide}>
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
      <Modal.Body className="p-3">
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