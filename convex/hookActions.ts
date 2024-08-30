import { ActionCtx, httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ChargeSuccessData } from "./types/webhooks";


const paymentRequestPending = async (ctx: ActionCtx, data: any) => {}
const paymentRequestSuccess = async (ctx: ActionCtx, data: any) => {}
const subscriptionDisable = async (ctx: ActionCtx, data: any) => {}
const subscriptionExpiringCards = async (ctx: ActionCtx, data: any) => {}
const subscriptionNotRenew = async (ctx: ActionCtx, data: any) => {}

const invoiceCreated = async (ctx: ActionCtx, data: any) => {
  const subscription_code = data.subscription.subscription_code;
  const amount = data.subscription.amount;
  const reference = data.transaction.reference;
  const member = await ctx.runQuery(internal.group.getMembershipWithSubscriptionCode, {subscription_code});
  const user_id = member?.user_id as Id<"users">
  await ctx.runMutation(internal.paystack.createTransaction, {type: "deposit", group_id: member?.group_id, details: "pay group", status: "pending", amount, reference, user_id})
};
const invoiceUpdate = async (ctx: ActionCtx, data: any) => {
  const reference = data.transaction.reference;
  const status = data.transaction.status;
  await ctx.runMutation(internal.paystack.updateTransaction, {status, reference})
};
const invoicePaymentFailed = async (ctx: ActionCtx, data: any) => {
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: "failed"})
};
const subscriptionCreate = async (ctx: ActionCtx, data: any) => {
    const email = data.customer.email;
    const subscription_code = data.subscription_code;
    const plan_code = data.plan.plan_code;
    await ctx.runMutation(internal.group.addSubscriptionCodeToMembership, {subscription_code, email, plan_code})
};
const transferFailed = async (ctx: ActionCtx, data: any) => {
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status});
};
const transferSuccess = async (ctx: ActionCtx, data: any) => {
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status });
};
const transferReversed = async (ctx: ActionCtx, data: any) => {
  const transaction = await ctx.runQuery(internal.paystack.getTransaction, {reference: data.reference});
  await ctx.runAction(internal.transfers.initiateTransfer, {
    group_id: transaction.group_id as Id<"groups">,
    reference: data.reference,
    user_id: transaction.user_id,
    amount: data.amount,
    reason: data.reason,
    recipient: data.recipient.recipient_code,
    retry: true,
    details: data.reason
  })
};
const chargeSuccess = async (ctx: ActionCtx, data: ChargeSuccessData) => {
    const metadata: {
        details: 'join group' | "add savings";
        group_id: string;
        user_id: string;
    } = data.metadata;
    if (metadata.details === "join group") {
        await ctx.runAction(api.actions.addMember, {group_id: metadata.group_id as Id<"groups">, user_id: metadata.user_id as Id<"users">, amount: data.amount})
    }
    await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status})
};

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