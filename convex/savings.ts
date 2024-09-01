import { api, internal } from "./_generated/api";
import { action, internalMutation, mutation, query } from "./_generated/server";
import { v, ConvexError } from "convex/values";

/**
 * @function crateSavings
 */
export const createSavings = mutation({
  args: {
    user_id: v.id("users"),
    name: v.string(),
  },
  async handler(ctx, args_0) {
    const { user_id, name } = args_0;
    await ctx.db.insert("savings", {user_id, amount: 0, name});
  },
})

export const addMoneyToSavings = action({
  args: {
    email: v.string(),
    user_id: v.id("users"),
    amount: v.float64(),
    savings_id: v.id("savings")
  },
  async handler(ctx, args_0) {
    const {user_id, email, amount, savings_id } = args_0;
    const result = await ctx.runAction(api.payments.initializePaystackTransaction, {
      metadata: {savings_id, details: "add savings", user_id}, amount, email
    })    
  },
})

export const addSavings = internalMutation({
  args: {
    user_id: v.id("users"),
    amount: v.float64(),
    savings_id: v.id("savings")
  },
  async handler(ctx, args) {
    const { user_id, amount, savings_id } = args;
    const saving = await ctx.db.get(savings_id);
    if (!saving) throw new ConvexError("Could not get saving of id " + savings_id);
    await ctx.db.patch(savings_id, {amount: saving.amount + amount })
  }
})