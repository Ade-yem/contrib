import { JoinGroupModal } from "@/components/modals/actionModals";
import { thousandFormatter } from "@/components/utilities";
import { LayoutContext } from "@/context/layoutContext";
import { ModalTypes } from "@/services/_schema";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React, { useContext, useState } from "react";

export const GroupCard = ({
  img,
  title,
  savings_per_interval,
  desc,
  key,
  privateGroup,
  color,
  groupId,
  expectedMembers,
  membersPresent,
  interval,
}: {
  img: string;
  title: string;
  savings_per_interval: number;
  desc?: string;
  interval?: string;
  key: number;
  color: number;
  privateGroup?: boolean;
  groupId?: any;
  expectedMembers: number;
  membersPresent: number;
}) => {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const [openJoinGroupModal, setOpenJoinGroupModal] = useState(false);
  const toggleJoinGroupModal = () => setOpenJoinGroupModal(!openJoinGroupModal);
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 my-5_6" key={key}>
      <div
        className={`default-card outstanding-group-card ${color === 1 ? "one" : color === 2 ? "two" : color === 3 ? "three" : "four"}`}
      >
        <div
          className={`group-image-wrapper ${color === 1 ? "one" : color === 2 ? "two" : color === 3 ? "three" : "four"}`}
        >
          <Image
            className="obj-cover bg-white"
            src={img}
            alt={"group image"}
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
              className={`text-white-000 ${privateGroup ? "" : "invisible"}`}
            />
          </span>
          <span>
            <span className="price d-non">
              <span>₦{thousandFormatter(savings_per_interval)}</span>
            </span>
            <p className="text-2xs text-capitalize fw-bold">{interval}</p>
          </span>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-2 my-4">
          <span>
            {membersPresent} of {expectedMembers} members
          </span>
        </div>
        <p className="text-lg fw-bold"> {title}</p>
        <p className="text-sm px-md-4">{desc}</p>
        {privateGroup ? (
          <button
            className="btn btn-md text-white-000 bg-transparent mx-auto"
            onClick={() => setShowModal("groupCode")}
          >
            Join Group
            <Icon className="ms-3_5" icon="bi:arrow-up-right" width="2rem" />
          </button>
        ) : (
          <button
            className="btn btn-md text-white-000 bg-transparent mx-auto"
            onClick={() => setOpenJoinGroupModal(!openJoinGroupModal)}
          >
            Join Group
            <Icon className="ms-3_5" icon="bi:arrow-up-right" width="2rem" />
          </button>
        )}
        <JoinGroupModal
          openJoinGroupModal={openJoinGroupModal}
          toggleJoinGroupModal={toggleJoinGroupModal}
          groupId={groupId}
        />
      </div>
    </div>
  );
};
