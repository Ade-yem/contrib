import { internalMutation,internalAction, mutation, query, action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { ConvexError, v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const addGroupAction = action({
    args: {
      creator_id: v.id("users"),
      name: v.string(),
      description: v.string(),
      number_of_people: v.float64(),
      interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
      savings_per_interval: v.float64(),
      private: v.boolean()
     },
     async handler(ctx, args) {
      if (await ctx.auth.getUserIdentity()) {
        const group = await ctx.runMutation(api.group.createGroup, {creator_id: args.creator_id, name: args.name, number_of_people: args.number_of_people, interval: args.interval, savings_per_interval: args.savings_per_interval, private: args.private, description: args.description});
        if (group) {
          await ctx.runAction(internal.payments.createPaystackPlan, {name: group.name, group_id: group._id, description: group?.description, interval: group.interval, amount: group.savings_per_interval, invoiceLimit: group.number_of_people, currency: "NGN"})
        } else throw new ConvexError("Could not create group");
        

      } else throw new ConvexError("The user is not authenticated");
     }
  })

export const addMember = action({
  args: {
    group_id: v.id("groups"),
    user_id: v.id("users"),
    amount: v.float64(),
  },
  async handler(ctx, args_0) {
    await ctx.runMutation(internal.group.createMembership, {group_id: args_0.group_id, user_id: args_0.user_id, paid_deposit: args_0.amount})
    const group = await ctx.runQuery(api.group.getGroup, {group_id: args_0.group_id})
    if (!group) throw new ConvexError("Unable to find group");
    if (group.number_of_people === group.number_of_people_present) {
      const res = await ctx.runAction(internal.subscription.subscribeUsersToPlan, {group_id: args_0.group_id});
      if (res?.message === "success") {
        await ctx.runMutation(api.group.assignSlot, {group_id: args_0.group_id});
        await ctx.runMutation(internal.group.startGroup, {group_id: args_0.group_id, start_date: res.start })
      }      
    }
  },
})