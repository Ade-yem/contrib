// Create a transfer recipient
// Generate a transfer reference
// Initiate a transfer
// Listen for transfer status

import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import paystack from "./paystack_api";
import { TransferRecipientResponse, TransferResponse } from "./types/transfers";
import { internal } from "./_generated/api";
import { generateReference } from "./utils";

export const createRecipient = action({
    args: {
				user_id: v.id("users"),
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
			if (result) {
				const res = await ctx.runMutation(internal.paystack.createPaymentMethod, {
					user_id: args.user_id, type: type, account_name: result.data.details.account_name as string,
					recipient_code: result.data.recipient_code, authorization_code: result.data.details.authorization_code as string,
					currency: result.data.currency as "NGN" | "GHS", bank_name: result.data.details.bank_name, account_number: result.data.details.account_number
				})
				if (res && res.length > 1) {
					return true;
				} else return false;
			}
    }
})

export const initiateTransfer = internalAction({
	args: {
		amount: v.float64(),
		reason: v.string(),
		recipient: v.string(),
		group_id: v.id("groups"),
		user_id: v.id("users")
	},
	async handler(ctx, args_0) {
		const reference = generateReference();
		const result: TransferResponse = await paystack.initiateTransfer({
			amount: args_0.amount, recipient: args_0.recipient, reason: args_0.reason, reference: reference
		})
		if (result) {
			await ctx.runMutation(internal.paystack.createTransaction, {
				new: true, group_id: args_0.group_id, user_id: args_0.user_id, amount: result.data.amount, type: "transfer", status: result.data.status, reference: result.data.reference
			})
		}
	},
});
