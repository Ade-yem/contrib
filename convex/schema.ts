import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  groups: defineTable({
    creator_id: v.id("users"),
    name: v.string(),
    number_of_people: v.float64(),
    number_of_people_present: v.float64(),
    interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    subscription_plan_id: v.string(),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.float64(),
    elapsed_time: v.float64(),
    private: v.boolean()
  }),
  membership: defineTable({
    group_id: v.id("groups"),
    user_id: v.id("users"),
    collection_number: v.optional(v.float64()),
  }),
  savings: defineTable({
    user_id: v.id("users"),
    amount: v.float64(),
    name: v.string(),
  }),
  transactions: defineTable({
    group_id: v.id("groups"),
    user_id: v.id("users"),
    amount: v.float64(),
    type: v.union(v.literal("transfer"), v.literal("deposit")),
    status: v.string(),
    reference: v.string()
  }),
  invites: defineTable({
    group_id: v.id("groups"),
    status: v.string(),
    code: v.optional(v.string()),
  }),
  interval: defineTable({
    group_id: v.id("groups"),
    month: v.float64(),
    members_payment_status: v.array(v.object({
      user_id: v.id("users"),
      status: v.union(v.literal("pending"), v.literal("paid")),
      amount: v.float64(),
    }))
  }),
  payment_methods: defineTable({
    user_id: v.id('users'),
    type: v.union(v.literal("ghpss"), v.literal("nuban")),
    account_name: v.string(),
    recipient_code: v.string(),
    authorization_code: v.string(),
    currency: v.union(v.literal("NGN"), v.literal("GHS")),
    bank_name: v.string(),
    account_number: v.string(),
  }),
});

export default schema;