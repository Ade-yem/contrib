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
import type * as auth from "../auth.js";
import type * as group from "../group.js";
import type * as http from "../http.js";
import type * as payments from "../payments.js";
import type * as paystack from "../paystack.js";
import type * as paystack_api from "../paystack_api.js";
import type * as types_subscriptions from "../types/transfers.jsiptions.js";
import type * as types_transfers from "../types/transfers.js";
import type * as types_verification from "../types/verification.js";
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
  auth: typeof auth;
  group: typeof group;
  http: typeof http;
  payments: typeof payments;
  paystack: typeof paystack;
  paystack_api: typeof paystack_api;
  "types/subscriptions": typeof types_subscriptions;
  "types/transfers": typeof types_transfers;
  "types/verification": typeof types_verification;
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
