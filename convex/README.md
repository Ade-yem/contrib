# Welcome to your Convex functions directory!

Write your Convex functions here.
See https://docs.convex.dev/functions for more.

A query function that takes two arguments looks like:

```ts
// functions.js
import { query } from "./_generated/server";
import { v } from "convex/values";

export const myQueryFunction = query({
  // Validators for arguments.
  args: {
    first: v.number(),
    second: v.string(),
  },

  // Function implementation.
  handler: async (ctx, args) => {
    // Read the database as many times as you need here.
    // See https://docs.convex.dev/database/reading-data.
    const documents = await ctx.db.query("tablename").collect();

    // Arguments passed from the client are properties of the args object.
    console.log(args.first, args.second);

    // Write arbitrary JavaScript here: filter, aggregate, build derived data,
    // remove non-public properties, or create new objects.
    return documents;
  },
});
```

Using this query function in a React component looks like:

```ts
const data = useQuery(api.functions.myQueryFunction, {
  first: 10,
  second: "hello",
});
```

A mutation function looks like:

```ts
// functions.js
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const myMutationFunction = mutation({
  // Validators for arguments.
  args: {
    first: v.string(),
    second: v.string(),
  },

  // Function implementation.
  handler: async (ctx, args) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.
    const message = { body: args.first, author: args.second };
    const id = await ctx.db.insert("messages", message);

    // Optionally, return a value from your mutation.
    return await ctx.db.get(id);
  },
});
```

Using this mutation function in a React component looks like:

```ts
const mutation = useMutation(api.functions.myMutationFunction);
function handleButtonPress() {
  // fire and forget, the most common way to use mutations
  mutation({ first: "Hello!", second: "me" });
  // OR
  // use the result once the mutation has completed
  mutation({ first: "Hello!", second: "me" }).then((result) =>
    console.log(result),
  );
}
```

Use the Convex CLI to push your functions to a deployment. See everything
the Convex CLI can do by running `npx convex -h` in your project root
directory. To learn more, launch the docs with `npx convex docs`.


## MY ENDPOINTS

### check [./schema.ts] for the schemas

Basics
There are three types of actions you can take
1. actions - query third party endponits or other urls --> runAction()
2. query - get something --> runQuery()
3. mutation - when you want something to change or create it --> runMutation()

-------
the `Authenticated` wrapper is for when you only want a component to be visible when the user is authenticated

The endpoints:
#### Queries endpoints
- `api.user.getUser` -> get the authenticated user details\
- `api.user.getInviteLink` -> get invite link of a group
- `api.group.getAllGroups` -> get all groups
- `api.group.getUserMemberships` -> get all user memberships

#### Mutations
- `api.user.editProfile` -> edit user profile
- `api.group.createMembership` -> get all user memberships
- `api.group.createInvite` -> creates invite link

#### Actions
- `api.transfers.createRecipient` -> create payment method
- `api.payments.createPaystackPlan` -> will create a subscription plan on paystack. should be run after the group has been created like in the example
- `api.payments.initializePaystackTransaction` -> for initializing payment. I used redirect for verifying payments but if you want to use paystack pop, we can work around it.
- `api.payments.verifyTransaction` -> verifies transaction after payment. Check the implementation on the payment_successful page


| Function Name                   | Arguments                                                                                                      | Description                                      |
|---------------------------------|----------------------------------------------------------------------------------------------------------------|--------------------------------------------------|
| `createGroup`                   | `creator_id: v.id("users")`, `name: v.string()`, `subscription_plan_id: v.string()`, `number_of_people: v.float64()`, `number_of_people_present: v.float64()`, `interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly"))`, `savings_per_interval: v.float64()`, `status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed"))`, `start_date: v.float64()`, `elapsedTime: v.float64()`, `private: v.boolean()` | Creates a new group and returns the group ID.    |
| `getAllGroups`                  | None                                                                                                           | Retrieves all groups.                            |
| `getUserMemberships`            | `userId: v.id("users")`                                                                                       | Retrieves memberships for a specific user.       |
| `createMembership`              | `groupId: v.id("groups")`, `userId: v.id("users")`, `collection_number: v.optional(v.float64())`              | Creates a new membership and returns the ID.     |
| `createInvite`                  | `groupId: v.id("groups")`, `status: v.string()`                                                               | Creates a new invite and returns the invite code.|
| `createPaystackPlan`            | `name: v.string()`, `groupId: v.id("groups")`, `amount: v.number()`, `description: v.string()`, `currency: v.string()`, `invoiceLimit: v.number()` | Creates a Paystack plan and returns the result.  |
| `initializePaystackTransaction` | `email: v.string()`, `amount: v.number()`                                                                      | Initializes a Paystack transaction and returns the result. |
| `createSubscription`            | `email: v.string()`, `plan: v.string()`                                                                        | Creates a subscription and returns the result.   |
| `verifyTransaction`             | `reference: v.string()`                                                                                        | Verifies a transaction and returns the result.   |
| `getUser`                       | None                                                                                                           | Retrieves the current user based on authentication. |
| `getInviteLink`                 | `groupId: v.id("groups")`                                                                                     | Retrieves the invite link for a specific group.  |
| `editProfile`                   | `image: v.optional(v.string())`, `name: v.optional(v.string())`, `phone: v.optional(v.string())`, `userId: v.id("users")` | Edits the user profile with optional fields.     |
