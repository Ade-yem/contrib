import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { RegisterSuccess } from "./success";
import "./style.scss";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "sharedComponents/forms/Button";
import TextInput from "sharedComponents/forms/TextInput";
import useNetworkData from "hooks/useNetworkData";
import { signUpRequest } from "services/network/auth";
import { toast } from "react-toastify";
import { GoogleAuthButton } from "./socialAuths/GoogleAuthButton";
import { FacebookAuthButton } from "./socialAuths/FacebookAuthButton";

export const RegisterModal = ({
  show,
  handleClose: closeModal,
  openLogin,
}: {
  show: boolean;
  handleClose: any;
  openLogin: any;
}) => {
  const [step, setStep] = useState(1);
  const { isLoading, makeRequest } = useNetworkData();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [unverify, setUnverify] = useState({});
  const formRef = useRef<any>(null);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    email: yup.string().label("Email Address").required(),
    password: yup
      .string()
      .label("Password")
      .min(6)
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/, " ")
      .required(),
    confirmPassword: yup
      .string()
      .label("Confirm Password")
      .oneOf([null, yup.ref("password")], "Both passwords need to be the same")
      .required(),
  });

  const handleSignUp = async (formValues: any) => {
    const response = await makeRequest({
      payload: formValues,
      apiRequest: signUpRequest,
    });
    if (response) {
      toast.success(`Registration successful!`);
      setUnverify(response.success);
      setStep(2);
    }
  };

  const handleClose = () => {
    setStep(1);
    closeModal();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        size="xl"
      >
        <Modal.Body>
          {step === 1 ? (
            <div className="row">
              <div className="col-lg-6 col-12 pt-5 pb-5 px-7">
                <div className="close-modal" onClick={handleClose}>
                  <Icon icon="charm:square-cross" />
                </div>
                <Formik
                  innerRef={formRef}
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSignUp}
                  validateOnBlur={false}
                >
                  {({ handleSubmit, isValid, errors }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <>
                          <h2 className="sub-title ">Sign Up</h2>
                          <div className="row">
                            <div className="col-lg-6 col-md-12">
                              <label className="text-xs  mt-4 mb-2 ms-3">
                                First Name
                              </label>
                              <Field
                                component={TextInput}
                                className="form-control place"
                                placeholder="Enter First Name"
                                name="firstName"
                                id="firstName"
                              />
                            </div>
                            <div className="col-md-12 col-lg-6">
                              <label className="text-xs  mt-4 mb-2 ms-3">
                                Last Name
                              </label>
                              <Field
                                component={TextInput}
                                className="form-control place"
                                placeholder="Enter Last Name"
                                name="lastName"
                                id="lastName"
                              />
                            </div>
                          </div>
                          <label className=" text-xs  mt-4 mb-2 ms-3">
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
                          <label className=" text-xs  mt-4 mb-2 ms-3">
                            Password
                          </label>
                          <Field
                            component={TextInput}
                            type="password"
                            className="form-control place"
                            placeholder="Enter Password"
                            name="password"
                            id="password"
                          />
                          {errors.password && (
                            <p className="text-xs fw-medium text-danger">
                              Password must be at least 6 characters in length
                              and must contain at least 1 lowercase letter, 1
                              uppercase letter and 1 number
                            </p>
                          )}
                          <label className=" text-xs  mt-4 mb-2 ms-3">
                            Confirm Password
                          </label>
                          <Field
                            component={TextInput}
                            type="password"
                            className="form-control place"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                          />
                          <label className=" text-xs text-black-200 click  mt-4 mb-2 ms-3">
                            <input
                              checked={agreeTerms}
                              className="form-check-input me-3"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                              onChange={({ target: { checked } }) => {
                                setAgreeTerms(checked);
                              }}
                            ></input>
                            I have read and accept the{" "}
                            <Link
                              to={"/terms"}
                              className="text-primary-400 text-decoration-none"
                            >
                              Terms and Conditions
                            </Link>
                          </label>
                          <Button
                            title="Sign Up"
                            type="submit"
                            // disabled={isLoading || !isValid || !agreeTerms}
                            loading={isLoading}
                            loadingTitle={"Please wait..."}
                            className="btn text-xs btn-md btn-blue-dark w-100 mt-4"
                          />
                          <div className="row my-3">
                            <div className="col-4 border-line   my-auto"></div>
                            <div className="col-1 mx-auto text-lg">Or </div>
                            <div className="col-4  border-line my-auto"></div>
                          </div>

                          <GoogleAuthButton
                            closeModal={handleClose}
                            title="Continue with Google"
                            className={"btn text-xs btn-auth"}
                          />

                          <FacebookAuthButton
                            title="Continue with Facebook"
                            closeModal={handleClose}
                            className={"btn text-xs btn-auth mt-3"}
                          />
                        </>
                      </Form>
                    );
                  }}
                </Formik>
              </div>

              <div className="col-lg-6 d-mobile col-12">
                <div className=" NewUser-bg  pb-4 px-7 pt-5">
                  <div className="close-modal" onClick={handleClose}>
                    <Icon icon="charm:square-cross" />
                  </div>
                  <h2 className="sub-title text-2xl">Join QuickStay...</h2>
                  <div className=" ms-4 mt-5 d-flex gap-4">
                    <div className="text-primary-600">
                      <Icon icon="emojione-v1:heavy-check-mark" />
                    </div>
                    <p className="text-xs my-0">Free to register</p>
                  </div>
                  <div className=" ms-4 my-4 d-flex gap-4">
                    <div className="text-primary-600">
                      <Icon icon="emojione-v1:heavy-check-mark" />
                    </div>
                    <p className="text-xs my-0 ">Manage your bookings</p>
                  </div>
                  <div className=" ms-4 my-4 d-flex gap-4">
                    <div className="text-primary-600">
                      <Icon icon="emojione-v1:heavy-check-mark" />
                    </div>
                    <p className="text-xs my-0">Book a place faster</p>
                  </div>
                  <div className=" ms-4 my-4 d-flex gap-4">
                    <div className="text-primary-600">
                      <Icon icon="emojione-v1:heavy-check-mark" />
                    </div>
                    <p className="text-xs my-0">Showcase your properties</p>
                  </div>
                  <p className="text-xs mt-9">
                    Already have a QuickStay Account?
                  </p>
                  <button
                    className="btn text-xs btn-md btn-blue-dark w-100 mt-5"
                    onClick={openLogin}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <RegisterSuccess
              onHide={handleClose}
              email={formRef.current?.values?.email || ""}
              unverify={unverify || {}}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
