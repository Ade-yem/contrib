import { mutation, query, internalMutation } from "./_generated/server";
import { auth } from "./auth";
import {paginationOptsValidator} from "convex/server";
import { v, ConvexError } from "convex/values";
import {Id} from "./_generated/dataModel";

export const getUser = query({
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    return userId !== null ? ctx.db.get(userId) : null;
  },
});

export const getUserById = query({
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
    nationality: v.optional(v.string()),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    user_id: v.id("users")
  },
  async handler(ctx, args_0) {
    const { gender, phone, dob, bvn, nin, homeAddress, nationality, first_name, last_name, user_id } = args_0;
    await ctx.db.patch(user_id, { gender, phone, dob, bvn, nin, homeAddress, nationality, first_name, last_name })
  }
})

export const generateUserProfileUploadUrl = mutation(async (ctx) => {
  const userId = await auth.getUserId(ctx);
  if (!userId) throw new ConvexError("User is not verified");
  const user = await ctx.db.get(userId);
  if (!user) throw new ConvexError("User is not found");
  await ctx.storage.delete(user.imageId as Id<"_storage">);
  return await ctx.storage.generateUploadUrl();
});

export const saveUserProfileImage = mutation({
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

type myGroup = {
  name: string;
  groupId: Id<"groups">;
  description: string | undefined;
  collectionNumber: number | undefined;
  membershipId: Id<"membership">;
  amount: number;
  numOfMembers: number;
  numJoined: number;
  paymentPerInterval: number;
  status: string;
  inviteCode: string;
}

export const getMyGroups = query({
  args: {
    userId: v.optional(v.id("users")),
    paginationOpts: paginationOptsValidator
  },
  async handler(ctx, args) {
    const {userId} = args;
    const groups = await ctx.db.query("membership").filter((m) => m.eq(m.field("userId"), userId)).paginate(args.paginationOpts);
    const memberships: myGroup[] = [];
    for (const member of groups.page) {
      const group = await ctx.db.get(member.groupId);
      const invite = await ctx.db.query("invites").filter((m) => m.eq(m.field("groupId"), member.groupId)).first();
      if (!group) throw new ConvexError("Could not get group");
      const groupItem: myGroup = {
        name: group.name,
        groupId: group._id,
        description: group.description,
        collectionNumber: member.collection_number,
        membershipId: member._id,
        amount: group.number_of_people * group.savings_per_interval,
        numOfMembers: group.number_of_people,
        numJoined: group.number_of_people_present,
        paymentPerInterval: group.savings_per_interval,
        status: group.status,
        inviteCode: invite?.code || ""
      }
      memberships.push(groupItem);
    }
    return {...groups, page: memberships};
  }
})

export const getTotalSavings = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new ConvexError("User is not authenticated!");
    const savings = await ctx.db.query("savings").filter((m) => m.eq(m.field("userId"), userId)).collect();
    let total = 0;
    for (const saving of savings){
      total += saving.amount;
    }
    return total;
  }
});

export const getMySavings = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new ConvexError("User is not authenticated!");
    return await ctx.db.query("savings").filter((m) => m.eq(m.field("userId"), userId)).collect();
  }
});

export const getDefaultPAymentMethod = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx);
    if (!userId) throw new ConvexError("User is not authenticated!");
    const payment = await ctx.db.query("default_payment_method").filter((m) => m.eq(m.field("userId"), userId)).first();
    if (payment) return ctx.db.get(payment.paymentMethodId)
    else throw new ConvexError("There is no default payment method");
  }
})
