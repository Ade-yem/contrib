import { ConvexError, v } from "convex/values";
import { internalAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";

export const subscribeUsersToPlan = internalAction({
    args: {
      group_id: v.id("groups")
    },
    async handler(ctx, args) {
      const users = await ctx.runQuery(api.group.getGroupMemberships, {group_id: args.group_id})
      const group = await ctx.runQuery(api.group.getGroup, {group_id: args.group_id});
      if (users.length > 0 && group) {
        
        const statuses: {[member_id: Id<"membership">] : boolean} = {}
        // create a new date and add two days to it
        const start_date = new Date();
        start_date.setDate(start_date.getDate() + 2);
        const start = start_date.toISOString();
        for (const user of users) {
          const userz = await ctx.runQuery(api.user.getUserz, {userId: user.user_id})
          if (userz) {
            const res = await ctx.runAction(internal.payments.createSubscription, {email: userz?.email as string, plan: group.subscription_plan_id as string, start_date: start })
            statuses[user._id] = res.status;
          }
        }
        if (Object.values(statuses).every(val => val === true)) return {message:"success", start};
        else throw new ConvexError("Could not create all the subscriptions");
      }
    }
  })