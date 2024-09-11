import { mutation, internalMutation, internalAction, QueryCtx } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { convertToMilliSeconds } from "./utils";
import { Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";


export const generateReport = internalMutation({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    const job = await ctx.db.get(jobId);
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.db.get(groupId);
    if (!group) throw new ConvexError("Could not get group of id " + groupId);
    const groupTransactions = await ctx.db.query("transactions").filter(t => t.eq(t.field("groupId"), groupId) && t.eq(t.field("details"), "pay group")).order("desc").collect();
    const start_date = new Date(group?.start_date as string);
    const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
    const elapsed = group?.elapsedTime ? group?.elapsedTime : 0;
    const receiver = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId) && m.eq(m.field("collection_number"), elapsed)).first();
    const multiplier = interval === "hourly" ? 1 : interval === "daily" ? 24 : interval === "weekly" ? 24 * 7 : 24 * 7 * 30;
    const timestamp = start_date.getTime();
    let startOfInterval = elapsed * multiplier;
    let endOfInterval = elapsed * multiplier + multiplier;
    startOfInterval = convertToMilliSeconds(startOfInterval) + timestamp;
    endOfInterval = convertToMilliSeconds(endOfInterval) + timestamp;
    const members_payment_status: any[] = []
    for (const trns of groupTransactions) {
      if (trns._creationTime >= startOfInterval && trns._creationTime <= endOfInterval) {
        const det = {
          userId: trns.userId, status: trns.status, amount: trns.amount
        }
        members_payment_status.push(det)
      }
    }
    await ctx.db.insert("interval", {groupId, receiver_id: receiver?.userId as Id<"users">, month: elapsed, members_payment_status });
  },
})

export const intervalRecord = internalMutation({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args_0) {
    const { jobId } = args_0;
    const job = await ctx.db.get(jobId);
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.db.get(groupId);
    if (!group) throw new ConvexError("Could not get group of id " + groupId);
    const elapsed = group?.elapsedTime ? group?.elapsedTime : 0;
    const receiver = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId) && m.eq(m.field("collection_number"), elapsed)).first();
    const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
    const multiplier = interval === "hourly" ? 1 : interval === "daily" ? 24 : interval === "weekly" ? 24 * 7 : 24 * 7 * 30;
    const start_date = new Date(group?.start_date as string);
    const timestamp = start_date.getTime();
    let startOfInterval = elapsed * multiplier;
    let endOfInterval = elapsed * multiplier + multiplier;
    startOfInterval = convertToMilliSeconds(startOfInterval) + timestamp;
    endOfInterval = convertToMilliSeconds(endOfInterval) + timestamp;
    await ctx.db.insert("interval", {groupId, receiver_id: receiver?.userId as Id<"users">, month: elapsed, start: startOfInterval, end: endOfInterval });
  },
})

export const payNextCustomer = internalMutation({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    const job = await ctx.db.get(jobId);
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.db.get(groupId);
    if (!group) throw new ConvexError("Could not get group of id " + groupId);
    const receiver = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId) && m.eq(m.field("collection_number"), group.elapsedTime)).first();
    const amount = group.number_of_people * group.savings_per_interval;
    const default_payment_method = await ctx.db.query("default_payment_method").filter(d => d.eq(d.field("userId"), receiver?.userId)).first();
    const payment_method = await ctx.db.get(default_payment_method?.paymentMethodId as Id<"payment_methods">)
    await ctx.scheduler.runAt(new Date(), internal.transfers.initiateTransfer, {groupId, userId: receiver?.userId as Id<"users">,
      amount, details: group.name +  "interval payment",
      recipient: payment_method?.recipient_code as string, retry: false,
      reason: "interval payment"
    })
    if (group.elapsedTime < group.number_of_people) {
      await ctx.db.patch(groupId, {elapsedTime: group.elapsedTime + 1});
    } else {
      await ctx.db.patch(groupId, {status: "closed"});
      
    }
    
  }
})

export const refundCustomer = internalMutation({
  args: {
    groupId: v.id("groups")
  },
  async handler(ctx, args_0) {
    const { groupId } = args_0;
    const members = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId)).collect();
    for (const member of members) {
      await ctx.scheduler.runAt(new Date(), internal.savings.addToFirstSavings, {userId: member.userId, amount: member.paid_deposit as number});
    }
  },
})

export const addPaidCustomersToInterval = internalMutation({
  args: {
    timestamp: v.string(),
    groupId: v.id("groups"),
    userId: v.id("users"),
    amount: v.float64(),
  },
  async handler(ctx, args_0) {
    const { timestamp, groupId, userId, amount } = args_0;
    const time = new Date(timestamp);
    const timeInMilliSeconds = time.getTime();
    const interval = await ctx.db.query("interval").filter(i => i.eq(i.field("groupId"), groupId) && i.gte(timeInMilliSeconds, i.field("start")) && i.lte(timeInMilliSeconds, i.field("end")) ).first();
    if (!interval) throw new ConvexError("Could not get interval");
    const members_payment_status = [...(interval.members_payment_status || []), {
      userId, status: "pending" as "pending" | "paid", amount
    }]
    await ctx.db.patch(interval._id, {members_payment_status});
  },
})