import { internalMutation } from "./_generated/server";
import { v } from "convex/values";

export const createPlan = internalMutation ({
    args: {
        group_id: v.id("groups"),
        subscription_plan_id: v.string(),
    },
    handler(ctx, args_0) {
        const { group_id, subscription_plan_id } = args_0
        ctx.db.patch(group_id, {subscription_plan_id: subscription_plan_id})
    },
})

export const createPaymentMethod = internalMutation({
    args: {
        user_id: v.id('users'),
        type: v.union(v.literal("ghpss"), v.literal("nuban")),
        account_name: v.string(),
        recipient_code: v.string(),
        authorization_code: v.string(),
        currency: v.union(v.literal("NGN"), v.literal("GHS")),
        bank_name: v.string(),
        account_number: v.string(),
    },
    async handler(ctx, args_0) {
        const id = await ctx.db.insert("payment_methods", {
            type: args_0.type, user_id: args_0.user_id, account_name: args_0.account_name,
            account_number: args_0.account_number, recipient_code: args_0.recipient_code,
            authorization_code: args_0.authorization_code,
            currency: args_0.currency, bank_name: args_0.bank_name
        });
        return id;
    },
})

export const createTransaction = internalMutation({
  args: {
    group_id: v.optional(v.id("groups")),
    user_id: v.optional(v.id("users")),
    amount: v.optional(v.float64()),
    type: v.optional(v.union(v.literal("transfer"), v.literal("deposit"))),
    status: v.string(),
    reference: v.string(),
    new: v.boolean(),
    details: v.optional(v.string()),
    access_code: v.optional(v.string()),
  },
  async handler(ctx, args_0) {
    console.info("creating transaction");
    if (args_0.new && args_0.group_id && args_0.user_id && args_0.amount) {
      const res = await ctx.db.insert("transactions", {
        type: args_0.type, status: args_0.status, group_id: args_0.group_id, user_id: args_0.user_id, amount: args_0.amount, reference: args_0.reference, details: args_0.details, access_code: args_0.access_code
      })
      console.info("result => ", res);
    } else {
      console.info("not creating this time");
      const q = await ctx.db.query("transactions").filter(q => q.eq(q.field("reference"), args_0.reference)).first();
      if (q) await ctx.db.patch(q._id, {status: args_0.status});
    }   
  },
})
