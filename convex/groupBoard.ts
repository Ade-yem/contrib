import { Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";
import { query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getAvailableMoneyAndReceiver = query({
  args: {
    groupId: v.id("groups"),
  },
  async handler(ctx, args) {
    const {groupId} = args;
    const date = Date.now();
    const interval = await ctx.db.query("interval").filter(i => i.eq(i.field("groupId"), groupId) && i.gte(date, i.field("start")) && i.lte(date, i.field("end")) ).first();
    const group = await ctx.db.get(groupId);
    const user = await ctx.db.get(interval?.receiver_id as Id<"users">)
    const name = `${user?.first_name} ${user?.last_name}`
    return {available: group?.amount as number, nextReceiver: name, nameOfGroup: group?.name};
  }
})

export const getGroupMemberships = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const members = await ctx.db.query("membership").filter(q => q.eq(q.field("groupId"), args_0.groupId)).collect();
    const group = await ctx.db.get(args_0.groupId);
    const memberships: any[] = [];
    for (const member of members) {
      const user = await ctx.db.get(member.userId);
      if (user) {
        const details = {
          name: user.first_name as string + user.last_name as string,
          id: user._id,
          creator: user._id === group?.creator_id,
          image: user.image
        }
        memberships.push(details);}
    }
    return memberships
  },
})

export const getCollectionPercentage = query({
  args: {
    groupId: v.id("groups"),
  },
  async handler(ctx, args) {
    const {groupId} = args;
    const group = await ctx.db.get(groupId);
    if (group) {
      return (group.elapsedTime / group.number_of_people) * 100
    }
  }
})

// You can get the activities from getGroupTransactions from the transactions.ts