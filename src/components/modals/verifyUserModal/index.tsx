"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes, PaymentFrequency } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { CustomDatePicker } from "@/components/forms/dateRangePicker/datePicker";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PhoneInputField } from "@/components/shared/phoneInput";

export const VerifyUserModal = ({
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
    dob: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().label("Email Address").required(),
    password: yup.string().label("Password").required(),
  });

  const handleSave = async (
    values: { email: string; password: string },
    actions: any
  ) => {
    setSubmitting(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("flow", "signIn");

    signIn(provider ?? "password", formData)
      .then(() => {
        handleSent?.(values.email);
        actions.setSubmitting(false);
        setShowModal(null);
      })
      .catch((error) => {
        console.error(error);
        const title = "Could not sign in, Try again";
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
        show={showModal === "verifyUser"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSave}
            validateOnBlur={false}
          >
            {({ handleSubmit, setFieldValue, values, isValid }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">KYC Verification</h2>
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Enter BVN
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="1234567890"
                      type="text"
                      name="bvn"
                      id="bvn"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Enter NIN
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="1234567890"
                      type="text"
                      name="nin"
                      id="nin"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Date Of Birth
                    </label>
                    <div className="form-control border-grey-200 d-flex align-items-center gap-4 click">
                      <Icon color="#808080" width={18} icon="uiw:date" />
                      <CustomDatePicker
                        className="bg-transparent click text-black-000"
                        dateValue={values.dob}
                        setDateValue={(value: Date | null) => {
                          setFieldValue("dob", value);
                        }}
                        placeholder={"dd/mm/yyyy"}
                      />
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Address
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="No 2, XXXX Street"
                      type="text"
                      name="address"
                      id="address"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Phone Number
                    </label>
                    <Field
                      component={PhoneInputField}
                      country={"ng"}
                      name="phoneNumber"
                      inputProps={{
                        id: "phoneNumber",
                        className: "form-control w-100 border border-black00",
                      }}
                    />

                    <div className="d-flex justify-content-center align-items-center mt-4 ">
                      <Button
                        title="Proceed"
                        type="submit"
                        // disabled={isPending || !isValid}
                        // loading={isPending}
                        loadingTitle={"Please wait..."}
                        className="btn btn-lg text-sm btn-primary letter-spacing-1"
                      />
                    </div>
                  </>
                </Form>
              );
            }}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
