"use client";

import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import {
  ModalTypes,
  PaymentFrequency,
  Categories,
  PaymentMethod,
} from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

const paymentFrequencySelect = Object.entries(PaymentFrequency).map((item) => ({
  label: item[1],
  value: item[0],
}));

const paymentMethodSelect = Object.entries(PaymentMethod).map((item) => ({
  label: item[1],
  value: item[0],
}));

const CategoriesSelect = Object.entries(Categories).map((item) => ({
  label: item[1],
  value: item[0],
}));

export const CreatePersonalSavingsModal = () => {
  const {
    showModal,
    setShowModal,
    user,
  }: {
    user: any;
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const addSavings = useMutation(api.savings.createSavings);
  const payWithCard = useAction(api.payments.ChargeTransaction);
  const otherMethod = useAction(api.payments.initializePaystackTransaction);
  const confirmTransaction = useAction(api.payments.verifyTransaction);
  const [submitting, setSubmitting] = useState(false);
  const initialValues = {
    savingName: "",
    category: "",
    frequency: undefined,
    payment: undefined,
    amount: 0,
    amountTarget: 0,
  };
  const validationSchema = yup.object().shape({
    savingName: yup.string().label("Savings Name").required(),
    amount: yup.number().label("Initial Amount").optional(),
    amountTarget: yup.number().label("Target Amount").required(),
    category: yup.object().label("Category").required(),
    frequency: yup.object().label("Frequency of Savings").optional(),
    payment: yup.object().label("Payment Method").optional(),
  });
  const createSavings = async (values: FormikValues) => {
    setSubmitting(true);
    try {
      if (values.amount && values.payment.value === "card") {
        await payCard(values);
      } else if (values.amount && values.payment.value === "bank") {
        await payWithTransaction(values);
      } else {
        await addSavings({
          userId: user?._id as Id<"users">,
          name: values.savingName,
          amount: 0,
          reason: values.category.value,
          interval: values.frequency ? values.frequency.value : values.frequency,
          amountTarget: values.amountTarget,
        });
        setShowModal("success");
      }
    } catch (error: any) {
      console.error(error)
      toast.error("Failed create to save");
    }
    setSubmitting(false);
  };

  const payCard = async (values: FormikValues) => {
    const res = await payWithCard({
      email: user?.email,
      amount: values.amount,
      metadata: {
        details: "create savings",
        userId: user?._id,
        name: values.savingName,
        reason: values.category.value,
        interval: values.frequency ? values.frequency.value : values.frequency,
      },
    });
    const stat = await confirmTransaction({ reference: res.reference });
    if (stat.data.status) setShowModal("success");
    else toast.error("Transaction failed");

  };
  const payWithTransaction = async (values: FormikValues) => {
    const res = await otherMethod({
      email: user?.email,
      amount: values.amount,
      metadata: {
        details: "create savings",
        userId: user?._id,
        name: values.savingName,
        reason: values.category.value,
        interval: values.frequency ? values.frequency.value : values.frequency,
      },
    });
    if (res) {
      window.open(res.data.authorization_url, "_blank");
      const stat = await confirmTransaction({ reference: res.data.reference });
      if (stat.data.status) setShowModal("success");
      else toast.error("Transaction failed");
    }
  };
  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "createPersonalSavings"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={createSavings}
            validateOnBlur={false}
          >
            {({ handleSubmit, isValid, setFieldValue }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">
                        Create Personal Saving Plan
                      </h2>
                      <p className="text-sm">
                        Set up a Convenient Savings Plan for yourself
                      </p>
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Name Your Plan
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="e.g Jekajodawo"
                      type="text"
                      name="savingName"
                      id="savingName"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select Category
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="category"
                      id="category"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        CategoriesSelect,
                        "value",
                        "label",
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("category", selectedOption.value);
                      }}
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select Frequency of Savings
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="frequency"
                      id="frequency"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        paymentFrequencySelect,
                        "value",
                        "label",
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("frequency", selectedOption.value);
                      }}
                    />

                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Initial Amount (₦)
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="1000"
                      min={0}
                      step="0.01"
                      type="number"
                      name="amount"
                      id="amount"
                    />

                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Target Amount (₦)
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="1000"
                      min={0}
                      step="0.01"
                      type="number"
                      name="amountTarget"
                      id="amountTarget"
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select Payment Method
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="payment"
                      id="payment"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        paymentMethodSelect,
                        "value",
                        "label",
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("payment", selectedOption.value);
                      }}
                    />
                    {!isValid && (
                      <p className="text-xs text-red mt-4">
                        *Note: Please fill in all the inputs to proceed.
                      </p>
                    )}
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button
                        title="Create savings"
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
