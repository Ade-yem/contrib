"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { CustomDatePicker } from "@/components/forms/dateRangePicker/datePicker";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PhoneInputField } from "@/components/shared/phoneInput";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const VerifyUserModal = () => {
  const {
    showModal,
    setShowModal,
    user,
  }: {
    user: any;
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const kycVerification = useMutation(api.user.kycVerification);
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    bvn: "",
    nin: "",
    dob: "",
    homeAddress: "",
    phone: "",
  };
  const validationSchema = yup.object().shape({
    bvn: yup.string().label("BVN").required(),
    nin: yup.string().label("NIN").required(),
    dob: yup.string().label("Date Of Birth").required(),
    homeAddress: yup.string().label("Home address").required(),
    phone: yup.number().label("Phone No").required(),
  });
  const handleProceed = async (values: FormikValues) => {
    console.log("Submitting group data...", values);
    setSubmitting(true);
    try {
      await kycVerification({
        bvn: values.bvn,
        nin: values.nin,
        dob: values.dob.toISOString(),
        homeAddress: values.homeAddress,
        phone: values.phone,
      });
      setShowModal("success");
    } catch (error: any) {
      toast.error("Unable to verify:", error);
    }
    setSubmitting(false);
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
            onSubmit={handleProceed}
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
                      name="homeAddress"
                      id="homeAddress"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Phone Number
                    </label>
                    <Field
                      component={PhoneInputField}
                      country={"ng"}
                      name="phone"
                      inputProps={{
                        id: "phone",
                        className: "form-control w-100 border border-black00",
                      }}
                    />
                    {!isValid && (
                      <p className="text-xs text-red mt-4">
                        *Note: Please fill in all the inputs to proceed.
                      </p>
                    )}
                    <div className="d-flex justify-content-center align-items-center mt-4 ">
                      <Button
                        title="Proceed"
                        type="submit"
                        disabled={submitting || !isValid}
                        loading={submitting}
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
