"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes, PaymentFrequency } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";

const paymentFrequencySelect = Object.entries(PaymentFrequency).map((item) => ({
  label: item[1],
  value: item[0],
}));

export const CreateGroupModal = ({
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
    groupName: "",
    memberNo: "",
    desc: "",
    amountGoal: "",
    gender: "",
    keepGroupPrivate: false,
  };

  const validationSchema = yup.object().shape({
    groupName: yup.string().label("Group Name").required(),
    memberNo: yup.string().label("Number Of Members").required(),
    desc: yup.string().label("Group Description").required(),
    amountGoal: yup.string().label("Amount Goals").required(),
    gender: yup.string().label("Gender").required(),
    password: yup.string().label("Password").required(),
  });

  const handleSave = async (values: FormikValues, actions: any) => {
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
        show={showModal === "createGroup"}
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
            {({ handleSubmit, isValid }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">Create New Group</h2>
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Name Your Group
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Enter desired group name"
                      type="text"
                      name="groupName"
                      id="groupName"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Number Of Members
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Enter desired number of member"
                      type="number"
                      min={0}
                      name="memberNo"
                      id="memberNo"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Describe Group
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Enter group description"
                      type="text"
                      name="desc"
                      id="desc"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Amount Goals (#)
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="i.e 1000"
                      type="number"
                      min={0}
                      step="0.01"
                      name="amountGoal"
                      id="amountGoal"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Payment Frequency
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="gender"
                      id="gender"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        paymentFrequencySelect,
                        "value",
                        "label",
                        true
                      )}
                    />
                    <label
                      htmlFor="keepGroupPrivate"
                      className="d-flex gap-3 align-items-center click mt-4"
                    >
                      <div>
                        <Field
                          className="form-check-input text-lg"
                          type="checkbox"
                          name="keepGroupPrivate"
                          id="keepGroupPrivate"
                        />
                      </div>
                      <p className="text-xs click mb-0">
                        Keep group private (optional)
                      </p>
                    </label>
                    <p className="text-xs text-red mt-4">
                      *Note: Contributions will commence when the group reaches
                      the expected number of members. The end date will then be
                      calculated from the start date according to the payment
                      frequency set.
                    </p>
                    <div className="d-flex justify-content-center align-items-center mt-4 ">
                      <Button
                        title="Create Group"
                        type="submit"
                        disabled={submitting || !isValid}
                        loading={submitting}
                        loadingTitle={"Please wait..."}
                        className="btn btn-lg text-sm btn-primary letter-spacing-1"
                      />
                      <button
                        className="btn btn-lg text-sm text-red"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
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
