import { Icon } from "@iconify/react";
import { useContext, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { api } from "../../../../convex/_generated/api";
import { useAction } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { LayoutContext } from "@/context/layoutContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ModalTypes } from "@/services/_schema";
import { parseError } from "@/components/utilities/helper";

export const JoinGroupModal = ({
  openJoinGroupModal,
  toggleJoinGroupModal,
  groupId,
}: {
  openJoinGroupModal: boolean;
  toggleJoinGroupModal: () => void;
  groupId: string;
}) => {
  const {
    user,
    setShowModal
  }: {
    user: any;
    setShowModal: (value: ModalTypes) => void
  } = useContext(LayoutContext);
  const [isPending, setIsPending] = useState(false);
  const addGroup = useAction(api.actions.addMember);
  const router = useRouter();

  const handleJoinGroup = async () => {
    setIsPending(true);
    try {
      await addGroup({
      userId: user?._id as Id<"users">,
      groupId: groupId as Id<"groups">,
      // amount: 5,
    }); 
    } catch(error: any) {
      console.error(error)
      toast.error("You have to be signed in to perform this action")
      setIsPending(false);
      setShowModal("login");
    }
    
    setIsPending(false);
    toggleJoinGroupModal;
    router.push(`/dashboard/groups/${groupId}`);
  };

  return (
    <Modal
      className="modal-mobile"
      show={openJoinGroupModal}
      onHide={toggleJoinGroupModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="pt-5 pb-6 px-5">
          <div className="d-flex justify-content-center">
            <Icon
              className="text-primary-500"
              icon="heroicons:user-group-solid"
              width="3rem"
              height="3rem"
            />
          </div>
          <p className="text-xl fw-semi-bold text-center mt-3 mb-">
            Confirm Join Group
          </p>
          <p className="text-xs text-center">
            Are you sure to join this group?
          </p>
          <div className="d-flex align-items-center justify-content-center gap-4">
            <>
              {isPending ? (
                <Spinner />
              ) : (
                <button
                  className="btn btn-md btn-primary"
                  onClick={handleJoinGroup}
                >
                  Yes
                </button>
              )}
            </>
            <button
              className="btn btn-md btn-primary"
              onClick={toggleJoinGroupModal}
            >
              No
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
