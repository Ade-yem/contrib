import {query} from "./_generated/server";
import { auth } from "./auth";
import {ConvexError, v} from "convex/values";
import {paginationOptsValidator} from "convex/server";
import {Id} from "./_generated/dataModel";

type Transaction = {
  name: string;
  id: string;
  amount: number;
  status: string;
  reference: string;
  details: string | undefined;
}
export const getMyTransactions = query({
  args: {
    userId: v.id("users"),
    paginationOpts: paginationOptsValidator
  },
  async handler(ctx, args) {
    const {userId} = args;
    const result = await ctx.db.query("transactions").filter(t => t.eq(t.field("userId"), userId)).order("desc").paginate(args.paginationOpts);
    const myTransactions: Transaction[] = [];
    for (const transaction of result.page) {
      const group = transaction.groupId ? await ctx.db.get(transaction?.groupId) : undefined;
      const saving = transaction.savingsId ? await ctx.db.get(transaction?.savingsId) : undefined;
      const res: Transaction = {
        name: group ? group?.name : saving ? saving?.name : "No name",
        id: transaction._id,
        amount: transaction.amount,
        status: transaction.status,
        reference: transaction.reference,
        details: transaction.details
      }
      myTransactions.push(res);
    }
    return {...result, page: myTransactions};
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
    const result = await ctx.db.query("transactions").filter(t => t.eq(t.field("groupId"), args.groupId)).order("desc").paginate(args.paginationOpts);
    const groupTransactions: Transaction[] = [];
    for (const transaction of result.page) {
      const group = await ctx.db.get(transaction?.groupId as Id<"groups">);
      const res: Transaction = {
        name: group ? group?.name : "No name",
        id: transaction._id,
        amount: transaction.amount,
        status: transaction.status,
        reference: transaction.reference,
        details: transaction.details
      }
      groupTransactions.push(res);
    }
    return {...result, page: groupTransactions};
  }
})
