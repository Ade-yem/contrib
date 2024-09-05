"use node";

import { action } from "./_generated/server";
import { internal, api } from "./_generated/api";
import paystack from "./paystack_api";
import { ConvexError, v } from "convex/values";
import { BanksResponse } from "./types/transfers";
import { ResolveAccount } from "./types/verification";
import monnify from "./monnify_api"

/**
 * @dev get all banks in Nigeria or Ghana
 * @param currency can be NGN or GHS
 */
export const getBanks = action({
  args: {
    currency: v.union(v.literal("NGN"), v.literal("GHS"))
  },
  async handler(ctx, args_0) {
    const banks: BanksResponse = await paystack.getBanks({
      currency: args_0.currency
    })
    if (banks) return banks;
    else throw new ConvexError("Could not fetch banks");
  },
})

export const resolveAccountNumber = action({
  args: {
    account_number: v.string(),
    bank_code: v.string()
  },
  async handler(ctx, args_0) {
    const { account_number, bank_code } = args_0;
    const res: ResolveAccount = await paystack.resolveAccountNumber({account_number, bank_code});
    if (res.status) return res;
    else throw new ConvexError(res.message);
  },
})

export const verifyNin = action({
  args: {nin: v.string()},
  async handler(ctx, args) {
    // const user = await ctx.runQuery(api.user.getUser);
    // if (!user) throw new ConvexError("User is not authenticated!")
    const res: {
      nin: string;
      lastName: string;
      firstName: string;
      middleName: string;
      dateOfBirth: string;
      gender: string;
      mobileNumber: string;
  } | null = await monnify.verifyNin(args.nin);
  console.log(res);
    if (!res) throw new ConvexError("Could not verify user nin");
    // if (res.firstName.toLowerCase() === user.first_name?.toLowerCase() &&
    //     res.lastName.toLowerCase() === user.last_name?.toLowerCase() &&
    //     res.gender.toLowerCase() === user.gender.toLowerCase()
    // ) {
    //   await ctx.runMutation(internal.user.addNin, {nin: args.nin})
    // } else throw new ConvexError("Nin details does not match the user's profile");
  }
})

export const verifyBvn = action({
  args: {
    phone: v.string(),
    dob: v.string(),
    bvn: v.string(),
    name: v.string(),
  },
  async handler(ctx, args_0) {
    const {phone, name, dob, bvn } = args_0;
    const res = await monnify.verifyBvn({phone, name, dob, bvn});
    if (res.name.matchStatus === "NO MATCH") throw new ConvexError("The name does not match the bvn record");
    console.log(res);
  },
})

export const initializeMonnify = action({
  async handler(ctx) {
    await monnify.init();
  },
})