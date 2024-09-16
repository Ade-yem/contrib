import { ActionCtx, httpAction } from "./_generated/server";
import { api, internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { ChargeSuccessData, Authorization } from "./types/webhooks";

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
      interval: string;
      amountTarget: number;
    } = data.metadata;
    const auth: Authorization = data.authorization;
    if (metadata.details === "join group") {
      await ctx.runAction(api.actions.addMember, {groupId: metadata.groupId as Id<"groups">, userId: metadata.userId as Id<"users">, amount: data.amount});
      // await ctx.runMutation(internal.authorization.createAuthorization, {userId: metadata.userId as Id<"users">, authorization_code: auth.authorization_code, bin: auth.bin, last4: auth.last4, card_type: auth.card_type, exp_month: auth.exp_month, exp_year: auth.exp_year, bank: auth.bank, brand: auth.brand, country_code: auth.country_code})
    } else if (metadata.details === "add savings") {
      await ctx.runMutation(internal.savings.addSavings, {savingsId: metadata.savingsId as Id<"savings">, amount: data.amount})
    } else if (metadata.details === "create savings") {
      const interval = metadata.interval.length > 0 ? metadata.interval as "hourly" | "daily" | "weekly" | "monthly" : undefined;
      await ctx.runMutation(api.savings.createSavings, {name: metadata.name, userId: metadata.userId as Id<"users">, amount: data.amount, reason: metadata.reason, amountTarget: metadata.amountTarget, interval })
    } else if (metadata.details === "add card") {
      await ctx.runMutation(internal.authorization.createAuthorization, {userId: metadata.userId as Id<"users">, authorization_code: auth.authorization_code, bin: auth.bin, last4: auth.last4, card_type: auth.card_type, exp_month: auth.exp_month, exp_year: auth.exp_year, bank: auth.bank, brand: auth.brand, country_code: auth.country_code});
      await ctx.runMutation(internal.savings.addToFirstSavings, {userId: metadata.userId as Id<"users">, amount: data.amount});
    } else if (metadata.details === "pay group") {
      await ctx.runMutation(internal.intervalReport.updatePaymentStatus, {userId: metadata.userId as Id<"users">, groupId: metadata.groupId as Id<"groups">, timestamp: data.paid_at as string, amount: data.amount})
    }
    await ctx.runMutation(internal.paystack.updateTransaction, { reference: data.reference, status: data.status})
};

/**
 * @function getResults get the results of a paystack webhook
 */
export const getResults = httpAction(async (ctx, request) => {
  const { event, data} = await request.json();
  switch (event) {
    case "charge.success":
      await chargeSuccess(ctx, data);
    default:
      break;
  }
  return new Response(null, {
      status: 200,
  })
})
