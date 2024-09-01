"use client";
import TextInput from "@/components/forms/TextInput";
import { Field, Form, Formik, FormikValues } from "formik";
import Image from "next/image";
import React from "react";
import * as yup from "yup";

export default function ProfilePage() {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().label("Email Address").required(),
    password: yup.string().label("Password").required(),
  });
  const handleLogin = () => {
    console.log("first");
  };
  return (
    <div>
      {/* ProfilePageProfilePageProfilePageProfilePageProfilePageProfilePage
      ProfilePage ProfilePage ProfilePage ProfilePage ProfilePage ProfilePage
      ProfilePage */}
      <div className="bg-white-000 rounded w-100 p-5">
        <p className="text-lg">Personal Details</p>
        <Image src={"/avatar.svg"} width={70} height={70} alt="profile-pics" />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
          validateOnBlur={false}
        >
          {({ handleSubmit, isValid }) => {
            return (
              <Form className="mt-4_5" onSubmit={handleSubmit}>
                <div className="row row-cols-1 row-cols-md-3 mb-4">
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">First Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="firstName"
                      id="firstName"
                      //   value={user?.firstName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">First Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="firstName"
                      id="firstName"
                      //   value={user?.firstName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">First Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="firstName"
                      id="firstName"
                      //   value={user?.firstName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                  <div className="mb-4 pe-4_5">
                    <label className="text-xs mb-0">Last Name*</label>
                    <Field
                      component={TextInput}
                      className="form-control"
                      placeholder="Johny"
                      type="text"
                      name="lastName"
                      id="lastName"
                      //   value={user?.lastName}
                      //   disabled
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

//   <div className="row row-cols-1 row-cols-md-2 mb-4">
//     <div className="mb-md-0 mb-4">
//       <label className="text-xs mb-0">First Name*</label>
//       <Field
//         component={TextInput}
//         className="form-control"
//         placeholder="Johny"
//         type="text"
//         name="firstName"
//         id="firstName"
//         //   value={user?.firstName}
//         //   disabled
//       />
//     </div>
//     <div>
//       <label className="text-xs mb-0">Last Name*</label>
//       <Field
//         component={TextInput}
//         className="form-control"
//         placeholder="Johny"
//         type="text"
//         name="lastName"
//         id="lastName"
//         //   value={user?.lastName}
//         //   disabled
//       />
//     </div>
//   </div>;
