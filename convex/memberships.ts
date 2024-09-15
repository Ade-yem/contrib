import { query, internalMutation, internalQuery } from "./_generated/server";
import { v, ConvexError } from "convex/values";


export const getUserMemberships = query({
  args: {
    userId: v.id("users")
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("membership").filter(q => q.eq(q.field("userId"), args_0.userId)).collect();
  },
})

export const createMembership = internalMutation({
  args: {
    groupId: v.id("groups"),
    userId: v.id("users"),
    paid_deposit: v.optional(v.float64()),
    inviteCode: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    if (group?.private) {
      const res = await ctx.db.query("invites").filter(i => i.eq(i.field("code"), args.inviteCode)).first();
      if (!res) throw new Error("The invite code does not match what we have");
    }
    const members = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), args.groupId)).collect();
    const exists: any[] = [];
    for (const member of members) {
      if (member.userId === args.userId) exists.push(member);
    };
    if (exists.length > 0) throw new Error("User is already in the group");
    if (group && group.number_of_people_present <= group.number_of_people) {
      await ctx.db.insert("membership", {groupId: args.groupId, userId: args.userId, paid_deposit: args.paid_deposit});
      await ctx.db.patch(group._id, {number_of_people_present: group.number_of_people_present + 1})
    } else {
      throw new Error("The group does not exist or the group is full")
    }
  }
});

export const getGroupMembers = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const members = await ctx.db.query("membership").filter(q => q.eq(q.field("groupId"), args_0.groupId)).collect();
    const membersList = [];
    for (const member of members) {
      const user = await ctx.db.get(member.userId);
      if (user) membersList.push(user);
    }
    return membersList;
  },
})

export const addSubscriptionCodeToMembership = internalMutation({
  args: {
    email: v.string(),
    subscription_code: v.string(),
    plan_code: v.string()
  },
  async handler(ctx, args) {
    const user = await ctx.db.query("users").filter(u => u.eq(u.field("email"), args.email)).first();
    const group = await ctx.db.query("groups").filter(g => g.eq(g.field("subscription_plan_id"), args.plan_code)).first();
    if (user && group) {
      const membership = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), group._id) && m.eq(m.field("userId"), user._id)).first();
      if (!membership) throw new ConvexError("Could not get membership");
      await ctx.db.patch(membership._id, {subscription_code: args.subscription_code});
    } else throw new ConvexError("Could not get user or group");
  },
})

export const getMembershipWithSubscriptionCode = internalQuery({
  args: {
    subscription_code: v.string()
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("membership").filter(q => q.eq(q.field("subscription_code"), args_0.subscription_code)).first();
  },
})