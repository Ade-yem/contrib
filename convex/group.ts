import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { nanoid } from "nanoid";
import { generateAndShuffleNumbers } from "./utils";
import { Id } from "./_generated/dataModel";

/**
 * @return group_id
 */
export const createGroup = mutation({
  args: {
    creator_id: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    number_of_people: v.float64(),
    interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    private: v.boolean()
  },
  handler: async (ctx, args) => {
    const group_id = await ctx.db.insert("groups", {creator_id: args.creator_id, name: args.name, number_of_people: args.number_of_people, number_of_people_present: 0, interval: args.interval, savings_per_interval: args.savings_per_interval, status: "pending", private: args.private, description: args?.description});
    if (group_id) {
      return await ctx.db.get(group_id);
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

export const getUserMemberships = query({
  args: {
    user_id: v.id("users")
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("membership").filter(q => q.eq(q.field("user_id"), args_0.user_id)).collect();
  },
})

export const createMembership = internalMutation({
  args: {
    group_id: v.id("groups"),
    user_id: v.id("users"),
    paid_deposit: v.float64(),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.group_id);
    if (group && group.number_of_people_present <= group.number_of_people) {
      await ctx.db.insert("membership", {group_id: args.group_id, user_id: args.user_id, paid_deposit: args.paid_deposit});
      await ctx.db.patch(group._id, {number_of_people_present: group.number_of_people_present++})
    } else {
      throw new ConvexError({
        message: "The group does not exist or the group is full"
      })
    }
  }
});

export const getGroup = query({
  args: {
    group_id: v.id("groups")
  },
  async handler(ctx, args_0) {
    return await ctx.db.get(args_0.group_id)
  },
})

export const getGroupMemberships = query({
  args: {
    group_id: v.id("groups")
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("membership").filter(q => q.eq(q.field("group_id"), args_0.group_id)).collect();
  },
})

export const getGroupMembers = query({
  args: {
    group_id: v.id("groups")
  },
  async handler(ctx, args_0) {
    const members = await ctx.db.query("membership").filter(q => q.eq(q.field("group_id"), args_0.group_id)).collect();
    const membersList = [];
    for (const member of members) {
      const user = await ctx.db.get(member.user_id);
      if (user) membersList.push(user);
    }
    return membersList;
  },
})
export const startGroup = internalMutation({
  args: {
    group_id: v.id("groups"),
    start_date: v.string()
  },
  async handler(ctx, args_0) {
    return await ctx.db.patch(args_0.group_id, {start_date: args_0.start_date, status: "active"})
  },
})
export const endGroup = internalMutation({
  args: {
    group_id: v.id("groups"),
  },
  async handler(ctx, args_0) {
    return await ctx.db.patch(args_0.group_id, {status: "closed"})
  },
})
export const assignSlot = mutation({
  args: {
    group_id: v.id("groups")
  },
  async handler(ctx, args_0) {
    // find all members of the group
    const allMembers = await ctx.db.query("membership").filter(q => q.eq(q.field("group_id"), args_0.group_id)).collect();
    const group = await ctx.db.get(args_0.group_id);
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
    group_id: v.id("groups"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const code = nanoid(5);
    await ctx.db.insert("invites", {group_id: args.group_id, code: code, status: args.status});
    return code;
  }
});