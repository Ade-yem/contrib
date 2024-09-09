import { internalMutation, internalQuery } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createPlan = internalMutation ({
    args: {
        groupId: v.id("groups"),
        subscription_plan_id: v.string(),
    },
    handler(ctx, args_0) {
        const { groupId, subscription_plan_id } = args_0
        ctx.db.patch(groupId, {subscription_plan_id: subscription_plan_id})
    },
})

export const createPaymentMethod = internalMutation({
    args: {
        userId: v.id('users'),
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
            type: args_0.type, userId: args_0.userId, account_name: args_0.account_name,
            account_number: args_0.account_number, recipient_code: args_0.recipient_code,
            authorization_code: args_0.authorization_code,
            currency: args_0.currency, bank_name: args_0.bank_name
        });
        return id;
    },
})

export const createTransaction = internalMutation({
  args: {
    groupId: v.optional(v.id("groups")),
    savingsId: v.optional(v.id("savings")),
    userId: v.id("users"),
    amount: v.float64(),
    type: v.optional(v.union(v.literal("transfer"), v.literal("deposit"))),
    status: v.string(),
    reference: v.string(),
    details: v.optional(v.string()),
    access_code: v.optional(v.string()),
    transfer_code: v.optional(v.string())
  },
  async handler(ctx, args_0) {
      const res = await ctx.db.insert("transactions", {
        type: args_0.type,
        status: args_0.status,
        groupId: args_0.groupId,
        userId: args_0.userId,
        amount: args_0.amount,
        reference: args_0.reference,
        details: args_0.details,
        access_code: args_0.access_code,
        transfer_code: args_0.transfer_code,
        savingsId: args_0.savingsId
     })
      if (!res) throw new ConvexError("Could not create transaction");  
  },
})

export const updateTransaction = internalMutation({
  args: {
    status: v.string(),
    reference: v.string(),
  },
  async handler(ctx, args_0) {
    const q = await ctx.db.query("transactions").filter(q => q.eq(q.field("reference"), args_0.reference)).first();
    if (q) return await ctx.db.patch(q._id, {status: args_0.status});
    else throw new ConvexError("Could not update transaction");
  },
})

export const getTransaction = internalQuery({
  args: {
    reference: v.string()
  },
  async handler(ctx, args_0) {
    const q = await ctx.db.query("transactions").filter(q => q.eq(q.field("reference"), args_0.reference)).first();
    if (q) return q;
    else throw new ConvexError("Could not get transaction of reference " + args_0.reference);
  },
})