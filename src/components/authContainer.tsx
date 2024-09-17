import { CreateGroupModal } from "./modals/createGroupModal";
import { CreatePersonalSavingsModal } from "./modals/createPersonalSavingModal";
import { CreateRecipientModal } from "./modals/createRecipientModal";
import { EnterGroupCodeModal } from "./modals/enterGroupCode";
import { LoginModal } from "./modals/loginModal";
import { RegisterModal } from "./modals/registerModal";
import { SuccessModal } from "./modals/successModal";
import { RegisterSuccessModal } from "./modals/successModal/registerSuccessModal";
import { VerifyUserModal } from "./modals/verifyUserModal";
import { WithdrawFundsModal } from "./modals/withdrawFundsModal";
import { AddMoney } from "./modals/addMoney"
import { ResetPassword } from "./modals/ResetPasswordModal";

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
      <CreateRecipientModal />
      <WithdrawFundsModal />
      <RegisterSuccessModal />
      <AddMoney/>
      <ResetPassword/>
    </>
  );
};
