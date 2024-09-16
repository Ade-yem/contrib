"use client";

import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes, PaymentMethod } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { parseError } from "@/components/utilities/helper";


export const AddMoney = () => {
  const {
    showModal,
    setShowModal,
    user
  }: {
    user: any
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const addWithCard = useAction(api.payments.ChargeTransaction);
  const bankTransfer = useAction(api.payments.initializePaystackTransaction);
  const savings = useQuery(api.savings.getUserSavings, {userId: user?._id});
  const [submitting, setSubmitting] = useState(false);
  const confirmTransaction = useAction(api.payments.verifyTransaction);

  const paymentMethodSelect = Object.entries(PaymentMethod).map((item) => ({
    label: item[1],
    value: item[0],
  }));

  const initialValues = {
    amount: "",
    savings: "",
    method: ""
  };
  const validationSchema = yup.object().shape({
    savings: yup.object().label("Savings").required(),
    method: yup.object().label("Payment Method").required(),
    amount: yup.number().label("Amount").required(),
  });

  const handleAddMoney = async (values: FormikValues) => {
    setSubmitting(true);
    try {
      if (values.method.value === "bank") {
        await payWithTransaction(values);
      } else {
        await payCard(values);
      }
      toast.success(`${values.amount} added successfully`, {id: "withdrawal"});
    } catch (error: any) {
      if (error.includes("Insufficient funds")) toast .error("Insufficient funds", {id: "withdrawal"});
      else toast.error("Savings failed, Please try again later", {id: "withdrawal"});
      console.error(error);
      setSubmitting(false);
    }
  };

  const payCard = async (values: FormikValues) => {
    const res = await addWithCard({
      email: user?.email,
      amount: values.amount,
      metadata: {
        details: "add savings",
        userId: user?._id,
        savingsId: values.savings.value,
      },
    });
    const stat = await confirmTransaction({ reference: res.reference });
    if (stat.data.status) setShowModal("success");
    else {setSubmitting(false);throw new Error("Savings failed");}

  };
  const payWithTransaction = async (values: FormikValues) => {
    const res = await bankTransfer({
      email: user?.email,
      amount: values.amount,
      metadata: {
        details: "add savings",
        userId: user?._id,
        savingsId: values.savings.value,
      },
    });
    if (res) {
      window.open(res.data.authorization_url, "_blank");
    }
    const stat = await confirmTransaction({ reference: res.data.reference });
    if (stat.data.status) setShowModal("success");
    {setSubmitting(false);throw new Error("Savings failed");}
  };





  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "addMoney"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleAddMoney}
            validateOnBlur={false}
          >
            {({ handleSubmit, isValid, setFieldValue }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">Add Funds</h2>
                      <p className="text-sm">Way to go!</p>
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
                        setFieldValue("savings", selectedOption.value);
                      }}
                    />

                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select Payment Method
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="method"
                      id="method"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        paymentMethodSelect,
                        "value",
                        "label",
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("method", selectedOption.value);
                      }}
                    />
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button
                        title="Proceed"
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
