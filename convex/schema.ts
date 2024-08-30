import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  groups: defineTable({
    creator_id: v.id("users"),
    name: v.string(),
    description: v.optional(v.string()),
    number_of_people: v.float64(),
    number_of_people_present: v.float64(),
    interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    subscription_plan_id: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.optional(v.string()),
    elapsed_time: v.optional(v.float64()),
    private: v.boolean()
  }),
  membership: defineTable({
    group_id: v.id("groups"),
    user_id: v.id("users"),
    collection_number: v.optional(v.float64()),
    paid_deposit: v.optional(v.float64()),
    subscription_code: v.optional(v.string())
  }),
  savings: defineTable({
    user_id: v.id("users"),
    amount: v.float64(),
    name: v.string(),
  }),
  transactions: defineTable({
    group_id: v.optional(v.id("groups")),
    user_id: v.id("users"),
    amount: v.float64(),
    type: v.optional(v.union(v.literal("transfer"), v.literal("deposit"))),
    status: v.string(),
    reference: v.string(),
    details: v.optional(v.string()),
    access_code: v.optional(v.string()),
    transfer_code: v.optional(v.string()),
  }).index("reference", ["reference"]),

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
  authorizations: defineTable({
    user_id: v.id('users'),
    authorization_code: v.string(),
    bin: v.string(),
    last4: v.string(),
    exp_month: v.string(),
    exp_year: v.string(),
    card_type: v.string(),
    bank: v.string(),
    country_code: v.string(),
    brand: v.string(),
    account_name: v.string(),
  }),
  default_payment_method: defineTable({
    user_id: v.id('users'),
    payment_method_id: v.id('payment_method')
  }),
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    isAnonymous: v.optional(v.boolean()),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),
});

export default schema;