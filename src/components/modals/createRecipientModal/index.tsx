"use client";

import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import toast from "react-hot-toast";
import { Field, Form, Formik, FormikValues } from "formik";
import * as yup from "yup";
import Button from "@/components/forms/Button";
import TextInput from "@/components/forms/TextInput";
import { ModalTypes, PaymentFrequency, PaymentMethod } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { useAction, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const CreateRecipientModal = () => {
  const {
    showModal,
    setShowModal,
    user,
  }: {
    user: any;
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const createRecipient = useAction(api.transfers.createRecipient);
  const createRecipientFromAuth = useAction(api.transfers.createRecipientFromAuthorization);
  const getBanks = useAction(api.recipient.getBanks);
  const resolveAccountNumber = useAction(api.recipient.resolveAccountNumber);
  const [submitting, setSubmitting] = useState(false);
  const [banks, setBanks] = useState<{
    name: string;
    code: string;
    }[]>([]);
  useEffect(() => {
    const loadBanks = async () => {
      const res = await getBanks({ currency: "NGN" });
      setBanks(res);
    };
    loadBanks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const initialValues = {
    name: "",
    account_number: "",
    bank_code: "",
  };
  const validationSchema = yup.object().shape({
    name: yup.string().label("Name").required(),
    account_number: yup.string().label("Account Number").required(),
    bank_code: yup.object().label("Banks").required(),
  });
  const handleCreateRecipient = async (values: FormikValues) => {
    setSubmitting(true);
    try {
      await createRecipient({
        userId: user?._id as Id<"users">,
        type: "nuban",
        name: values.name,
        account_number: values.account_number,
        bank_code: values.bank_code,
        currency: "NGN",
      });
      setShowModal("success");
      console.log(`${values.amount} saved successfully`);
    } catch (error: any) {
      toast.error("Failed to save:", error);
    }
    setSubmitting(false);
  };
  const createFromAuthorization = async () => {
    try {
      setSubmitting(true);
      const res = await createRecipientFromAuth({
        name: user!?.first_name + " " + user!?.last_name,
        email: user?.email,
        userId: user?._id as Id<"users">,
      });
      if (res) {
        setShowModal("success");
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  }

  const handleResolveAccountNumber = async (value: string, val: FormikValues) => {
    if (value.length === 10) {
      try{
        const res = await resolveAccountNumber({
          account_number: value,
          bank_code: val.bank_code,
        });
        return res.account_name;
      } catch (error) {
        toast.error("Failed to resolve account number");
        console.log(error);
      }
    }
  }

  const closeModal = () => {
    setShowModal(null);
  };

  return (
    <>
      <Modal
        show={showModal === "createRecipient"}
        onHide={closeModal}
        centered
        className="modal-mobile"
      >
        <Modal.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleCreateRecipient}
            validateOnBlur={false}
          >
            {({ handleSubmit, isValid, setFieldValue }) => {
              return (
                <Form className="py-5 mx-sm-5 mx-4_5" onSubmit={handleSubmit}>
                  <>
                    <div className="text-center">
                      <h2 className="modal-sub-title">Create Transfer Recipient</h2>
                      <p className="text-sm">You have done a great Job!</p>
                    </div>
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Select Bank
                    </label>
                    <Field
                      component={ThemedSelect}
                      name="bankName"
                      id="bankName"
                      size="base"
                      options={convertModelArrayToSelectOptions(
                        banks,
                        "code", // Bank code as the value
                        "name", // Bank name as the label
                        true
                      )}
                      onChange={(selectedOption: any) => {
                        // Ensure you extract the value from the selected option
                        setFieldValue("bank_code", selectedOption.value);
                        setFieldValue("bankDisplayName", selectedOption.label); // Store the bank name for display
                      }}
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Enter Account Number
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="e.g 0123456789"
                      type="text"
                      maxLength={10}
                      name="account_number"
                      id="account_number"
                      onChange={(e: any) => {
                        const res = handleResolveAccountNumber(e.value, e.target.formik.values)
                        setFieldValue("name", res);
                      }}
                    />
                    <label className="text-xs text-grey-300 mt-4 mb-2">
                      Name
                    </label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Your name"
                      disabled
                      type="text"
                      min={0}
                      name="name"
                      id="name"
                    />

                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <Button
                        title="Create Recipient"
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
                      <button type="button" 
                        className="btn btn-lg text-sm btn-primary letter-spacing-1"
                        onClick={createFromAuthorization}
                      >
                        Create from Card
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
