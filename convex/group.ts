import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { nanoid } from "nanoid";
import { generateAndShuffleNumbers } from "./utils";
import { Id } from "./_generated/dataModel";

/**
 * @return groupId
 */
export const createGroup = mutation({
  args: {
    creator_id: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    number_of_people: v.float64(),
    interval: v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    private: v.boolean()
  },
  handler: async (ctx, args) => {
    const groupId = await ctx.db.insert("groups", {creator_id: args.creator_id, name: args.name, number_of_people: args.number_of_people, number_of_people_present: 0, interval: args.interval, savings_per_interval: args.savings_per_interval, status: "pending", private: args.private, description: args?.description, elapsedTime: 0});
    if (groupId) {
      return await ctx.db.get(groupId);
    }
  }
});

export const getAllGroups = query({
  args: {},
  async handler(ctx, args_0) {
    return await ctx.db.query("groups").collect();
  },
}
)

export const generateGroupProfileUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());

export const saveUserProfileImage = mutation({
  args: {
    imageId: v.id("_storage"),
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const {imageId, groupId} = args_0;
    const image = await ctx.storage.getUrl(imageId);
    if (!image) throw new ConvexError("Could not get image from storage")
    await ctx.db.patch(groupId, {imageId, image})
  },
})

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
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    const exists = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), args.groupId) && m.eq(m.field("userId"), args.userId)).first();
    if (exists) throw new ConvexError("User is already a member");
    if (group && group.number_of_people_present <= group.number_of_people) {
      await ctx.db.insert("membership", {groupId: args.groupId, userId: args.userId, paid_deposit: args.paid_deposit});
      await ctx.db.patch(group._id, {number_of_people_present: group.number_of_people_present + 1})
    } else {
      throw new ConvexError("The group does not exist or the group is full")
    }
  }
});

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

export const getGroup = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const group = await ctx.db.get(args_0.groupId);
    if (!group) throw new ConvexError("Could not get group of id " + args_0.groupId);
    const invite  = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), args_0.groupId)).first();
    return {...group, inviteCode: invite ? invite.code : ""}
  },
})

export const getGroupMemberships = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const members = await ctx.db.query("membership").filter(q => q.eq(q.field("groupId"), args_0.groupId)).collect();
    const memberships: any[] = [];
    for (const member of members) {
      const res = await ctx.db.get(member.userId);
      if (res) memberships.push(res);
    }
    return memberships
  },
})

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

export const startGroup = internalMutation({
  args: {
    groupId: v.id("groups"),
    start_date: v.string()
  },
  async handler(ctx, args_0) {
    return await ctx.db.patch(args_0.groupId, {start_date: args_0.start_date, status: "active", elapsedTime: 1})
  },
})

export const endGroup = internalMutation({
  args: {
    groupId: v.id("groups"),
  },
  async handler(ctx, args_0) {
    return await ctx.db.patch(args_0.groupId, {status: "closed"})
  },
})

export const assignSlot = mutation({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    // find all members of the group
    const allMembers = await ctx.db.query("membership").filter(q => q.eq(q.field("groupId"), args_0.groupId)).collect();
    const group = await ctx.db.get(args_0.groupId);
    if (group?.number_of_people !== group?.number_of_people_present) throw new ConvexError("The group is not yet full");
    if (allMembers.length > 0 && group) {
      const members: {[member_id: Id<"membership">] : number} = {};
      const numbers = generateAndShuffleNumbers(group.number_of_people)
      let i = 0;
      for (const member of allMembers) {
        members[member._id] = numbers[i];
        i++
      }
      for (let member_id in members) {
        const mem_id: Id<"membership"> = member_id as Id<"membership">;
        await ctx.db.patch(mem_id, {collection_number: members[mem_id]})
      }
    } else {
      throw new ConvexError({
        message: "The group does not exist"
      })
    }
  },
})

export const createInvite = internalMutation({
  args: {
    groupId: v.id("groups"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const code = nanoid(5);
    await ctx.db.insert("invites", {groupId: args.groupId, code: code, status: args.status});
    return code;
  }
});

export const createAuthorization = internalMutation({
  args: {
    userId: v.id('users'),
    authorization_code: v.string(),
    bin: v.string(),
    last4: v.string(),
    exp_month: v.string(),
    exp_year: v.string(),
    card_type: v.string(),
    bank: v.string(),
    country_code: v.string(),
    brand: v.string(),
  },
  handler: async (ctx, args) => {
      const { userId, authorization_code, bin, last4, exp_month, exp_year, card_type, bank, country_code, brand } = args;
      if (await ctx.db.query("authorizations").filter(q => q.eq(q.field("authorization_code"), authorization_code) || q.eq(q.field("userId"), userId) ).first()) return;
      await ctx.db.insert("authorizations", {userId, authorization_code, bin, last4, exp_month, exp_year, card_type, bank, country_code, brand});
  }
})