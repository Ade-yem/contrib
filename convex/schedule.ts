// import { MutationCtx } from "./_generated/server";
// import { Id } from "./_generated/dataModel";
// import { ConvexError } from "convex/values";
// import { parseToMilliSeconds } from "./utils";
// import { internal } from "./_generated/api";

// export const scheduleFunction = async (ctx: MutationCtx, groupId: Id<"groups">) => {
//     const group = await ctx.db.get(groupId);
//     if (!group) throw new ConvexError("Could not get group of id " + groupId);
//     await ctx.scheduler.runAfter(parseToMilliSeconds(group.interval), internal.intervalReport.generateReport, {
//         groupId
//     })
// }