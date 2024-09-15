import { ConvexError, v } from "convex/values";
import { internalAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
// import { Id } from "./_generated/dataModel";
import { SendEmails } from "./resend/resend";

export const subscribeUsersToPlan = internalAction({
    args: {
      groupId: v.id("groups")
    },
    async handler(ctx, args) {
      const users = await ctx.runQuery(api.memberships.getGroupMembers, {groupId: args.groupId})
      const group = await ctx.runQuery(api.group.getGroup, {groupId: args.groupId});
      if (users.length > 0 && group) {
        // const statuses: {[member_id: Id<"membership">] : boolean} = {};
        const start_date = new Date();
        const schedule_date = new Date();
        const report_date = new Date();

    // Check the group's interval and set the dates accordingly
        switch (group.interval) {
          case 'hourly':
            start_date.setMinutes(start_date.getMinutes() + 3);
            schedule_date.setMinutes(schedule_date.getMinutes() + 1);
            report_date.setMinutes(schedule_date.getMinutes() + 5);
            break;
          case 'daily':
            start_date.setHours(start_date.getHours() + 3);
            schedule_date.setHours(schedule_date.getHours() + 1);
            report_date.setHours(schedule_date.getHours() + 5);
            break;
          default:
            start_date.setDate(start_date.getDate() + 3);
            schedule_date.setDate(schedule_date.getDate() + 1);
            report_date.setDate(schedule_date.getDate() + 5);
            break;
        }
        for (const user of users) {
          // const res = await ctx.runAction(internal.payments.createSubscription, {email: user?.email as string, plan: group.subscription_plan_id as string, start_date: start_date.toISOString() })
          // statuses[user._id] = res.status;
          await SendEmails.GroupComplete({email: user.email as string, groupName: group.name, date: start_date.toISOString()})
        }
        return {message:"success", start: start_date.toISOString(), schedule_date:schedule_date.toISOString(), report_date: report_date.toISOString()};
        // if (Object.values(statuses).every(val => val === true)) return {message:"success", start: start_date.toISOString(), schedule_date:schedule_date.toISOString(), report_date: report_date.toISOString()};
        // else throw new Error("Could not create all the subscriptions");
      }
    }
  })

export const groupClosed = internalAction({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args) {
    const users = await ctx.runQuery(api.memberships.getGroupMembers, {groupId: args.groupId})
    const group = await ctx.runQuery(api.group.getGroup, {groupId: args.groupId});
    if (users.length > 0 && group) {
      for (const user of users) {
        await SendEmails.GroupClosed({email: user.email as string, groupName: group.name})
      }
    }
  }
})