import { httpAction, internalMutation, mutation } from "./_generated/server";
import { v } from "convex/values";

export const createPlan = internalMutation ({
    args: {
        group_id: v.id("groups"),
        subscription_plan_id: v.string(),
        start_date: v.float64(),
        status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    },
    handler(ctx, args_0) {
        const { group_id, subscription_plan_id, start_date, status } = args_0
        ctx.db.patch(group_id, {subscription_plan_id: subscription_plan_id, start_date: start_date, status: status})
    },
})


const invoiceCreated = async (data: any) => {}
const invoicePaymentFailed = async (data: any) => {}
const invoiceUpdate = async (data: any) => {}
const paymentRequestPending = async (data: any) => {}
const paymentRequestSuccess = async (data: any) => {}
const subscriptionCreate = async (data: any) => {}
const subscriptionDisable = async (data: any) => {}
const subscriptionExpiringCards = async (data: any) => {}
const subscriptionNotRenew = async (data: any) => {}
const transferFailed = async (data: any) => {}
const transferSuccess = async (data: any) => {}
const transferReversed = async (data: any) => {}
const chargeSuccess = async (data: any) => {}


/**
 * get the results of a paystack webhook
 */
export const getResults = httpAction(async (ctx, request) => {
    const param = request.body;
        const { event, data} = await request.json();
        switch (event) {
            case "invoice.create":
                invoiceCreated(data);
                break;
            case "invoice.payment_failed":
                invoicePaymentFailed(data);
                break;
            case "invoice.update":
                invoiceUpdate(data);
                break;
            case "paymentrequest.pending":
                paymentRequestPending(data);
                break;
            case "paymentrequest.success":
                paymentRequestSuccess(data);
                break;
            case "subscription.create":
                subscriptionCreate(data);
                break;
            case "subscription.disable":
                subscriptionDisable(data);
                break;
            case "subscription.expiring_cards":
                subscriptionExpiringCards(data);
                break;
            case "subscription.not_renew":
                subscriptionNotRenew(data);
                break;
            case "transfer.failed":
                transferFailed(data);
                break;
            case "transfer.success":
                transferSuccess(data);
                break;
            case "transfer.reversed":
                transferReversed(data);
                break;
            case "charge.success":
                chargeSuccess(data);
            default:
                break;
        }
    return new Response(null, {
        status: 200,
    })
})