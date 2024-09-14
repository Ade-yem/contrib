"use node";
// Create a transfer recipient
// Generate a transfer reference
// Initiate a transfer
// Listen for transfer status

import { action, internalAction } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import paystack from "./paystack_api";
import { TransferRecipientResponse, TransferResponse } from "./types/transfers";
import { internal, api } from "./_generated/api";
import { generateReference } from "./utils";

export const createRecipient = action({
  args: {
		userId: v.id("users"),
    type: v.union(v.literal("ghpss"), v.literal("nuban")),
    name: v.string(),
    account_number: v.string(),
    bank_code: v.string(),
    currency: v.union(v.literal("NGN"), v.literal("GHS")),
  },
  handler: async (ctx, args) => {
    const {type, name, account_number, bank_code, currency} = args;
    const result: TransferRecipientResponse = await paystack.createTransferRecipient({
      type: type, name: name, account_number: account_number, bank_code: bank_code, currency: currency
    })
    if (result.status) {
      const account_name = result.data.details.account_name || "";
      const account_number = result.data.details.account_number || "";
      const authorization_code = result.data.details.authorization_code || "";
      const bank_name = result.data.details.bank_name || "";
      const res = await ctx.runMutation(internal.paystack.createPaymentMethod, {
        userId: args.userId, type: type, account_name,
        recipient_code: result.data.recipient_code, authorization_code,
        currency: result.data.currency as "NGN" | "GHS", bank_name, account_number
      })
      if (res && res.length > 1) {
        return true;
      } else return false;
    } else throw new ConvexError(result.message);
  }
})

export const createRecipientFromAuthorization = action({
  args: {
    name: v.string(),
    email: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const {name, email, userId} = args;
    const authorization_code = await ctx.runQuery(api.authorization.getAuthorization, {userId});
    const result: TransferRecipientResponse = await paystack.createTransferRecipientWithCode({
      name, email, authorization_code
    });
    console.log(result);
    if (result.status) {
      const account_name = result.data.details.account_name || "";
      const account_number = result.data.details.account_number || "";
      const authorization_code = result.data.details.authorization_code || "";
      const bank_name = result.data.details.bank_name || "";

      const res = await ctx.runMutation(internal.paystack.createPaymentMethod, {
        userId: args.userId, type: "authorization", account_name,
        recipient_code: result.data.recipient_code, authorization_code,
        currency: result.data.currency as "NGN" | "GHS", bank_name, account_number
      })
      if (res && res.length > 1) {
        return true;
      } else return false;
    } else throw new ConvexError(result.message)
  }
});

export const initiateTransfer = internalAction({
	args: {
		amount: v.float64(),
		reason: v.string(),
		recipient: v.string(),
		reference: v.optional(v.string()),
		groupId: v.optional(v.id("groups")),
		savingsId: v.optional(v.id("savings")),
		userId: v.id("users"),
		details: v.string(),
		retry: v.boolean(),
	},
	async handler(ctx, args_0) {
		const reference = args_0.retry ? args_0.reference as string : generateReference();
		const result: TransferResponse = await paystack.initiateTransfer({
			amount: args_0.amount, recipient: args_0.recipient, reason: args_0.reason, reference: reference
		})
    console.log(result);
		if (result.status) {
			await ctx.runMutation(internal.paystack.createTransaction, {
				groupId: args_0.groupId, userId: args_0.userId, amount: result.data.amount, type: "transfer", status: result.data.status, reference: result.data.reference, details: args_0.details, transfer_code: result.data.transfer_code, savingsId: args_0.savingsId
			})
		} else throw new ConvexError(result.message);
	},
});
