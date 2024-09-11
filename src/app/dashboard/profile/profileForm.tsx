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
import { Id } from "../../../../convex/_generated/dataModel";
import Button from "@/components/forms/Button";

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

  const generateUploadUrl = useMutation(api.user.generateUserProfileUploadUrl);
  const saveImage = useMutation(api.user.saveUserProfileImage);
  const [image, setImage] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleProfileUpload = async (image: File) => {
    try {
      setSubmitting(true);
      const url = await generateUploadUrl();

      const result = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": image.type },
        body: image,
      });

      const { storageId } = await result.json();
      console.log(storageId); // Successfully received the storageId

      await saveImage({ imageId: storageId as Id<"_storage"> });
    } catch (error) {
      console.error("Error uploading the image", error);
    } finally {
      setSubmitting(false);
    }
  };

  // const handleProfileUpload = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const url = await generateUploadUrl();
  //   const result = await fetch(url, {
  //     method: "POST",
  //     headers: { "Content-Type": image!?.type },
  //     body: image,
  //   });
  //   const { storageId } = await result.json();
  //   console.log(result.json());
  //   console.info("Storage id");
  //   console.log(storageId);
  //   await saveImage({ imageId: storageId as Id<"_storage"> });
  //   console.log(image);
  // };

  return (
    <div className="bg-white-000 rounded w-100 p-5 ">
      <p className="text-lg fw-bold">Personal Details</p>

      {!user ? (
        <Loader height="30vh" />
      ) : (
        <>
          <div className="d-flex gap-4 align-items-center">
            <Image
              src={user?.image || "/avatar.svg"}
              width={70}
              height={70}
              alt="profile-pics"
              className="rounded-circle"
            />
            {/* <form action="" onSubmit={(e) => handleProfileUpload(e)}>
              <label>Add Profile Image</label>
              <input
                type="file"
                className="form-control"
                name="image"
                id="image"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImage(files[0]);
                  }
                }}
              />
              <Button type="submit" title="submit">
                Upload file
              </Button>
            </form> */}
            <form>
              <input
                type="file"
                name="image"
                id="image"
                style={{ display: "none" }}
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    setImage(files[0]); // You can add any image validation here if needed
                    handleProfileUpload(files[0]); // Call the upload function here directly
                  }
                }}
              />

              <label
                htmlFor="image"
                className="d-sm-flex d-none text-sm px-4 btn h-100 border border-primary-500 text-primary-500"
              >
                Upload new photo
              </label>
              <label
                htmlFor="image"
                className="d-sm-none d-flex text-sm px-2 btn h-100 border border-primary-500 text-primary-500"
              >
                Upload photo
              </label>
            </form>
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
