import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { nanoid } from "nanoid";

/**
 * @return group_id
 */
export const createGroup = mutation({
  args: {
    creator_id: v.id("users"),
    name: v.string(),
    subscription_plan_id: v.string(),
    number_of_people: v.float64(),
    number_of_people_present: v.float64(),
    interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.float64(),
    elapsed_time: v.float64(),
    private: v.boolean()
  },
  handler: async (ctx, args) => {
    const group_id = await ctx.db.insert("groups", args);
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

export const createMembership = mutation({
  args: {
    group_id: v.id("groups"),
    user_id: v.id("users"),
    collection_number: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const membership_id = await ctx.db.insert("membership", {group_id: args.group_id, user_id: args.user_id});
    return membership_id;
  }
});

export const createInvite = mutation({
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