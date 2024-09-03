import { CreateGroupModal } from "./modals/createGroupModal";
import { LoginModal } from "./modals/loginModal";
import { RegisterModal } from "./modals/registerModal";
import { SuccessModal } from "./modals/successModal";
import { VerifyUserModal } from "./modals/verifyUserModal";

export const AuthContainer = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CreateGroupModal />
      <VerifyUserModal />
      <SuccessModal />
    </>
  );
};
