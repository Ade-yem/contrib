import { internalMutation } from "./_generated/server";
import {v} from "convex/values";

export const removeMoneyFromSavings = internalMutation({
  args: {
    amount: v.float64(),
    savingsId: v.id("savings")
  },
  async handler(ctx, args) {
    const {amount, savingsId} = args;
    const savings = await ctx.db.get(savingsId);
    await ctx.db.patch(savingsId, {amount: savings?.amount as number - amount});

  }
})

export const removeMoneyfromGroup = internalMutation({
  
  args: {
    amount: v.float64(),
    groupId: v.id("groups")
  },
  async handler(ctx, args) {
    const {amount, groupId} = args;
    const group = await ctx.db.get(groupId);
    await ctx.db.patch(groupId, {amount: group?.amount as number - amount});

  }
})

