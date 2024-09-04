"use node";

import { action } from "./_generated/server";
import paystack from "./paystack_api";
import { ConvexError, v } from "convex/values";
import { BanksResponse } from "./types/transfers";
import { ResolveAccount } from "./types/verification";

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
