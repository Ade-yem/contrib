"use client";

import { Icon } from "@iconify/react";
import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import GoogleSignIn from "@/components/buttons/Google";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import Image from "next/image";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import "./style.scss";

export const RegisterModal = ({
  provider,
  handleSent,
  handlePasswordReset,
}: {
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}) => {
  const {
    showModal,
    setShowModal,
  }: {
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const { signIn } = useAuthActions();
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    signUp: "signUp",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().label("Email Address").required(),
    password: yup.string().label("Password").required(),
  });

  const handleRegister = async (
    values: { email: string; password: string; signUp: string },
    actions: any
  ) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("flow", values.signUp);

    signIn(provider ?? "password", formData)
      .then(() => {
        handleSent?.(values.email);
        actions.setSubmitting(false);
        setShowModal(null);
      })
      .catch((error) => {
        console.error(error);
        const title = "Could not sign up, Try again";
        toast.error(title, { id: "auth" });
        setSubmitting(false);
        actions.setSubmitting(false);
      });
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "register"}
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleRegister}
                validateOnBlur={false}
              >
                {({ handleSubmit, isValid }) => {
                  return (
                    <Form className="pt-0" onSubmit={handleSubmit}>
                      <>
                        <h2 className="text-2xl text-center">
                          Welcome to JEKAJODAWO
                        </h2>
                        <p className="text-xs text-gray-400 mt-4 mb-2 text-center">
                          Building Financial Futures together while you unlock
                          unlimited potentials.
                        </p>
                        <label className="text-xs  mt-4 mb-2">
                          Email Address
                        </label>
                        <Field
                          component={TextInput}
                          className="form-control place"
                          placeholder="Enter Email Address"
                          type="email"
                          name="email"
                          id="email"
                        />
                        <label className=" text-xs  mt-4 mb-2">Password</label>
                        <Field
                          component={TextInput}
                          type="password"
                          className="form-control place"
                          placeholder="Enter Password"
                          name="password"
                          id="password"
                        />
                        <p className="text-xs text-primary-400 click  mt-4 mb-2">
                          Forgot Password?
                        </p>
                        <Button
                          title="Sign Up"
                          type="submit"
                          disabled={submitting || !isValid}
                          loading={submitting}
                          loadingTitle={"Please wait..."}
                          className="btn btn-md text-xs btn-primary w-100 mt-4"
                        />
                        <div className="row my-3">
                          <div className="col-4 border-line   my-auto"></div>
                          <div className="col-1 mx-auto text-lg">Or </div>
                          <div className="col-4  border-line my-auto"></div>
                        </div>
                      </>
                    </Form>
                  );
                }}
              </Formik>
              <GoogleSignIn />
              <p className="text-sm text-center mt-4 d-desktop">
                Have an Account?{" "}
                <span
                  className="text-primary-500"
                  role="button"
                  onClick={() => setShowModal("login")}
                >
                  Sign In
                </span>
              </p>
            </div>

            <div className="col-lg-6 d-mobile col-12 order-lg-2">
              <div className="NewUser-bg pb-5 px-7 d-lg-block d-none text-white-000">
                <div className="close-modal" onClick={closeModal}>
                  <Icon icon="charm:square-cross" />
                </div>
                <h2 className="sub-title pt-5 mb-4">Have an Account...</h2>
                <div
                  style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <Image
                    src={"/loginImg.svg"}
                    alt="A pretty lady"
                    width={120}
                    height={120}
                    className="pe-3"
                  />
                </div>
                <p className="text-xs mt-4">
                  Welcome back to Jekajodawo! Sign in to manage your savings,
                  connect with other members, and contribute to your thrift
                  group. Group administrators can also sign in here to manage
                  their thrift groups.
                </p>
                <button
                  className="btn btn-md text-xs btn-black w-100 mt-5"
                  onClick={() => setShowModal("login")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
