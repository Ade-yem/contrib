import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP, ResendOTPPasswordReset } from "./resetPassword/resend";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google, Password
    // ({reset: ResendOTPPasswordReset, verify: ResendOTP})
  ],
});
