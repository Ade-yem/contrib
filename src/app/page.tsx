"use client";

import GoogleSignIn from "@/components/buttons/Google";
import { SignInWithPassword } from "@/components/forms/SigninForm";
import { Authenticated, Unauthenticated, useQuery, useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Button from "@/components/buttons/BaseButton";

export default function Home() {
  const user = useQuery(api.user.getUser);
  const initializeTransaction = useAction(api.payments.initializePaystackTransaction);
  const createPlan = useAction(api.payments.createPaystackPlan);
  const createSubscription = useAction(api.payments.createSubscription);
  const joinGroup = useMutation(api.group.createGroup)

  const createGroup = async () => {

  }
  const payMoney = async () => {

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
