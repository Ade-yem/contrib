"use node";

import paystack from "./paystack_api";
import { internal, api } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto"
import { createPlanResponse, InitializeResponse, ChargeAttemptResponse } from "./types/subscriptions";
import { VerificationResponse } from "./types/verification";

export const createPaystackPlan = internalAction ({
    args: {
        name: v.string(),
        groupId: v.id("groups"),
        amount: v.number(),
        description: v.optional(v.string()),
        interval: v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
        currency: v.string(),
        invoiceLimit: v.number(),
    },
    handler: async (ctx, args_0) => {
        const { name, groupId, amount, description, interval, invoiceLimit } = args_0
        const result: createPlanResponse | null = await paystack.createPlan({
            name: name,
            amount: amount * 100,
            interval: interval,
            description: description ? description : "",
            invoiceLimit: invoiceLimit
        })
        if (result) {
            await ctx.runMutation(internal.paystack.createPlan, {groupId: groupId, subscription_plan_id: result.data.plan_code});
            return result.message;
        }
        return null;
    },
})

export const initializePaystackTransaction = action ({
    args: {
        email: v.string(),
        amount: v.number(),
        metadata: v.object({
            details: v.union(v.literal("join group"), v.literal("add savings"), v.literal("pay group"), v.literal("create savings"), v.literal("add card")),
            groupId: v.optional(v.id("groups")),
            savingsId: v.optional(v.id("savings")),
            userId: v.id("users"),
            name: v.optional(v.string()),
            reason: v.optional(v.string()),
            savingsInterval: v.optional(v.string()),
            interval: v.optional(v.string()),
            amountTarget: v.optional(v.number())
        })
    },
    handler: async (ctx, args_0) => {
        const { email, amount } = args_0
        const amt =amount * 100;
        const metadata = {
            details: args_0.metadata.details,
            groupId: args_0.metadata.groupId ? args_0.metadata.groupId : "",
            savingsId: args_0.metadata.savingsId ? args_0.metadata.savingsId : "",
            name: args_0.metadata.name ? args_0.metadata.name : "",
            reason: args_0.metadata.reason ? args_0.metadata.reason : "",
            userId: args_0.metadata.userId,
            interval: args_0.metadata.interval ? args_0.metadata.interval : "",
            amountTarget: args_0.metadata.amountTarget ? args_0.metadata.amountTarget : 0
        }
        const result: InitializeResponse = await paystack.initializeTransaction({
            email,
            amount: amt,
            metadata
        })
        if (result.status) {
            await ctx.runMutation(internal.paystack.createTransaction, {amount: amt, savingsId: args_0.metadata.savingsId, groupId: args_0.metadata.groupId, userId: metadata.userId, type: "deposit", access_code: result.data.access_code, status: "pending", reference: result.data.reference, details: metadata.details})
        }
        return result;
    },
})


export const ChargeTransaction = action ({
  args: {
    email: v.string(),
    amount: v.number(),
    metadata: v.object({
        details: v.union(v.literal("join group"), v.literal("add savings"), v.literal("pay group"), v.literal("create savings")),
        groupId: v.optional(v.id("groups")),
        savingsId: v.optional(v.id("savings")), // for savings
        userId: v.id("users"),
        name: v.optional(v.string()), // for savings
        reason: v.optional(v.string()), // for savings
        interval: v.optional(v.string()), // for savings
        amountTarget: v.optional(v.number()) // for savings
    })
  },
  handler: async (ctx, args_0) => {
    const { email, amount } = args_0;
    const amt = amount * 100;
    const metadata = {
        details: args_0.metadata.details,
        groupId: args_0.metadata.groupId ? args_0.metadata.groupId : "",
        savingsId: args_0.metadata.savingsId ? args_0.metadata.savingsId : "",
        userId: args_0.metadata.userId,
        name: args_0.metadata.name ? args_0.metadata.name : "",
        reason: args_0.metadata.reason ? args_0.metadata.reason : "",
        interval: args_0.metadata.interval ? args_0.metadata.interval : "",
        amountTarget: args_0.metadata.amountTarget ? args_0.metadata.amountTarget : 0
    }
    const authorization_code = await ctx.runQuery(api.authorization.getAuthorization, {userId: metadata.userId})
    const result: ChargeAttemptResponse = await paystack.chargeMoney({
        authorization_code,
        email,
        amount: amt,
        metadata
    })
    if (result.data.status === "success" && result.status) {
        await ctx.runMutation(internal.paystack.createTransaction, {amount: amt, savingsId: args_0.metadata.savingsId, groupId: args_0.metadata.groupId, userId: metadata.userId, type: "deposit", status: "pending", reference: result.data.reference, details: metadata.details});
    }
    return {status: result.status, reference: result.data.reference};
    },
})

export const createSubscription = internalAction({
  args: {
    email: v.string(),
    plan: v.string(),
    start_date: v.string(),
  },
  handler: async (_, args) => {
    const {email, plan, start_date} = args;
    const result = await paystack.createSubscription({
        customer: email,
        plan: plan,
        start_date: start_date,
    })
    return {
        message: result.message,
        status: result.status === false && result.code == "duplicate_subscription" ? true : result.status,
    }
  }
})

export const verifyTransaction = action({
  args: {
    reference: v.string(),
  },
  handler: async (_, args) => {
    const { reference } = args;
    const res: VerificationResponse = await paystack.verifyTransaction({
        reference: reference
    })
    return res;
  }
})

export const confirmPaystackWebhook = action ({
  args: {
    body: v.any(),
  },
  handler: async (ctx, args_0) => {
    const { body } = args_0
    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET as string).update(JSON.stringify(body)).digest('hex');
    return hash;
  },
})
