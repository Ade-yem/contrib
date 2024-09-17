import {v} from "convex/values"
import {query} from "./_generated/server";

export const getPaymentMethods = query({
  args: {userId: v.optional(v.id("users"))},
  async handler(ctx, args_0) {
    if (!args_0.userId) return [];
    else return await ctx.db.query("payment_methods").filter(p => p.eq(p.field("userId"), args_0.userId)).collect();
  },
})