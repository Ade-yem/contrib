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
    const group_id = await addGroup({
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
    if (group_id) {
      const plan = await createPlan({
        name: "First test",
        group_id: group_id as Id<"groups">,
        amount: 10000,
        description: "First paystack test",
        currency: "NGN",
        invoiceLimit: 5,
        email: user?.email as string
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
        <div></div>
        <div></div>
        <div></div>
      </Authenticated>
    </main>
  );
}
