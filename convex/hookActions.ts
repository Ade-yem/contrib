import { ActionCtx, httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ChargeSuccessData, Authorization } from "./types/webhooks";


const paymentRequestPending = async (ctx: ActionCtx, data: any) => {}
const paymentRequestSuccess = async (ctx: ActionCtx, data: any) => {}
const subscriptionDisable = async (ctx: ActionCtx, data: any) => {}
const subscriptionExpiringCards = async (ctx: ActionCtx, data: any) => {}
const subscriptionNotRenew = async (ctx: ActionCtx, data: any) => {}

/**
 * handles `invoice.create` event
 * @param ctx Convex action
 * @param data payload data
 */
const invoiceCreated = async (ctx: ActionCtx, data: any) => {
  const subscription_code = data.subscription.subscription_code;
  const amount = data.subscription.amount;
  const reference = data.transaction.reference;
  const member = await ctx.runQuery(internal.memberships.getMembershipWithSubscriptionCode, {subscription_code});
  const userId = member?.userId as Id<"users">
  await ctx.runMutation(internal.paystack.createTransaction, {type: "deposit", groupId: member?.groupId, details: "pay group", status: "pending", amount, reference, userId})
};

/**
 * handles `invoice.update` event
 * @param ctx Convex action
 * @param data payload data
 */
const invoiceUpdate = async (ctx: ActionCtx, data: any) => {
  const reference = data.transaction.reference;
  const status = data.transaction.status;
  await ctx.runMutation(internal.paystack.updateTransaction, {status, reference})
};

/**
 * handles `invoice.payment_failed` event
 * @param ctx Convex action
 * @param data payload data
 */
const invoicePaymentFailed = async (ctx: ActionCtx, data: any) => {
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: "failed"})
};

/**
 * handles `subscription.create` event
 * @param ctx Convex action
 * @param data payload data
 */
const subscriptionCreate = async (ctx: ActionCtx, data: any) => {
    const email = data.customer.email;
    const subscription_code = data.subscription_code;
    const plan_code = data.plan.plan_code;
    await ctx.runMutation(internal.memberships.addSubscriptionCodeToMembership, {subscription_code, email, plan_code})
};

/**
 * handles `transfer.failed` event
 * @param ctx Convex action
 * @param data payload data
 */
const transferFailed = async (ctx: ActionCtx, data: any) => {
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status});
};

/**
 * handles `transfer.success` event
 * @param ctx Convex action
 * @param data payload data
 */
const transferSuccess = async (ctx: ActionCtx, data: any) => {
  let details: 'savings payment' | "interval pay" | "refund method fee" | "cashout";
  const {reason, reference, amount} = data;
  if (reason === "cashout") {
    await ctx.runMutation(internal.savings.updateSavings, {reference, amount})
  };
  await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status });
};

/**
 * handles `transfer.reversed` event
 * @param ctx Convex action
 * @param data payload data
 */
const transferReversed = async (ctx: ActionCtx, data: any) => {
  const transaction = await ctx.runQuery(internal.paystack.getTransaction, {reference: data.reference});
  await ctx.runAction(internal.transfers.initiateTransfer, {
    groupId: transaction.groupId as Id<"groups">,
    reference: data.reference,
    userId: transaction.userId,
    amount: data.amount,
    reason: data.reason,
    recipient: data.recipient.recipient_code,
    retry: true,
    details: data.reason
  })
};

/**
 * handles `charge.success` event
 */
const chargeSuccess = async (ctx: ActionCtx, data: ChargeSuccessData) => {
    const metadata: {
      details: 'join group' | "add savings" | "pay group" | "create savings" | "add card";
      groupId: string;
      savingsId: string;
      userId: string;
      name: string;
      reason: string;
    } = data.metadata;
    const auth: Authorization = data.authorization;
    if (metadata.details === "join group") {
      await ctx.runAction(api.actions.addMember, {groupId: metadata.groupId as Id<"groups">, userId: metadata.userId as Id<"users">, amount: data.amount});
      // await ctx.runMutation(internal.authorization.createAuthorization, {userId: metadata.userId as Id<"users">, authorization_code: auth.authorization_code, bin: auth.bin, last4: auth.last4, card_type: auth.card_type, exp_month: auth.exp_month, exp_year: auth.exp_year, bank: auth.bank, brand: auth.brand, country_code: auth.country_code})
    } else if (metadata.details === "add savings") {
      await ctx.runMutation(internal.savings.addSavings, {savingsId: metadata.savingsId as Id<"savings">, amount: data.amount})
    } else if (metadata.details === "create savings") {
      await ctx.runMutation(api.savings.createSavings, {name: metadata.name, userId: metadata.userId as Id<"users">, amount: data.amount, reason: metadata.reason })
    } else if (metadata.details === "add card") {
      await ctx.runMutation(internal.authorization.createAuthorization, {userId: metadata.userId as Id<"users">, authorization_code: auth.authorization_code, bin: auth.bin, last4: auth.last4, card_type: auth.card_type, exp_month: auth.exp_month, exp_year: auth.exp_year, bank: auth.bank, brand: auth.brand, country_code: auth.country_code});
      await ctx.runMutation(internal.savings.addToFirstSavings, {userId: metadata.userId as Id<"users">, amount: data.amount});
    }
    await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status})
};

/**
 * @function getResults get the results of a paystack webhook
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
    //     metadata: { details: "join group", groupId: "k176ek00vz0z4y08m71xage9a96zn1yd", userId: "jx76m0fbdf962z3c8bae5qjh4x6zjn9n" },
    //   }