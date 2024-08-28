"use client";
import GoogleSignIn from "@/components/buttons/Google";
import { SignInWithPassword } from "@/components/forms/SigninForm";
import {
  Authenticated,
  Unauthenticated,
  useQuery,
  useAction,
} from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@/components/buttons/BaseButton";
import { Id } from "../../convex/_generated/dataModel";
import { useAuthActions } from "@convex-dev/auth/react";


export default function Home() {
  const user = useQuery(api.user.getUser);
  const initializeTransaction = useAction(api.payments.initializePaystackTransaction);
  const addGroup = useAction(api.actions.addGroupAction);
  const {signOut} = useAuthActions();

  const createGroup = async () => {
    await addGroup({
      creator_id: user?._id as Id<"users">,
      name: "Adeyemi Adejumo",
      number_of_people: 5,
      interval: "monthly",
      savings_per_interval: 10000,
      private: false,
      description: "test group"
    })
  };
  const payMoney = async () => {
    const res = await initializeTransaction({
      amount: 10000,
      email: user?.email as string,
    });
    if (res) {
      window.location.href = res.data.authorization_url;
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Unauthenticated>
        <SignInWithPassword />
        <GoogleSignIn />
      </Unauthenticated>
      <Authenticated>
        <div className="card w-72 h-20">
          <div>{user?.first_name ?? user?.email ?? user?.phone ?? "Anonymous"}</div>
        </div>
        <div>
          <h2>Pay money</h2>
          <Button onClick={payMoney}>Pay money</Button>
        </div>
        <div>
          <h2>Create group</h2>
          <Button onClick={createGroup}>Create a group</Button>
        </div>
        <div></div>
        <div></div>
        <span className="btn-danger" onClick={signOut}>Logout</span>
      </Authenticated>
    </main>
  );
}
