import { internal } from "./_generated/api";
import { internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { cron } from "./cronlib";
import { parseToMilliSeconds } from "./utils"

// export const scheduleIntervalReport = internalMutation({
//   args: {
//     groupId: v.id("groups"),
//     name: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const group = await ctx.db.get(args.groupId);
//     const jobId = await ctx.db.insert("jobs", {
//       name: args.name,
//       groupId: args.groupId,
//       details: "intervalStart",
//     })
//     const limit = group?.number_of_people as number
//     const interval = group?.interval as "5 minutes" | "hourly" | "daily" | "weekly" | "monthly";
//     const cronId = await cron(ctx, parseToMilliSeconds(interval), limit, internal.intervalReport.intervalRecord, {jobId})
//     await ctx.db.patch(jobId, { cronId });
//   }
// })

// export const scheduleMidTransactionReport = internalMutation({
//   args: {
//     groupId: v.id("groups"),
//     name: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     const group = await ctx.db.get(args.groupId);
//     const jobId = await ctx.db.insert("jobs", {
//       name: args.name,
//       groupId: args.groupId,
//       details: "midInterval",
//     })
//     const limit = group?.number_of_people as number
//     const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
//     const cronId = await cron(ctx, parseToMilliSeconds(interval) / 2, limit *  2, internal.intervalReport.generateReport, {jobId})
//     await ctx.db.patch(jobId, { cronId });
//   }
// })

export const scheduleIntervalPayment = internalMutation({
  args: {
    groupId: v.id("groups"),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    const jobId = await ctx.db.insert("jobs", {
      name: args.name,
      groupId: args.groupId,
    })
    const limit = group?.number_of_people as number
    const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
    //const cronId = await cron(ctx, parseToMilliSeconds(interval), limit, internal.intervalReport.payNextCustomer, {jobId})
    //await ctx.db.patch(jobId, { cronId });
  }
})

export const scheduleIntervalCharge = internalMutation({
  args: {
    groupId: v.id("groups"),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const group = await ctx.db.get(args.groupId);
    const jobId = await ctx.db.insert("jobs", {
      name: args.name,
      groupId: args.groupId,
    })
    const limit = group?.number_of_people as number
    const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
    //const cronId = await cron(ctx, parseToMilliSeconds(interval), limit, internal.intervalReport.intervalCharge, {jobId})
   // await ctx.db.patch(jobId, { cronId });
  }
})

