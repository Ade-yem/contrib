export type ModalTypes =
  | "login"
  | "register"
  | "onSuccess"
  | "createGroup"
  | "verifyUser"
  | "success"
  | "groupCode"
  | "createPersonalSavings"
  | "withdrawFunds"
  | null;

export enum Gender {
  "male" = "Male",
  "female" = "Female",
  "other" = "Other",
}
export enum PaymentFrequency {
  "daily" = "Daily",
  "weekly" = "Weekly",
  "monthly" = "Monthly",
}
