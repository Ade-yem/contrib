import { CreateGroupModal } from "./modals/createGroupModal";
import { CreatePersonalSavingsModal } from "./modals/createPersonalSavingModal";
import { EnterGroupCodeModal } from "./modals/enterGroupCode";
import { LoginModal } from "./modals/loginModal";
import { RegisterModal } from "./modals/registerModal";
import { SuccessModal } from "./modals/successModal";
import { VerifyUserModal } from "./modals/verifyUserModal";
import { WithdrawFundsModal } from "./modals/withdrawFundsModal";

export const AuthContainer = () => {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <CreateGroupModal />
      <VerifyUserModal />
      <SuccessModal />
      <EnterGroupCodeModal />
      <CreatePersonalSavingsModal />
      <WithdrawFundsModal />
    </>
  );
};
