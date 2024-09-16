"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes, PaymentFrequency } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const paymentFrequencySelect = Object.entries(PaymentFrequency).map((item) => ({
  label: item[1],
  value: item[0],
}));

export const WithdrawFundsModal = () => {
  const {
    showModal,
    setShowModal,
    user,
  }: {
    user: any;
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const addGroup = useAction(api.actions.addGroupAction);
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    savingName: "",
    amount: "",
    category: "",
    frequency: "",
    sourceFund: false,
  };
  const validationSchema = yup.object().shape({
    savingName: yup.string().label("Group Name").required(),
    amount: yup.string().label("Amount").required(),
    category: yup.object().label("Category").required(),
    frequency: yup.object().label("Frequency of Savings").required(),
    sourceFund: yup.object().label("Source of Fund").required(),
  });
  const handleCreateGroup = async (values: FormikValues) => {
    setSubmitting(true);
    try {
      await addGroup({
        creator_id: user?._id as Id<"users">,
        name: values.groupName,
        number_of_people: values.memberNo,
        interval: values.frequency.value,
        savings_per_interval: values.amountGoal,
        private: values.keepGroupPrivate,
        description: values.desc,
      });
      setShowModal("success");
      console.log(`${values.amount} saved successfully`);
    } catch (error: any) {
      toast.error("Failed to save:", error);
    }
    setSubmitting(false);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "withdrawFunds"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateGroup}
            validateOnBlur={false}
          >
            {({ handleSubmit, isValid, setFieldValue }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">Withdraw Funds</h2>
                      <p className="text-sm">You have done a great Job!</p>
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Enter Amount (₦)
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="e.g 200"
                      type="number"
                      min={0}
                      name="amount"
                      id="amount"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select withdrawal Method
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="withdrawalMethod"
                      id="withdrawalMethod"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        paymentFrequencySelect,
                        "value",
                        "label",
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("withdrawalMethod", selectedOption.value);
                      }}
                    />
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button
                        title="Withdraw"
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
