import TextInput from "@/components/forms/TextInput";
import Loader from "@/components/shared/Loader";
import { LayoutContext } from "@/context/layoutContext";
import { Field } from "formik";
import React, { useContext } from "react";

export const AddressLocation = () => {
  const {
    user,
  }: {
    user: any;
  } = useContext(LayoutContext);

  return (
    <div className="bg-white-000 rounded w-100 p-5 mt-5">
      <p className="text-lg fw-bold">Addresses & Location</p>

      {!user ? (
        <Loader height="30vh" />
      ) : (
        <div className="row row-cols-1 row-cols-md-2 mb-4 mt-4_5">
          <div className="mb-4 pe-4_5">
            <label className="text-xs mb-0">Home Address*</label>
            <Field
              component={TextInput}
              className="form-control"
              placeholder="Enter your address"
              type="text"
              name="homeAddress"
              id="homeAddress"
            />
          </div>
          <div className="mb-4 pe-4_5">
            <label className="text-xs mb-0">Nationality*</label>
            <Field
              component={TextInput}
              className="form-control"
              placeholder="Enter your nationality"
              type="text"
              name="nationality"
              id="nationality"
            />
          </div>
        </div>
      )}
    </div>
  );
};
