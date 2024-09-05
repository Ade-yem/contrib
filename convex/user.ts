import { mutation, query, action, internalMutation } from "./_generated/server";
import { auth } from "./auth";
import { v, ConvexError } from "convex/values";
import {Id} from "./_generated/dataModel";

export const getUser = query({
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});

export const getUserz = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args_0) => {
    return await ctx.db.get(args_0.userId)
  },
});

export const getInviteLink = query({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const res = await ctx.db.query("invites").filter((inv) => inv.eq(inv.field("groupId"), args_0.groupId)).collect();
    const inv_code = res[0].code
    const link = process.env.SITE_URL;
    return `${link}/${inv_code}`
  },
})

export const editProfile = mutation({
  args: {
    gender: v.union(v.literal("male"), v.literal("female")),
    phone: v.optional(v.string()),
    dob: v.optional(v.string()),
    bvn: v.optional(v.string()),
    nin: v.optional(v.string()),
    homeAddress: v.optional(v.string()),
    nationality: v.optional(v.float64()),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    user_id: v.id("users")
  },
  async handler(ctx, args_0) {
    const { gender, phone, dob, bvn, nin, homeAddress, nationality, first_name, last_name, user_id } = args_0;
    await ctx.db.patch(user_id, { gender, phone, dob, bvn, nin, homeAddress, nationality, first_name, last_name })
  }
})

export const generateUploadUrl = mutation(async (ctx) => {
  const userId = await auth.getUserId(ctx);
  if (!userId) throw new ConvexError("User is not verified");
  const user = await ctx.db.get(userId);
  if (!user) throw new ConvexError("User is not found");
  await ctx.storage.delete(user.imageId as Id<"_storage">);
  return await ctx.storage.generateUploadUrl();
});

export const saveImageId = mutation({
  args: {
    imageId: v.id("_storage")
  },
  async handler(ctx, args_0) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new ConvexError("User is not verified");
    const {imageId} = args_0;
    const image = await ctx.storage.getUrl(imageId);
    if (!image) throw new ConvexError("Could not get image from storage")
    await ctx.db.patch(userId, {imageId, image})
  },
})

export const kycVerification = mutation({
  args: {
    phone: v.optional(v.string()),
    dob: v.optional(v.string()),
    bvn: v.optional(v.string()),
    nin: v.optional(v.string()),
    homeAddress: v.optional(v.string()),
  },
  async handler(ctx, args_0) {
    const userId = await auth.getUserId(ctx);
    const { phone, dob, bvn, homeAddress, nin } = args_0;
    if (!userId) throw new ConvexError("User is not verified");
    await ctx.db.patch(userId, {phone, dob, bvn, homeAddress, kycVerified: true, nin})
  },
})

export const addNin = internalMutation({
  args: {nin: v.string()},
  async handler(ctx, args) {
    const {nin} = args;
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new ConvexError("User is not authenticated!");
    await ctx.db.patch(userId, {nin});
  }
})
