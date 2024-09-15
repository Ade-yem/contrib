/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.13.2.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as actions from "../actions.js";
import type * as auth from "../auth.js";
import type * as authorization from "../authorization.js";
import type * as chat from "../chat.js";
import type * as common from "../common.js";
import type * as cron from "../cron.js";
import type * as cronlib from "../cronlib.js";
import type * as customPassword from "../customPassword.js";
import type * as group from "../group.js";
import type * as groupBoard from "../groupBoard.js";
import type * as hookActions from "../hookActions.js";
import type * as http from "../http.js";
import type * as intervalReport from "../intervalReport.js";
import type * as memberships from "../memberships.js";
import type * as monnify from "../monnify.js";
import type * as monnify_api from "../monnify_api.js";
import type * as paymentMethod from "../paymentMethod.js";
import type * as payments from "../payments.js";
import type * as paystack from "../paystack.js";
import type * as paystack_api from "../paystack_api.js";
import type * as recipient from "../recipient.js";
import type * as resend_PaymentFailed from "../resend/PaymentFailed.js";
import type * as resend_resend from "../resend/resend.js";
import type * as resend_ResetPasswordMail from "../resend/ResetPasswordMail.js";
import type * as resend_TransferMade from "../resend/TransferMade.js";
import type * as resend_VerifyPasswordMail from "../resend/VerifyPasswordMail.js";
import type * as savings from "../savings.js";
import type * as subscription from "../subscription.js";
import type * as transactions from "../transactions.js";
import type * as transfers from "../transfers.js";
import type * as types_invoice from "../types/invoice.js";
import type * as types_subscriptions from "../types/subscriptions.js";
import type * as types_transfers from "../types/transfers.js";
import type * as types_verification from "../types/verification.js";
import type * as types_webhooks from "../types/webhooks.js";
import type * as user from "../user.js";
import type * as utils from "../utils.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  auth: typeof auth;
  authorization: typeof authorization;
  chat: typeof chat;
  common: typeof common;
  cron: typeof cron;
  cronlib: typeof cronlib;
  customPassword: typeof customPassword;
  group: typeof group;
  groupBoard: typeof groupBoard;
  hookActions: typeof hookActions;
  http: typeof http;
  intervalReport: typeof intervalReport;
  memberships: typeof memberships;
  monnify: typeof monnify;
  monnify_api: typeof monnify_api;
  paymentMethod: typeof paymentMethod;
  payments: typeof payments;
  paystack: typeof paystack;
  paystack_api: typeof paystack_api;
  recipient: typeof recipient;
  "resend/PaymentFailed": typeof resend_PaymentFailed;
  "resend/resend": typeof resend_resend;
  "resend/ResetPasswordMail": typeof resend_ResetPasswordMail;
  "resend/TransferMade": typeof resend_TransferMade;
  "resend/VerifyPasswordMail": typeof resend_VerifyPasswordMail;
  savings: typeof savings;
  subscription: typeof subscription;
  transactions: typeof transactions;
  transfers: typeof transfers;
  "types/invoice": typeof types_invoice;
  "types/subscriptions": typeof types_subscriptions;
  "types/transfers": typeof types_transfers;
  "types/verification": typeof types_verification;
  "types/webhooks": typeof types_webhooks;
  user: typeof user;
  utils: typeof utils;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
