"use client";

import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { parseError } from "@/components/utilities/helper";


export const WithdrawFundsModal = () => {
  const {
    showModal,
    setShowModal,
    user
  }: {
    user: any
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const withdraw = useMutation(api.savings.removeMoneyFromSavings);
  const savings = useQuery(api.savings.getUserSavings, {userId: user?._id});
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    amount: "",
    savings: "",
  };
  const validationSchema = yup.object().shape({
    savings: yup.object().label("Savings").required(),
    amount: yup.number().label("Amount").required(),
  });
  const handleWithdraw = async (values: FormikValues) => {
    setSubmitting(true);
    try {
      await withdraw({
        userId: user?._id as Id<"users">,
        savingsId: values.savings.value,
        amount: values.amount,
      });
      setShowModal("success");
      toast.success(`${values.amount} withdrawn successfully`, {id: "withdrawal"});
      setSubmitting(false);
    } catch (error: any) {
      if (error.includes("Insufficient funds")) toast .error("Insufficient funds", {id: "withdrawal"});
      else toast.error("Withdrawal failed, have you linked your account", {id: "withdrawal"});
      console.error(error);
      setSubmitting(false);
    }
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
            onSubmit={handleWithdraw}
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
                      Select savings you want to withdraw from
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="savings"
                      id="savings"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        savings || [],
                        "_id",
                        "name",
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
                        className="btn btn-md text-sm btn-primary letter-spacing-1"
                      />
                      <button
                        className="btn btn-md text-sm text-red"
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
