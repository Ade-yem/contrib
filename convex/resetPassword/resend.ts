import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend, Resend as ResendAPI } from "resend";
import { PasswordResetEmail } from "./ResetPasswordMail";
import { VerificationCodeEmail } from "./VerifyPasswordMail";

export const ResendOTPPasswordReset = Email({
  id: "resend-otp-password-reset",
  apiKey: process.env.AUTH_RESEND_KEY,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      // TODO: Update with your app name and email address
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Adeyemi  at Jekajodawo",
      to: [email],
      // TODO: Update with your app name
      subject: `Reset Jekajodawo password`,
      react: PasswordResetEmail({ code: token, expires }),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.AUTH_RESEND_KEY,
  maxAge: 60 * 20,
  async generateVerificationToken() {
    return generateRandomString(8, alphabet("0-9"));
  },
  async sendVerificationRequest({
    identifier: email,
    provider,
    token,
    expires,
  }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Adeyemi  at Jekajodawo",
      to: [email],
      subject: `Email Verification`,
      react: VerificationCodeEmail({ code: token, expires }),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});

// write code to a user saying their weekly payment failed and it will be retried in a few hours
// export const PaymentFailed = new Resend({

//     const resend = new ResendAPI(provider.apiKey);
//     const { error } = await resend.emails.send({
//       from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Adeyemi  at Jekajodawo",
//       to: [email],
//       subject: `Payment Failed`,
//       react: PaymentFailedEmail(),
//     });

//     if (error) {
//       throw new Error(JSON.stringify(error));
//     }
//   },
// });