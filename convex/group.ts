import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createGroup = mutation({
  args: {
    creator_id: v.id("users"),
    name: v.string(),
    subscription_plan_id: v.string(),
    number_of_people: v.float64(),
    number_of_people_present: v.float64(),
    savings_per_momth: v.float64(),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.float64(),
    elapsed_time: v.float64(),
  },
  handler: async (ctx, args) => {
    const group_id = await ctx.db.insert("groups", args);
    return { group_id };
  }
});

export const createMembership = mutation({
  args: {
    group_id: v.id("groups"),
    user_id: v.id("users"),
    collection_number: v.float64(),
  },
  handler: async (ctx, args) => {
    const membership_id = await ctx.db.insert("membership", args);
    return { membership_id };
  }
});

export const createInvite = mutation({
  args: {
    group_id: v.id("groups"),
    code: v.optional(v.string()),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const invite_id = await ctx.db.insert("invites", args);
    return { invite_id };
  }
});
