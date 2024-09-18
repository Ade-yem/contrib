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

export const CreateGroupModal = () => {
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
    groupName: "",
    memberNo: "",
    desc: "",
    amountGoal: "",
    frequency: "",
    keepGroupPrivate: false,
  };
  const validationSchema = yup.object().shape({
    groupName: yup.string().label("Group Name").required(),
    memberNo: yup.string().label("Number Of Members").required(),
    desc: yup.string().label("Group Description").required(),
    amountGoal: yup.string().label("Amount Goals").required(),
    frequency: yup.object().label("Payment Frequency").required(),
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
    } catch (error: any) {
      toast.error("Failed to create group:", error);
    }
    setSubmitting(false);
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
            onSubmit={handleCreateGroup}
            validateOnBlur={false}
          >
            {({ handleSubmit, isValid, setFieldValue }) => {
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
                        // disabled={submitting || !isValid}
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
