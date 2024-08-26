import { mutation, query } from "./_generated/server";
import { auth } from "./auth";
import { v } from "convex/values";

export const getUser = query({
    args: {},
    handler: async (ctx, args_0) => {
        const userId = await auth.getUserId(ctx);
        return userId !== null ? ctx.db.get(userId) : null;
    },
});

export const getInviteLink = query({
    args: {
        group_id: v.id("groups")
    },
    async handler(ctx, args_0) {
        const res = await ctx.db.query("invites").filter((inv) => inv.eq(inv.field("group_id"), args_0.group_id)).collect();
        const inv_code = res[0].code
        const link = process.env.SITE_URL;
        return `${link}/${inv_code}`
    },
})

export const editProfile = mutation({
    args: {
        image: v.optional(v.string()),
        name: v.optional(v.string()),
        phone: v.optional(v.string()),
        user_id: v.id("users")
    },
    async handler(ctx, args_0) {
        await ctx.db.patch(args_0.user_id, {image: args_0.image, name: args_0.name, phone: args_0.phone})
    }
})