"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { ModalTypes } from "@/services/_schema";
import { LayoutContext } from "@/context/layoutContext";
import { ConvexError } from "convex/values";

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
        className="flex flex-col w-70"
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
              const msg = error instanceof ConvexError ? (error.data as {message: string }).message
              :
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
              toast.error(msg, { id: "auth" });
              setSubmitting(false);
            });
        }}
      >
        <label htmlFor="email">Email</label>
        <input name="email" id="email" className="mb-4 form-control" autoComplete="email" />
        <div className="d-flex align-items-center justify-content-between">
          <label htmlFor="password">Password</label>
          {handlePasswordReset && flow === "signIn" ? (
            <button
              className="p-0 h-auto btn-link bg-transparent"
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
          className="mb-4 mt-2 form-control"
          autoComplete={flow === "signIn" ? "current-password" : "new-password"}
        />
        <input name="flow" value={flow} type="hidden" />
        <button className="btn btn-success" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <p
          className="text-center cursor-pointer mt-2 p-2 font-semibold"
          onClick={() => {
            setFlow(flow === "signIn" ? "signUp" : "signIn");
          }}
        >
          {flow === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </p>
      </form>
      {/* <button onClick={handleShowLogin}>Show login</button> */}
    </>
  );
}
