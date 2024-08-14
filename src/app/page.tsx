"use client";

import GoogleSignIn from "@/components/buttons/Google";
import { SignInWithPassword } from "@/components/forms/SigninForm";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignInWithPassword/>
      <GoogleSignIn/>
      
    </main>
  );
}
