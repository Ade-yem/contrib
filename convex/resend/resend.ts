import { Email } from "@convex-dev/auth/providers/Email";
import { alphabet, generateRandomString } from "oslo/crypto";
import { Resend as ResendAPI } from "resend";
import { PasswordResetEmail } from "./ResetPasswordMail";
import { VerificationCodeEmail } from "./VerifyPasswordMail";
import { PaymentFailedEmail } from "./PaymentFailed";
import { TransferMadeEmail } from "./TransferMade";
import { GroupCompleteEmail } from "./GroupCompleteEmail";
import { GroupClosedEmail } from "./GroupClosedEmail";


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

export class SendEmails {
  private static resend = new ResendAPI(process.env.AUTH_RESEND_KEY);

  public static async PaymentFailed({ email, groupName }: { email: string; groupName: string }) {
    const { error } = await this.resend.emails.send({
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Team at Jekajodawo",
      to: [email],
      subject: `Payment Failed`,
      react: PaymentFailedEmail({groupName}),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  public static async TransferMade({ email, groupName, accountNumber, type }: { email: string; groupName: string; accountNumber: string; type: "group" | "savings"; }) {
    const { error } = await this.resend.emails.send({
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Team at Jekajodawo",
      to: [email],
      subject: `Transfer for ${groupName} Group`,
      react: TransferMadeEmail({groupName, accountNumber, type}),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  }
  
  public static async GroupComplete({ email, groupName, date }: { email: string; groupName: string; date: string}) {
    const { error } = await this.resend.emails.send({
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Team at Jekajodawo",
      to: [email],
      subject: `${groupName} Group about to start`,
      react: GroupCompleteEmail({groupName, date}),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  }

  public static async GroupClosed({ email, groupName }: { email: string; groupName: string;}) {
    const { error } = await this.resend.emails.send({
      from: process.env.AUTH_EMAIL ? `Jekajodawo <${process.env.AUTH_EMAIL}>` : "Team at Jekajodawo",
      to: [email],
      subject: `${groupName} Group Closed`,
      react: GroupClosedEmail({groupName}),
    });

    if (error) {
      throw new Error(JSON.stringify(error));
    }
  }
}
