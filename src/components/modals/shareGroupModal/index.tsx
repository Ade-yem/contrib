import React from "react";
import Image from "next/image";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import Modal from "react-bootstrap/Modal";
import { Icon } from "@iconify/react";

interface ShareGroupModalProps {
  inviteLink: Id<"groups">;
}

const ShareGroupModal: React.FC<ShareGroupModalProps> = ({ inviteLink }) => {
  const {
    showModal,
    setShowModal,
  }: {
    showModal: ModalTypes;
    setShowModal: (value: ModalTypes) => void;
  } = React.useContext(LayoutContext);
  const data = useQuery(api.user.getInviteLink, { groupId: inviteLink });
  const [copied, setCopied] = React.useState<boolean>(false);
  const closeModal = () => {
    setShowModal(null);
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        // wait two seconds and set copied to false
        setTimeout(() => {
          setCopied(false);
        }, 4000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };
  return (
    <>
      <Modal
        show={showModal === "shareGroup"}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <Modal.Body>
          <div className="pt-5 pb-5 px-lg-5_6 px-5">
            <div className="close-modal" onClick={closeModal}>
              <Icon className="text-black-000" icon="charm:square-cross" />
            </div>
            <div className="d-flex flex-column justify-contents-center gap-3 align-items-center py-5">
              <Image
                src={`https://api.qrserver.com/v1/create-qr-code/?data=${data}&amp;size=150x150`}
                width={150}
                height={150}
                alt="QR Code"
                className="p-4"
              />
              <div className="d-flex gap-2">
                <span onClick={() => copyToClipboard(data as string)}>
                  Link: {data}
                </span>
              </div>
              <button
                className="btn-primary btn btn-md"
                onClick={() => copyToClipboard(data as string)}
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareGroupModal;
