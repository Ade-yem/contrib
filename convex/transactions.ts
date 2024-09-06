import {query} from "./_generated/server";
import { auth } from "./auth";
import {ConvexError, v} from "convex/values";

export const getMyTransactions = query({
  async handler(ctx) {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new ConvexError("User is not authenticated");
    return await ctx.db.query("transactions").filter(t => t.eq(t.field("userId"), userId)).order("desc").collect();
  }
})
export const getGroupTransactions = query({
  args:{groupId: v.id("groups")},
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new ConvexError("User is not authenticated");
    return await ctx.db.query("transactions").filter(t => t.eq(t.field("groupId"), args.groupId)).order("desc").collect();
  }
})
