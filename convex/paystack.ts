import { httpAction, internalMutation } from "./_generated/server";
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

export const createPaymentMethod = internalMutation({
    args: {
        user_id: v.id('users'),
        type: v.union(v.literal("ghpss"), v.literal("nuban")),
        account_name: v.string(),
        recipient_code: v.string(),
        authorization_code: v.string(),
        currency: v.union(v.literal("NGN"), v.literal("GHS")),
        bank_name: v.string(),
        account_number: v.string(),
    },
    async handler(ctx, args_0) {
        const id = await ctx.db.insert("payment_methods", {
            type: args_0.type, user_id: args_0.user_id, account_name: args_0.account_name,
            account_number: args_0.account_number, recipient_code: args_0.recipient_code,
            authorization_code: args_0.authorization_code,
            currency: args_0.currency, bank_name: args_0.bank_name
        });
        return id;
    },
})

export const createTransaction = internalMutation({
  args: {
    group_id: v.optional(v.id("groups")),
    user_id: v.optional(v.id("users")),
    amount: v.optional(v.float64()),
    type: v.optional(v.union(v.literal("transfer"), v.literal("deposit"))),
    status: v.string(),
    reference: v.string(),
    new: v.boolean(),
  },
  async handler(ctx, args_0) {
    if (args_0.new && args_0.group_id && args_0.user_id && args_0.amount) {
      await ctx.db.insert("transactions", {
        type: "transfer", status: args_0.status, group_id: args_0.group_id, user_id: args_0.user_id, amount: args_0.amount, reference: args_0.reference
      })
    } else {
      const q = await ctx.db.query("transactions").filter(q => q.eq(q.field("reference"), args_0.reference)).collect();
      await ctx.db.patch(q[0]._id, {status: args_0.status});
    }
    
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