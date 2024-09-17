"use client";

import { useMutation, useQuery } from "convex/react";
import React from "react";
import Image from "next/image";
import { api } from "../../../../convex/_generated/api";
import { Icon } from "@iconify/react/dist/iconify.js";
import { thousandFormatter } from "@/components/utilities";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/shared/Loader";

export default function GroupDetails({ params }: { params: { code: string } }) {
  const joinGroupz = useMutation(api.group.joinGroupWithInviteCode);
  const group = useQuery(api.group.getGroupWithInviteCode, {
    code: params.code,
  });
  const creator = useQuery(api.user.getUserzById, {
    userId: group!?.creator_id,
  });

  const {
    setShowModal,
    user,
  }: {
    setShowModal: (value: ModalTypes) => void;
    user: any;
  } = React.useContext(LayoutContext);
  const router = useRouter();
  const joinGroup = async () => {
    if (!user) setShowModal("login");
    else {
      const res = await joinGroupz({ userId: user!?._id, code: params.code });
      if (res) {
        setShowModal("success");
        router.push(`/dashboard/groups/${res}`);
      } else toast.error("Could not add you to group");
    }
  };
  return (
    <div className="container">
    <div style={{height: "150px"}}></div>
    {
      !group ? <Loader />  :
      <div className="d-flex justify-content-center flex-column align-items-center w-100 mx-auto my-20">
      <div className={`default-card outstanding-group-card p-5`}>
        <div className={`group-image-wrapper`}>
          <Image
            className="obj-cover"
            src={group?.image ?? "/friends.svg"}
            alt={"alt"}
            width={100}
            height={100}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center px-5 mb-4 padlock-price">
          <span>
            <Icon
              icon="uil:padlock"
              width="3rem"
              height="3rem"
              className={`text-white-000 ${group?.private ? "" : "invisible"}`}
            />
          </span>
          <span className="price d-non">
            <span>
              ₦{thousandFormatter(group?.savings_per_interval ?? 0)}
            </span>
          </span>
        </div>
        <div className="d-flex justify-content-center flex-column align-items-center gap-3 my-4">
          <span>Creator: {creator?.first_name + " " + creator?.last_name}</span>
          <span>Savings interval: {group?.interval}</span>
        </div>
        <div className="px-md-4 d-flex justify-content-between gap-3">
          <p className="text-lg fw-bold"> {group?.name}</p>
          <span className="text-sm">{group?.number_of_people_present} of {group?.number_of_people} members</span>
        </div>
        
        <p className="text-sm px-md-4">{group?.description}</p>
      </div>
      <br />
      <button onClick={joinGroup} className="btn btn-md btn-primary mb-5 mx-auto">
        Join Group
      </button>
      </div>
    }
    </div>
  );
}
