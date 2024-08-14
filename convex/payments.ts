"use node";

import Paystack from "@paystack/paystack-sdk";
import { action } from "./_generated/server";
import { v } from "convex/values";
import crypto from "crypto"
import { createPlanResponse, InitializeResponse } from "./types";

const paystack = new Paystack(process.env.PAYSTACK_SECRET);

export const createPaystackPlan = action ({
    args: {
        name: v.string(),
        amount: v.number(),
        description: v.string(),
        currency: v.string(),
        invoiceLimit: v.number(),
    },
    handler: async (ctx, args_0) => {
        const { name, amount, description, invoiceLimit } = args_0
        const result: createPlanResponse = await paystack.plan.create({
            name,
            amount: amount,
            interval: "monthly",
            description: description,
            invoiceLimit
        })
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
        const result: InitializeResponse = await paystack.transaction.initialize({
            email,
            amount,
        })
        return result;
    },
})

export const createSubscription = action({
    args: {
        email: v.string(),
        plan: v.string(),
    },
    handler: async (_, args) => {
        const {email, plan} = args;
        const result = await paystack.subscription.create({
            customer: email,
            plan: plan
        })
        return result;
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