import TextInput from "@/components/forms/TextInput";
import { Field } from "formik";
import React from "react";

export const AddressLocation = () => {
  return (
    <div className="bg-white-000 rounded w-100 p-5 mt-5">
      <p className="text-lg fw-bold">Addresses & Location</p>

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
            //   value={user?.firstName}
            //   disabled
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
            //   value={user?.lastName}
            //   disabled
          />
        </div>
      </div>
    </div>
  );
};
