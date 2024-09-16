"use client";

import { Form, Formik, FormikValues } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as yup from "yup";
import { AddressLocation } from "./addressLocation";
import { ProfileForm } from "./profileForm";
import Button from "@/components/forms/Button";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import { toUpperLetter } from "@/components/utilities/helper";

export default function ProfilePage() {
  const {
    setShowModal,
    user,
  }: {
    user: any;
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const updateProfile = useMutation(api.user.editProfile);
  const [submitting, setSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nin: "",
    bvn: "",
    dob: "",
    homeAddress: "",
    nationality: "",
    gender: {},
  });

  const validationSchema = yup.object().shape({
    firstName: yup.string().label("First Name").required(),
    lastName: yup.string().label("Last Name").required(),
    phoneNumber: yup.string().label("Last Name").required(),
    dob: yup.string().label("Field required").required(),
    homeAddress: yup.string().label("Home Address").required(),
    nationality: yup.string().label("Nationality").required(),
    gender: yup.object().label("Gender").required(),
  });
  const handleSave = (values: FormikValues) => {
    setSubmitting(true);

    const dob =
      typeof values.dob === "string" ? new Date(values.dob) : values.dob;

    const formattedDob =
      dob instanceof Date && !isNaN(dob.getTime())
        ? dob.toISOString()
        : undefined;

    updateProfile({
      first_name: values.firstName,
      last_name: values.lastName,
      phone: values.phoneNumber,
      user_id: user?._id as Id<"users">,
      nin: values.nin,
      bvn: values.bvn,
      dob: formattedDob, // Now dob will either be a string or undefined
      gender: values.gender.value,
      homeAddress: values.homeAddress,
      nationality: values.nationality,
    });

    setSubmitting(false);
    toast.success("Profile saved");
  };

  useEffect(() => {
    if (user) {
      setInitialValues({
        firstName: user.first_name,
        lastName: user.last_name,
        phoneNumber: user.phone,
        nin: user.nin,
        bvn: user.bvn,
        dob: user.dob,
        homeAddress: user.homeAddress,
        nationality: user.nationality,
        // gender: { value: user.gender, label: toUpperLetter(user.gender) },
        gender: user.gender
          ? { value: user.gender, label: toUpperLetter(user.gender) }
          : { value: "", label: "Select.." },
      });
    }
  }, [user]);

  return (
    <>
      {user?.kycVerified === false && (
        <button
          className="btn btn-md btn-primary ms-auto mb-4 mt-md-5"
          onClick={() => setShowModal("verifyUser")}
        >
          Verify your account
        </button>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSave}
        validateOnBlur={false}
        enableReinitialize
      >
        {({ handleSubmit, values, isValid, setFieldValue, resetForm }) => {
          return (
            <>
              <Form onSubmit={handleSubmit}>
                <ProfileForm
                  dateValue={values.dob}
                  setDateValue={(value: Date | null) => {
                    setFieldValue("dob", value);
                  }}
                />
                <AddressLocation />
                <div className="d-flex gap-5 align-items-center mt-5 mb-6 justify-content-end">
                  <p
                    className="text-red mb-0 click"
                    onClick={() => resetForm()}
                  >
                    Cancel
                  </p>
                  <Button
                    title="Save"
                    type="submit"
                    disabled={submitting || !isValid}
                    loading={submitting}
                    loadingTitle={"Please wait..."}
                    className="btn btn-md text-xs btn-primary text-sm"
                  />
                </div>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
}
