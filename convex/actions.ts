import { action } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { ConvexError, v } from "convex/values";

export const addGroupAction = action({
    args: {
      creator_id: v.id("users"),
      name: v.string(),
      description: v.string(),
      number_of_people: v.float64(),
      interval: v.union(v.literal("5 minutes"), v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
      savings_per_interval: v.float64(),
      private: v.boolean()
    },
    async handler(ctx, args) {
      if (await ctx.auth.getUserIdentity()) {
        if (await ctx.runQuery(api.group.getGroupByName, {name: args.name})) throw new ConvexError(`Group with name ${args.name} already exists`);
        const groupId = await ctx.runMutation(api.group.createGroup, {creator_id: args.creator_id, name: args.name, number_of_people: args.number_of_people, interval: args.interval, savings_per_interval: args.savings_per_interval * 100, private: args.private, description: args.description});
        const group = await ctx.runQuery(api.group.getGroup, {groupId});
        if (group) {
          // await ctx.runAction(internal.payments.createPaystackPlan, {name: group.name, groupId: group._id, description: group?.description, interval: group.interval, amount: group.savings_per_interval, invoiceLimit: group.number_of_people, currency: "NGN"});
          const code = await ctx.runMutation(internal.group.createInvite, {status: "pending", groupId: group._id});
          await ctx.runAction(api.actions.addMember, {groupId: group._id, userId: args.creator_id, inviteCode: code as string});
        } else throw new ConvexError("Could not create group");
      } else throw new ConvexError("The user is not authenticated");
    }
  })

export const addMember = action({
  args: {
    groupId: v.id("groups"),
    userId: v.id("users"),
    amount: v.optional(v.float64()),
    inviteCode: v.optional(v.string()),
  },
  async handler(ctx, args_0) {
    if (await ctx.auth.getUserIdentity()) {
      try {
        await ctx.runMutation(internal.memberships.createMembership, {groupId: args_0.groupId, userId: args_0.userId, paid_deposit: args_0.amount, inviteCode: args_0.inviteCode})
      } catch(error: any) {  
        throw new ConvexError(error.message);
      }
      const group = await ctx.runQuery(api.group.getGroup, {groupId: args_0.groupId})
      if (!group) throw new ConvexError("Unable to find group");
      if (group.number_of_people === group.number_of_people_present) {
        const res = await ctx.runAction(internal.subscription.subscribeUsersToPlan, {groupId: args_0.groupId});
        if (res?.message === "success") {
          await ctx.runMutation(api.group.assignSlot, {groupId: args_0.groupId});
          await ctx.runMutation(internal.group.startGroup, {groupId: args_0.groupId, start_date: res.start })
          //await ctx.scheduler.runAt(new Date(res.start), internal.cron.scheduleIntervalCharge, {name: group.name, groupId: group._id});
          //await ctx.scheduler.runAt(new Date(res.report_date), internal.cron.scheduleIntervalPayment, {name: group.name, groupId: group._id});
          // await ctx.scheduler.runAt(new Date(res.report_date), internal.cron.scheduleMidTransactionReport, {name: group.name, groupId: group._id});
          await ctx.scheduler.runAt(new Date(res.schedule_date), internal.cron.scheduleIntervalReport, {name: group.name, groupId: group._id});
        }   
      }
    } else throw new ConvexError("The user is not authenticated");
  }
})
