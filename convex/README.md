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

check example below ->
-----------------------------------------------------------------------------------------------------
```tsx
import GoogleSignIn from "@/components/buttons/Google";
import { SignInWithPassword } from "@/components/forms/SigninForm";
import { Authenticated, Unauthenticated, useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@/components/buttons/BaseButton";
import { Id } from "../../convex/_generated/dataModel"
import { useState } from "react";

export default function Home() {
  const user = useQuery(api.user.getUser);
  const [group_id, setGroup_id] = useState<Id<"groups"> | "">("");
  const initializeTransaction = useAction(api.payments.initializePaystackTransaction);
  const createPlan = useAction(api.payments.createPaystackPlan);
  // const createSubscription = useAction(api.payments.createSubscription);
  const addGroup = useMutation(api.group.createGroup);
  const createInvite = useMutation(api.group.createInvite);
  const joinGroup = useMutation(api.group.createMembership);

  const createGroup = async () => {
    const group = await addGroup({
      creator_id: user?._id as Id<"users">,
      name: "Adeyemi Adejumo",
      number_of_people: 5,
      number_of_people_present: 0,
      interval: "monthly",
      savings_per_interval: 10000,
      subscription_plan_id: "",
      status: "pending",
      start_date: 0,
      elapsed_time: 0,
      private: false
    })
    if (group) {
      const plan = await createPlan({
        name: group.name,
        group_id: group._id,
        amount: group.savings_per_interval,
        description: "First paystack test",
        currency: "NGN",
        invoiceLimit: group.number_of_people,
      })
      console.log(plan);
      const invite_code = await createInvite({
        status: "pending",
        group_id: group_id
      })
      console.log(invite_code);
    }
  }
  const payMoney = async () => {
    const res = await initializeTransaction({amount: 10000, email: user?.email as string})
    if (res) {
      window.location.href = res.data.authorization_url;
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInWithPassword/>
        <GoogleSignIn/>
      </Unauthenticated>
      <Authenticated>
        <div className="card w-72 h-20">
          <div>
            { user?.name ?? user?.email ?? user?.phone ?? "Anonymous" }
          </div>
        </div>
        <div>
          <h2>Pay money</h2>
          <Button onClick={payMoney}>
            Pay money
          </Button>
        </div>
        <div>
          <h2>Create group</h2>
          <Button onClick={createGroup}>
            Create a group
          </Button>
        </div>
      </Authenticated>
    </main>
  );
}
```

-----------------------------------------------------------------------------------------------------
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
| `createGroup`                   | `creator_id: v.id("users")`, `name: v.string()`, `subscription_plan_id: v.string()`, `number_of_people: v.float64()`, `number_of_people_present: v.float64()`, `interval: v.union(v.literal("daily"), v.literal("weekly"), v.literal("monthly"))`, `savings_per_interval: v.float64()`, `status: v.union(v.literal("active"), v.literal("pending"), v.literal("closed"))`, `start_date: v.float64()`, `elapsed_time: v.float64()`, `private: v.boolean()` | Creates a new group and returns the group ID.    |
| `getAllGroups`                  | None                                                                                                           | Retrieves all groups.                            |
| `getUserMemberships`            | `user_id: v.id("users")`                                                                                       | Retrieves memberships for a specific user.       |
| `createMembership`              | `group_id: v.id("groups")`, `user_id: v.id("users")`, `collection_number: v.optional(v.float64())`              | Creates a new membership and returns the ID.     |
| `createInvite`                  | `group_id: v.id("groups")`, `status: v.string()`                                                               | Creates a new invite and returns the invite code.|
| `createPaystackPlan`            | `name: v.string()`, `group_id: v.id("groups")`, `amount: v.number()`, `description: v.string()`, `currency: v.string()`, `invoiceLimit: v.number()` | Creates a Paystack plan and returns the result.  |
| `initializePaystackTransaction` | `email: v.string()`, `amount: v.number()`                                                                      | Initializes a Paystack transaction and returns the result. |
| `createSubscription`            | `email: v.string()`, `plan: v.string()`                                                                        | Creates a subscription and returns the result.   |
| `verifyTransaction`             | `reference: v.string()`                                                                                        | Verifies a transaction and returns the result.   |
| `getUser`                       | None                                                                                                           | Retrieves the current user based on authentication. |
| `getInviteLink`                 | `group_id: v.id("groups")`                                                                                     | Retrieves the invite link for a specific group.  |
| `editProfile`                   | `image: v.optional(v.string())`, `name: v.optional(v.string())`, `phone: v.optional(v.string())`, `user_id: v.id("users")` | Edits the user profile with optional fields.     |
