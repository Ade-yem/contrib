import {v} from "convex/values"
import {query} from "./_generated/server";

export const getPaymentMethods = query({
  args: {userId: v.id("users")},
  async handler(ctx, args_0) {
    return await ctx.db.query("payment_methods").filter(p => p.eq(p.field("userId"), args_0.userId)).collect();
  },
})