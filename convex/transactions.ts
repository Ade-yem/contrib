import {query} from "./_generated/server";
import { auth } from "./auth";
import {ConvexError, v} from "convex/values";
import {paginationOptsValidator} from "convex/server";

export const getMyTransactions = query({
  args: {
    paginationOpts: paginationOptsValidator
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new ConvexError("User is not authenticated");
    return await ctx.db.query("transactions").filter(t => t.eq(t.field("userId"), userId)).order("desc").paginate(args.paginationOpts);
  }
})
export const getGroupTransactions = query({
  args: {
    paginationOpts: paginationOptsValidator,
    groupId: v.id("groups")
  },
  async handler(ctx, args) {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new ConvexError("User is not authenticated");
    return await ctx.db.query("transactions").filter(t => t.eq(t.field("groupId"), args.groupId)).order("desc").paginate(args.paginationOpts);
  }
})
