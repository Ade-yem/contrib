import { query, internalMutation, internalAction, internalQuery } from "./_generated/server";
import { v, ConvexError } from "convex/values";
import { convertToMilliSeconds, parseToMilliSeconds } from "./utils";
import { Id } from "./_generated/dataModel";
import { api, internal } from "./_generated/api";
import {SendEmails} from "./resend/resend";

export const generateReport = internalMutation({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    const job = await ctx.db.get(jobId);
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.db.get(groupId);
    if (!group) throw new Error("Could not get group of id " + groupId);
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
    await ctx.db.insert("interval", {groupId, receiver_id: receiver?.userId as Id<"users">, month: elapsed, members_payment_status, details: job?.details });
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
    if (!group) throw new Error("Could not get group of id " + groupId);
    const elapsed = group?.elapsedTime ? group?.elapsedTime : 0;
    const receiver = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId) && m.eq(m.field("collection_number"), elapsed)).first();
    const interval = group?.interval as "hourly" | "daily" | "weekly" | "monthly";
    const multiplier = interval === "hourly" ? 1 : interval === "daily" ? 24 : interval === "weekly" ? 24 * 7 : 24 * 7 * 30;
    const start_date = new Date(group?.start_date as string);
    const timestamp = start_date.getTime();
    let startOfInterval = elapsed * multiplier;
    let endOfInterval = elapsed * multiplier + multiplier;
    const amount = 0;
    startOfInterval = convertToMilliSeconds(startOfInterval) + timestamp;
    endOfInterval = convertToMilliSeconds(endOfInterval) + timestamp;
    await ctx.db.insert("interval", {groupId, receiver_id: receiver?.userId as Id<"users">, month: elapsed, start: startOfInterval, end: endOfInterval, details: job?.details, amount });
  },
})

export const intervalChange = internalMutation({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    const job = await ctx.db.get(jobId);
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.db.get(groupId);
    if (!group) throw new Error("Could not get group of id " + groupId);
    if (group.elapsedTime < group.number_of_people) {
      await ctx.db.patch(groupId, {elapsedTime: group.elapsedTime + 1});
    } else {
      await ctx.scheduler.runAfter(0, internal.group.endGroup, {groupId});
    }
  }
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
    if (!group) throw new Error("Could not get group of id " + groupId);
    const receiver = await ctx.db.query("membership").filter(m => m.eq(m.field("groupId"), groupId) && m.eq(m.field("collection_number"), group.elapsedTime)).first();
    const amount = group.number_of_people * group.savings_per_interval;
    const payment_method = await ctx.db.query("payment_methods").filter(d => d.eq(d.field("userId"), receiver?.userId)).first();
    // const payment_method = await ctx.db.get(default_payment_method?.paymentMethodId as Id<"payment_methods">)
    await ctx.scheduler.runAt(new Date(), internal.transfers.initiateTransfer, {groupId, userId: receiver?.userId as Id<"users">,
      amount: amount, details: group.name +  "interval payment",
      recipient: payment_method?.recipient_code as string, retry: false,
      reason: "interval payment", accountNumber: payment_method?.account_number as string
    })
    await ctx.db.patch(groupId, {amount: group.amount as number - amount});
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

/**
 * @function addPaidCustomersToInterval add paid customers to an interval
 * @param timestamp the timestamp of the interval
 * @param groupId the group id
 * @param userId the user id
 * @param amount the amount paid by the user
 * @returns void
 * @throws ConvexError if the interval could not be found or updated in the database
 */
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
    const intervals = await ctx.db.query("interval").filter(i => i.eq(i.field("groupId"), groupId)).collect();
    let interval = null;
    for (const interv of intervals) {
      if (interv && interv.start && timeInMilliSeconds >= interv.start && interv.end && timeInMilliSeconds <= interv.end) {
        interval = interv;
        break;
      }
    }
    if (!interval) {
      throw new Error("Could not get interval");  
    }
    const intAmount = interval.amount ? interval.amount : 0;
    const members_payment_status = [...(interval.members_payment_status || []), {
      userId, status: "pending" as "pending" | "paid", amount
    }]
    await ctx.db.patch(interval._id, {members_payment_status, amount: intAmount + amount});
  },
});

/**
 * @function updatePaymentStatus update the payment status of a user in an interval
 * @param groupId the group id
 * @param userId the user id
 * @returns void
 * @throws ConvexError if the interval could not be found or updated in the database
 */
export const updatePaymentStatus = internalMutation({
  args: {
    groupId: v.id("groups"),
    userId: v.id("users"),
    timestamp: v.string(),
    amount: v.float64()
  },
  async handler(ctx, args_0) {
    const { groupId, userId, amount, timestamp } = args_0;
    const time = new Date(timestamp);
    const timeInMilliSeconds = time.getTime();
    const interval = await ctx.db.query("interval").filter(i => i.eq(i.field("groupId"), groupId) && i.gte(timeInMilliSeconds, i.field("start")) && i.lte(timeInMilliSeconds, i.field("end")) ).first();
    if (!interval) throw new Error("Could not get interval");
    const members_payment_status = (interval.members_payment_status ?? []).map((member: any) => {
      if (member.userId === userId) {
        member.status = "paid";
      }
      return member;
    });
    await ctx.db.patch(interval._id, {members_payment_status});
    const group = await ctx.db.get(groupId);
    if (group) await ctx.db.patch(groupId, {amount: group.amount as number + amount})
  },
})

export const getDefaulters = query({
  args: {
    groupId: v.id("groups"),
  },
  async handler(ctx, args) {
    const { groupId } = args;
    const timeInMilliSeconds = Date.now();
    const interval = await ctx.db.query("interval").filter(i => i.eq(i.field("groupId"), groupId) && i.gte(timeInMilliSeconds, i.field("start")) && i.lte(timeInMilliSeconds, i.field("end")) ).first();
    if (!interval) return [];
    return interval.members_payment_status?.filter((member: any) => member.status !== "paid");
  }
})

export const warnAndCharge = internalAction({
  args:{
    groupId: v.id("groups"),
    userId: v.id("users"),
    amount: v.float64(),
    email: v.string(),
  },
  async handler(ctx, args) {
    const {groupId, email, userId, amount} = args;
    const group = await ctx.runQuery(api.group.getGroup, {groupId});
    if (!group) throw new Error("Could not get group");
    const interval = parseToMilliSeconds(group.interval) / 2;
    await ctx.runAction(internal.intervalReport.sendMessage, {email: email as string, groupName: group.name})
    await ctx.scheduler.runAfter(interval, internal.intervalReport.chargeMembers, {
      groupId, amount, userId, email
    })
  }
})

export const sendMessage = internalAction({
  args: {
    email: v.string(),
    groupName: v.string()
  },
  async handler(ctx, args_0) {
    const { email, groupName } = args_0;
    await SendEmails.PaymentFailed({email, groupName});    
  },
});

export const chargeMembers = internalAction({
  args:{
    groupId: v.id("groups"),
    userId: v.id("users"),
    amount: v.float64(),
    email: v.string()
  },
  async handler(ctx, args) {
    const {groupId, email, userId, amount} = args;
    const res = await ctx.runAction(api.payments.ChargeTransaction, {
      amount, email, metadata: {
        details: "pay group",
        groupId, userId,
      }
    })
    if (!res.status) {
      await ctx.runAction(internal.intervalReport.warnAndCharge, {groupId, email, userId, amount});
    } else {
      const time = new Date();
      const timestamp = time.toISOString();
      await ctx.runMutation(internal.intervalReport.addPaidCustomersToInterval, {amount, groupId, userId, timestamp})
    }
  }
})

export const getJob = internalQuery({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    return await ctx.db.get(jobId);
  }
})

export const intervalCharge = internalAction({
  args: {
    jobId: v.id("jobs"),
  },
  async handler(ctx, args) {
    const {jobId} = args;
    const job = await ctx.runQuery(internal.intervalReport.getJob, {jobId});
    const groupId = job?.groupId as Id<"groups">
    const group = await ctx.runQuery(api.group.getGroup, {groupId});
    if (!group) throw new Error("Could not get group of id " + groupId);
    const amount = group.number_of_people * group.savings_per_interval / 100;
    const members = await ctx.runQuery(api.memberships.getGroupMembers, {groupId});
    await Promise.all(members.map(async (member) => {
      const date = new Date();
      const timestamp = date.toISOString();
      await ctx.runAction(internal.intervalReport.chargeMembers, { amount, email: member.email as string, userId: member._id, groupId });
      await ctx.runMutation(internal.intervalReport.addPaidCustomersToInterval, {userId: member._id, groupId, amount, timestamp})
    }));
  },
})