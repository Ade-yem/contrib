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
    savings_per_momth: v.float64(),
    subscription_plan_id: v.string(),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.float64(),
    elapsed_time: v.float64(),
  }),
  membership: defineTable({
    group_id: v.id("groups"),
    user_id: v.id("users"),
    collection_number: v.float64(),
  }),
  transactions: defineTable({
    group_id: v.id("groups"),
    user_id: v.id("users"),
    amount: v.float64(),
    type: v.union(v.literal("transfer"), v.literal("deposit")),
  }),
  invites: defineTable({
    group_id: v.id("groups"),
    status: v.string(),
    code: v.optional(v.string()),
  }),
  month: defineTable({
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
    type: v.union(v.literal("bank transfer"), v.literal("credit card")), // to add more to it
    account_name: v.string(),
    is_default: v.boolean(),
  })

});

export default schema;