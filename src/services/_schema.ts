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
  | "createRecipient"
  | "shareGroup"
  | "registerSuccess"
  | null;

export enum Gender {
  "male" = "Male",
  "female" = "Female",
  "other" = "Other",
}
export enum PaymentFrequency {
  "hourly" = "Hourly",
  "daily" = "Daily",
  "weekly" = "Weekly",
  "monthly" = "Monthly",
}

export enum Categories {
  "Appliances" = "Appliances",
  "Car/Vehicle" = "Car/Vehicle",
  "Education" = "Education",
  "Accomodation" = "Accomodation",
  "Fees/Debt" = "Fees/Debt",
  "Vacation & Travel" = "Vacation & Travel",
  "Custom" = "Custom",
}

export enum PaymentMethod {
  "card" = "Saved Card",
  "bank" = "Bank Transfer",
}
