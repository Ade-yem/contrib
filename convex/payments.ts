"use node";

import paystack from "./paystack_api";
import { internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto"
import { createPlanResponse, InitializeResponse } from "./types/subscriptions";
import { VerificationResponse } from "./types/verification";

export const createPaystackPlan = internalAction ({
    args: {
        name: v.string(),
        group_id: v.id("groups"),
        amount: v.number(),
        description: v.optional(v.string()),
        interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
        currency: v.string(),
        invoiceLimit: v.number(),
    },
    handler: async (ctx, args_0) => {
        const { name, group_id, amount, description, interval, invoiceLimit } = args_0
        const result: createPlanResponse | null = await paystack.createPlan({
            name: name,
            amount: amount,
            interval: interval,
            description: description ? description : "",
            invoiceLimit: invoiceLimit
        })
        if (result) {
            await ctx.runMutation(internal.paystack.createPlan, {group_id: group_id, subscription_plan_id: result.data.plan_code});
            return result.message;
        }
        return null;
    },
})

export const initializePaystackTransaction = action ({
    args: {
        email: v.string(),
        amount: v.number(),
        metadata: v.optional(v.object({
            details: v.string(),
            group_id: v.id("groups"),
            user_id: v.id("users"),
        }))
    },
    handler: async (ctx, args_0) => {
        const { email, amount, metadata } = args_0
        const result: InitializeResponse = await paystack.initializeTransaction({
            email,
            amount,
            metadata
        })
        if (result) {
            await ctx.runMutation(internal.paystack.createTransaction, {group_id: metadata?.group_id, user_id: metadata?.user_id, type: "deposit", new: true, access_code: result.data.access_code, status: "pending", reference: result.data.reference, details: metadata?.details})
        }
        return result;
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
        return {message: result.message, status: result.status};
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
        return res
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


// give users authorization code and customer id after initialization