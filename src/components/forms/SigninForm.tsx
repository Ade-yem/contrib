"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";

export function SignInWithPassword({
  provider,
  handleSent,
  handlePasswordReset,
}: {
  provider?: string;
  handleSent?: (email: string) => void;
  handlePasswordReset?: () => void;
}) {
  const {
    setShowModal,
  }: {
    setShowModal: (value: ModalTypes) => void;
  } = useContext(LayoutContext);
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const handleShowLogin = () => {
    setShowModal("login");
  };
  return (
    <>
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitting(true);
          const formData = new FormData(event.currentTarget);
          signIn(provider ?? "password", formData)
            .then(() => {
              handleSent?.(formData.get("email") as string);
            })
            .catch((error) => {
              console.error(error);
              const title =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
              toast.error(title, { id: "auth" });
              setSubmitting(false);
            });
        }}
      >
        <label htmlFor="email">Email</label>
        <input name="email" id="email" className="mb-4" autoComplete="email" />
        <div className="flex items-center justify-between">
          <label htmlFor="password">Password</label>
          {handlePasswordReset && flow === "signIn" ? (
            <button
              className="p-0 h-auto"
              type="button"
              onClick={handlePasswordReset}
            >
              Forgot your password?
            </button>
          ) : null}
        </div>
        <input
          type="password"
          name="password"
          id="password"
          className="mb-4 "
          autoComplete={flow === "signIn" ? "current-password" : "new-password"}
        />
        <input name="flow" value={flow} type="hidden" />
        <button type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          onClick={() => {
            setFlow(flow === "signIn" ? "signUp" : "signIn");
          }}
        >
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </form>
      <br /> <br />
      <button onClick={handleShowLogin}>Show login</button>
    </>
  );
}
