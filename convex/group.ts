import { internalMutation, mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { nanoid } from "nanoid";
import { generateAndShuffleNumbers } from "./utils";
import { Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";
import {paginationOptsValidator} from "convex/server";

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
    return await ctx.db.insert("groups", {creator_id: args.creator_id, name: args.name, number_of_people: args.number_of_people, number_of_people_present: 0, interval: args.interval, savings_per_interval: args.savings_per_interval, status: "pending", private: args.private, description: args?.description, elapsedTime: 0, amount: 0});
  }
});

export const generateGroupProfileUploadUrl = mutation(async (ctx) => await ctx.storage.generateUploadUrl());

export const saveGroupImage = mutation({
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
});

export const getAllGroups = query({
  args: {paginationOpts: paginationOptsValidator},
  async handler(ctx, args) {
    const groups = await ctx.db.query("groups").paginate(args.paginationOpts);
    const res = await Promise.all(groups.page.map(async (group) => {
      const invite = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), group._id) && i.neq(i.field("status"), "closed")).first();
      return {...group, inviteCode: invite?.code}
    }))
    return {
      ...groups, page: res
    }
  },
})

export const getTopGroups = query({
  async handler(ctx) {
    const groups = await ctx.db.query("groups").collect();
    const sortedGroups = groups.sort((a, b) => (a.number_of_people * a.savings_per_interval) - (b.number_of_people * b.savings_per_interval));
    const topGroups = sortedGroups.slice(0, 5);
    const res = await Promise.all(topGroups.map(async (group) => {
      const invite = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), group._id) && i.neq(i.field("status"), "closed")).first();
      return {...group, inviteCode: invite?.code}
    }))
    return res;
  },
})

export const getGroupsByInterval = query({
  args: {
    interval: v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("groups").filter(g => g.eq(g.field("interval"), args_0.interval)).collect();
  },
});

export const joinGroupWithInviteCode = mutation({
  args: {
    code: v.string(),
    userId: v.id("users"),
  },
  async handler(ctx, args) {
    console.info("code => ", args.code);
    const invite = await ctx.db.query("invites").filter(i => i.eq(i.field("code"), args.code)).first();
    if (!invite) throw new ConvexError("There is no invite code of " + args.code);
    if (invite.status === "closed") throw new ConvexError("The group is closed");
    const group = await ctx.db.get(invite.groupId);
    if (!group) throw new ConvexError("There is no group attached to invite code of " + args.code);
    await ctx.scheduler.runAfter(0, api.actions.addMember, {groupId: group._id, userId: args.userId, inviteCode: args.code});
    return group._id;
  }
})

export const getGroupWithInviteCode = query({
  args: {
    code: v.string(),
  },
  async handler(ctx, args) {
    const invite = await ctx.db.query("invites").filter(i => i.eq(i.field("code"), args.code)).first();
    if (!invite) throw new ConvexError("There is no invite code of " + args.code);
    return await ctx.db.get(invite.groupId);
  }
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
    // get invite of the group and close it too
    const invite = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), args_0.groupId)).first();
    if (invite) await ctx.db.patch(invite._id, {status: "closed"});
    await ctx.scheduler.runAt(new Date(), internal.subscription.groupClosed, {groupId: args_0.groupId})
    return await ctx.db.patch(args_0.groupId, {status: "closed"});
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
    const exists = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), args.groupId)).first();
    if (exists) return;
    await ctx.db.insert("invites", {groupId: args.groupId, code: code, status: args.status});
    return code;
  }
});

export const updateInviteStatus = internalMutation({
  args: {
    groupId: v.id("groups"),
    status: v.string(),
  },
  async handler(ctx, args) {
    const {groupId, status} = args;
    const exists = await ctx.db.query("invites").filter(i => i.eq(i.field("groupId"), groupId)).first();
    if (exists) await ctx.db.patch(exists._id, {status});
  }
});

export const getGroupByName = query({
  args: {
    name: v.string()
  },
  async handler(ctx, args_0) {
    return await ctx.db.query("groups").filter(g => g.eq(g.field("name"), args_0.name)).first();
  },
})
