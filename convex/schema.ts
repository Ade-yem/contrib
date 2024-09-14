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
    interval: v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly")),
    savings_per_interval: v.float64(),
    subscription_plan_id: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed")),
    start_date: v.optional(v.string()),
    elapsedTime: v.float64(),
    private: v.boolean(),
    imageId: v.optional(v.id("_storage")),
    image: v.optional(v.string()),
    amount: v.optional(v.float64())
  }),
  membership: defineTable({
    groupId: v.id("groups"),
    userId: v.id("users"),
    collection_number: v.optional(v.float64()),
    paid_deposit: v.optional(v.float64()),
    subscription_code: v.optional(v.string())
  }),
  savings: defineTable({
    userId: v.id("users"),
    amount: v.float64(),
    amountTarget: v.optional(v.float64()),
    reason: v.string(),
    name: v.string(),
    interval: v.optional(v.union(v.literal("hourly"), v.literal("daily"), v.literal("weekly"), v.literal("monthly"))),
  }),
  transactions: defineTable({
    groupId: v.optional(v.id("groups")),
    savingsId: v.optional(v.id("savings")),
    userId: v.id("users"),
    amount: v.float64(),
    type: v.optional(v.union(v.literal("transfer"), v.literal("deposit"))),
    status: v.string(),
    reference: v.string(),
    details: v.optional(v.string()),
    access_code: v.optional(v.string()),
    transfer_code: v.optional(v.string()),
  }).index("reference", ["reference"]),

  invites: defineTable({
    groupId: v.id("groups"),
    status: v.string(),
    code: v.optional(v.string()),
  }),
  interval: defineTable({
    groupId: v.id("groups"),
    receiver_id: v.id("users"),
    month: v.float64(),
    amount: v.optional(v.float64()),
    details: v.optional(v.union(v.literal("intervalStart"), v.literal("midInterval"))),
    members_payment_status: v.optional(v.array(v.object({
      userId: v.id("users"),
      status: v.union(v.literal("pending"), v.literal("paid")),
      amount: v.float64(),
    }))),
    start: v.optional(v.float64()),
    end: v.optional(v.float64()),
  }),
  payment_methods: defineTable({
    userId: v.id('users'),
    type: v.union(v.literal("ghpss"), v.literal("nuban"), v.literal("authorization")),
    account_name: v.string(),
    recipient_code: v.string(),
    authorization_code: v.string(),
    currency: v.union(v.literal("NGN"), v.literal("GHS")),
    bank_name: v.string(),
    account_number: v.string(),
  }),
  authorizations: defineTable({
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
  }),
  default_payment_method: defineTable({
    userId: v.id('users'),
    paymentMethodId: v.id('payment_methods')
  }),
  users: defineTable({
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.float64()),
    image: v.optional(v.string()),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"))),
    isAnonymous: v.optional(v.boolean()),
    first_name: v.optional(v.string()),
    last_name: v.optional(v.string()),
    phone: v.optional(v.string()),
    dob: v.optional(v.string()),
    bvn: v.optional(v.string()),
    nin: v.optional(v.string()),
    homeAddress: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.float64()),
    nationality: v.optional(v.string()),
    kycVerified: v.optional(v.boolean()),
    imageId: v.optional(v.id("_storage"))
  })
    .index("email", ["email"])
    .index("phone", ["phone"]),

  crons: defineTable({
    name: v.optional(v.string()), // optional cron name
    functionName: v.string(), // fully qualified function name
    args: v.any(), // args as an object
    schedule: v.union(
      v.object({
        kind: v.literal("interval"),
        ms: v.float64(), // milliseconds
      }),
      v.object({
        kind: v.literal("cron"),
        cronspec: v.string(), // "* * * * *"
      })
    ),
    count: v.float64(),
    limit: v.float64(),
    schedulerJobId: v.optional(v.id("_scheduled_functions")),
    executionJobId: v.optional(v.id("_scheduled_functions")),
  }).index("name", ["name"]),

  jobs: defineTable({
    groupId: v.id("groups"),
    name: v.optional(v.string()),
    details: v.optional(v.union(v.literal("intervalStart"), v.literal("midInterval"))),
    cronId: v.optional(v.id("crons")),
    
  }).index("groupId", ["groupId"]),

  chats: defineTable({
    groupId: v.id("groups"),
    userId: v.id("users"),
    message: v.string(),
    image: v.optional(v.string()),
    imageId: v.optional(v.id("_storage")),
    time: v.float64(),
  }).index("by_time", ["time"]),
});

export default schema;