import Google, {GoogleProfile} from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ResendOTP, ResendOTPPasswordReset } from "./resetPassword/resend";
import { TokenSet } from "@auth/core/types";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [Google({
    profile: (prof: GoogleProfile, token: TokenSet) => {
      return {
        id: prof.sub,
        email: prof.email,
        image: prof.picture,
        first_name: prof.given_name,
        last_name: prof.family_name,
      }
    }
  }), Password
  // ({id: "password-code", reset: ResendOTPPasswordReset, verify: ResendOTP})
  ],
});
