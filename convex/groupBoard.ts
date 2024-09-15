import { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { v } from "convex/values";

export const getAvailableMoneyAndReceiver = query({
  args: {
    groupId: v.id("groups"),
  },
  async handler(ctx, args) {
    const {groupId} = args;
    const group = await ctx.db.get(groupId);
    const membership = await ctx.db.query("membership").filter(i => i.eq(i.field("groupId"), groupId) && i.eq(group?.elapsedTime, i.field("collection_number"))).first();
    if (membership) {
      const user = await ctx.db.get(membership?.userId as Id<"users">)
      const name = `${user?.first_name} ${user?.last_name}`
      return {available: group?.amount as number, nextReceiver: name, nameOfGroup: group?.name};
    } else {
      return {available: group?.amount as number, nextReceiver: "The group has not started yet", nameOfGroup: group?.name};
    }
  }
})

export const getGroupMemberships = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const members = await ctx.db.query("membership").filter(q => q.eq(q.field("groupId"), args_0.groupId)).collect();
    const group = await ctx.db.get(args_0.groupId);
    const memberships = [];
    for (const member of members) {
      const user = await ctx.db.get(member.userId);
      if (user) {
        const details = {
          name: user.first_name as string + " " + user.last_name as string,
          id: user._id,
          creator: user._id === group?.creator_id,
          image: user.image
        }
        memberships.push(details);
      };
    };
    return memberships;
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