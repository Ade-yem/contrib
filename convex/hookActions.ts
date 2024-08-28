import { ActionCtx, httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ChargeSuccessData } from "./types/webhooks";

const invoiceCreated = async (ctx: ActionCtx, data: any) => {}
const invoicePaymentFailed = async (ctx: ActionCtx, data: any) => {}
const invoiceUpdate = async (ctx: ActionCtx, data: any) => {}
const paymentRequestPending = async (ctx: ActionCtx, data: any) => {}
const paymentRequestSuccess = async (ctx: ActionCtx, data: any) => {}
const subscriptionCreate = async (ctx: ActionCtx, data: any) => {}
const subscriptionDisable = async (ctx: ActionCtx, data: any) => {}
const subscriptionExpiringCards = async (ctx: ActionCtx, data: any) => {}
const subscriptionNotRenew = async (ctx: ActionCtx, data: any) => {}
const transferFailed = async (ctx: ActionCtx, data: any) => {}
const transferSuccess = async (ctx: ActionCtx, data: any) => {}
const transferReversed = async (ctx: ActionCtx, data: any) => {}
const chargeSuccess = async (ctx: ActionCtx, data: ChargeSuccessData) => {
    const metadata: {
        details: 'join group' | "add savings";
        group_id: string;
        user_id: string;
    } = data.metadata;
    if (metadata.details === "join group") {
        await ctx.runAction(api.actions.addMember, {group_id: metadata.group_id as Id<"groups">, user_id: metadata.user_id as Id<"users">, amount: data.amount})
    }
    await ctx.runMutation(internal.paystack.createTransaction, {new: false, reference: data.reference, status: data.status})
}


/**
 * get the results of a paystack webhook
 */
export const getResults = httpAction(async (ctx, request) => {
    const { event, data} = await request.json();
    switch (event) {
        case "invoice.create":
            await invoiceCreated(ctx, data);
            break;
        case "invoice.payment_failed":
            await invoicePaymentFailed(ctx, data);
            break;
        case "invoice.update":
            await invoiceUpdate(ctx, data);
            break;
        case "paymentrequest.pending":
            await paymentRequestPending(ctx, data);
            break;
        case "paymentrequest.success":
            await paymentRequestSuccess(ctx, data);
            break;
        case "subscription.create":
            await subscriptionCreate(ctx, data);
            break;
        case "subscription.disable":
            await subscriptionDisable(ctx, data);
            break;
        case "subscription.expiring_cards":
            await subscriptionExpiringCards(ctx, data);
            break;
        case "subscription.not_renew":
            await subscriptionNotRenew(ctx, data);
            break;
        case "transfer.failed":
            await transferFailed(ctx, data);
            break;
        case "transfer.success":
            await transferSuccess(ctx, data);
            break;
        case "transfer.reversed":
            await transferReversed(ctx, data);
            break;
        case "charge.success":
            await chargeSuccess(ctx, data);
        default:
            break;
    }
    return new Response(null, {
        status: 200,
    })
})

// {
    //     amount: 10000,
    //     email: "adejumoadeyemi32@gmail.com",
    //     metadata: { details: "join group", group_id: "k176ek00vz0z4y08m71xage9a96zn1yd", user_id: "jx76m0fbdf962z3c8bae5qjh4x6zjn9n" },
    //   }