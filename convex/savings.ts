import { api, internal } from "./_generated/api";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { v, ConvexError } from "convex/values";

/**
 * @function crateSavings
 */
export const createSavings = mutation({
  args: {
    userId: v.id("users"),
    name: v.string(),
    amount: v.float64(),
    reason: v.string(),
    interval: v.optional(v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly"))),
  },
  async handler(ctx, args_0) {
    const { userId, name, amount, reason, interval } = args_0;
    await ctx.db.insert("savings", {userId, name, amount, reason, interval});
  },
})

export const addMoneyToSavings = action({
  args: {
    email: v.string(),
    userId: v.id("users"),
    amount: v.float64(),
    savingsId: v.id("savings")
  },
  async handler(ctx, args_0) {
    const {userId, email, amount, savingsId } = args_0;
    await ctx.runAction(api.payments.initializePaystackTransaction, {
      metadata: {savingsId, details: "add savings", userId}, amount, email
    })
  },
})
export const removeMoneyFromSavings = mutation({
  args: {
    userId: v.id("users"),
    amount: v.float64(),
    savingsId: v.id("savings")
  },
  async handler(ctx, args_0) {
    const {userId, amount, savingsId } = args_0;
    const default_payment_method = await ctx.db.query("default_payment_method").filter(d => d.eq(d.field("userId"), userId)).first();
    const payment_method = await ctx.db.get(default_payment_method?.paymentMethodId as Id<"payment_methods">)
    if(!payment_method) throw new ConvexError("Could not get payment method");
    await ctx.scheduler.runAt(new Date(), internal.transfers.initiateTransfer, {
      savingsId, details: "cashout", userId, amount, recipient: payment_method.recipient_code, retry: false, reason: "cashout"
    })    
  },
})
export const updateSavings = internalMutation({
  args: {
    reference: v.string(),
    amount: v.float64(),
  },
  async handler(ctx, args_0) {
    const { reference, amount } = args_0;
    const transaction = await ctx.db.query("transactions").filter(t => t.eq(t.field("reference"), reference)).first();
    if (!transaction) throw new ConvexError("Could not get transaction of reference " + reference);
    const savings = await ctx.db.get(transaction.savingsId as Id<"savings">);
    if (!savings) throw new ConvexError("Could not get savings for this transaction reference" + reference);
    await ctx.db.patch(savings._id, {amount: savings.amount - amount})
  },
})

export const addSavings = internalMutation({
  args: {
    amount: v.float64(),
    savingsId: v.id("savings")
  },
  async handler(ctx, args) {
    const { amount, savingsId } = args;
    const saving = await ctx.db.get(savingsId);
    if (!saving) throw new ConvexError("Could not get saving of id " + savingsId);
    await ctx.db.patch(savingsId, {amount: saving.amount + amount })
  }
})