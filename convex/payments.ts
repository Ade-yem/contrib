"use node";

// import Paystack from "@paystack/paystack-sdk";
import paystack from "./paystack_api";
import { internal } from "./_generated/api";
import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto"
import { createPlanResponse, InitializeResponse } from "./types/subscriptions";
import { VerificationResponse } from "./types/verification";

// const paystack = new Paystack(process.env.PAYSTACK_SECRET);
export const createPaystackPlan = action ({
    args: {
        name: v.string(),
        group_id: v.id("groups"),
        amount: v.number(),
        description: v.string(),
        currency: v.string(),
        invoiceLimit: v.number(),
    },
    handler: async (ctx, args_0) => {
        const { name, group_id, amount, description, invoiceLimit } = args_0
        const result: createPlanResponse | null = await paystack.createPlan({
            name: name,
            amount: amount,
            interval: "monthly",
            description: description,
            invoiceLimit: invoiceLimit,
        })
        if (result) {
            ctx.runMutation(internal.paystack.createPlan, {group_id: group_id, subscription_plan_id: result.data.plan_code, start_date: 0, status: "pending"});
        }
        return result;
    },
})

export const initializePaystackTransaction = action ({
    args: {
        email: v.string(),
        amount: v.number(),
    },
    handler: async (ctx, args_0) => {
        const { email, amount } = args_0
        const result: InitializeResponse = await paystack.initializeTransaction({
            email,
            amount,
        })
        return result;
    },
})

export const createSubscription = internalAction({
    args: {
        email: v.string(),
        plan: v.string(),
    },
    handler: async (_, args) => {
        const {email, plan} = args;
        const result = await paystack.createSubscription({
            customer: email,
            plan: plan
        })
        return result;
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