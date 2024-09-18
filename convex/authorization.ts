import {query, internalMutation} from "./_generated/server";
import { v, ConvexError } from "convex/values";

export const getAuthorization = query({
    args: {
      userId: v.id("users")
    },
    async handler(ctx, args_0) {
      const {userId} = args_0;
      const authorization = await ctx.db.query("authorizations").filter(a => a.eq(a.field("userId"), userId)).first();
      if (authorization) return authorization.authorization_code;
      else throw new ConvexError("Could not get authorization");
    },
  })

  export const createAuthorization = internalMutation({
    args: {
      userId: v.id('users'),
      authorization_code: v.string(),
      bin: v.string(),
      last4: v.string(),
      exp_month: v.string(),
      exp_year: v.string(),
      card_type: v.string(),
      bank: v.string(),
      country_code: v.string(),
      brand: v.string(),
    },
    handler: async (ctx, args) => {
      const { userId, authorization_code, bin, last4, exp_month, exp_year, card_type, bank, country_code, brand } = args;
      if (await ctx.db.query("authorizations").filter(q => q.eq(q.field("authorization_code"), authorization_code)).first()) return;
      await ctx.db.insert("authorizations", {userId, authorization_code, bin, last4, exp_month, exp_year, card_type, bank, country_code, brand});
    }
  })