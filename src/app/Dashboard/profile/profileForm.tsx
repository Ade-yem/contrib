// "use client";
import { CustomDatePicker } from "@/components/forms/dateRangePicker/datePicker";
import TextInput from "@/components/forms/TextInput";
import ThemedSelect from "@/components/forms/ThemedSelect";
import { PhoneInputField } from "@/components/shared/phoneInput";
import { convertModelArrayToSelectOptions } from "@/components/utilities";
import { Gender } from "@/services/_schema";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation } from "convex/react";
import { Field, FormikValues } from "formik";
import Image from "next/image";
import React, { FormEvent, useContext, useRef, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { LayoutContext } from "@/context/layoutContext";
import Loader from "@/components/shared/Loader";

interface profilePropTypes {
  setDateValue: (e: any) => void;
  dateValue: any;
}

const genderSelect = Object.entries(Gender).map((item) => ({
  label: item[1],
  value: item[0],
}));

export const ProfileForm = (props: profilePropTypes) => {
  const {
    user,
  }: {
    user: any;
  } = useContext(LayoutContext);
  console.log(user);
  const generateUploadUrl = useMutation(api.user.generateUserProfileUploadUrl);
  const sendImage = useMutation(api.user.saveUserProfileImage);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
    event.preventDefault();

    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();

    // Step 2: POST the file to the URL
    const result = await fetch(
      "https://watchful-zebra-416.convex.cloud/api/storage/upload?token=017f70654591856906284a52daae76f57b084290d7bb06043756eba67cd0babf559bd427c6761dc1e04e9ff19b0169a342932343c5fae57309f93a7cb2946b5cacecd9a870",
      {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      }
    );
    const { imageId } = await result.json();
    // Step 3: Save the newly allocated storage id to the database
    await sendImage({ imageId });

    setSelectedImage(null);
    imageInput.current!.value = "";
    console.log("postUrl", postUrl);
    console.log("result", result);
    console.log("imageId", imageId);
  }
  console.log("generateUploadUrl", generateUploadUrl());
  return (
    <div className="bg-white-000 rounded w-100 p-5 ">
      <p className="text-lg fw-bold">Personal Details</p>

      {!user ? (
        <Loader height="30vh" />
      ) : (
        <>
          <div className="d-flex gap-4 align-items-center">
            <Image
              // src={"/avatar.svg"}
              src={user?.image}
              width={70}
              height={70}
              alt="profile-pics"
              className="rounded-circle"
            />
            <form onSubmit={handleSendImage}>
              <input
                type="file"
                accept="image/*"
                ref={imageInput}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                disabled={selectedImage !== null}
              />
              <input
                type="submit"
                value="Send Image"
                disabled={selectedImage === null}
              />
            </form>

            <label
              htmlFor="profilePicture"
              className="d-sm-flex d-none text-sm px-4 btn h-100 border border-primary-500 text-primary-500"
            >
              Upload new photo
            </label>
            <label
              htmlFor="profilePicture"
              className="d-sm-none d-flex text-sm px-2 btn h-100 border border-primary-500 text-primary-500"
            >
              Upload photo
            </label>
            <p className="mb-0 text-xs text-red click">Remove</p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 mb-4 mt-4_5">
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">First Name*</label>
              <Field
                component={TextInput}
                className="form-control"
                placeholder="John"
                type="text"
                name="firstName"
                id="firstName"
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">Last Name*</label>
              <Field
                component={TextInput}
                className="form-control"
                placeholder="Doe"
                type="text"
                name="lastName"
                id="lastName"
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">Phone No*</label>
              <Field
                component={PhoneInputField}
                country={"ng"}
                name="phoneNumber"
                inputProps={{
                  id: "phoneNumber",
                  className: "form-control w-100 border border-black00",
                }}
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0"> Email*</label>
              <Field
                component={TextInput}
                className="form-control"
                placeholder="example@gmail.com"
                type="email"
                name="email"
                id="email"
                value={user?.email}
                disabled
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">Bvn*</label>
              <Field
                component={TextInput}
                className="form-control"
                placeholder="123****890"
                type="text"
                name="bvn"
                id="bvn"
                value={user?.bvn}
                disabled
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">Date of Birth*</label>
              <div className="form-control border-grey-200 d-flex align-items-center gap-4 click">
                <Icon color="#808080" width={18} icon="uiw:date" />
                <CustomDatePicker
                  className="bg-transparent click text-black-000"
                  dateValue={props.dateValue}
                  setDateValue={props.setDateValue}
                  placeholder={"dd/mm/yyyy"}
                />
              </div>
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">Gender*</label>
              <Field
                component={ThemedSelect}
                name="gender"
                id="gender"
                size="base"
                options={convertModelArrayToSelectOptions(
                  genderSelect,
                  "value",
                  "label",
                  true
                )}
              />
            </div>
            <div className="mb-4 pe-4_5">
              <label className="text-xs mb-0">NIN*</label>
              <Field
                component={TextInput}
                className="form-control"
                placeholder="0987654321"
                type="text"
                name="nin"
                id="nin"
                value={user?.nin}
                disabled
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
