import { useAuthActions } from "@convex-dev/auth/react";
import { CodeInput } from "@/components/forms/auth/CodeInput";
import { ResetPasswordWithEmailCode } from "@/components/forms/auth/ResetPasswordWithEmailCode";
import { SignInWithPassword } from "@/components/forms/auth/SigninWithPassword";
import Button from "@/components/buttons/BaseButton";
// import { Toaster } from "@/components/ui/toaster";
import toast from "react-hot-toast";
import { useState } from "react";
import GoogleSignIn from "@/components/buttons/Google";

/**
 * Users choose between OAuth providers or email and password combo
 * with required email verification and optional password reset via OTP.
 */
export function SignInFormPasswordAndVerifyViaCode() {
  const { signIn } = useAuthActions();
//   const { toast } = useToast();
  const [step, setStep] = useState<"signIn" | { email: string } | "forgot">(
    "signIn",
  );
  const [submitting, setSubmitting] = useState(false);
  return (
    <div className="max-w-[384px] mx-auto d-flex flex-column gap-4">
      {step === "signIn" ? (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Sign in or create an account
          </h2>
          
          {/* <SignInMethodDivider /> */}
          <SignInWithPassword
            handleSent={(email) => setStep({ email })}
            handlePasswordReset={() => setStep("forgot")}
            provider="password-code"
          />
          <GoogleSignIn />
        </>
      ) : step === "forgot" ? (
        <ResetPasswordWithEmailCode
          provider="password-code"
          handleCancel={() => setStep("signIn")}
        />
      ) : (
        <>
          <h2 className="font-semibold text-2xl tracking-tight">
            Check your email
          </h2>
          <p className="text-muted-foreground text-sm">
            Enter the 8-digit code we sent to your email address.
          </p>
          <form
            className="flex flex-col"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitting(true);
              const formData = new FormData(event.currentTarget);
              signIn("password-code", formData).catch((error) => {
                console.error(error);
                toast("Code could not be verified, try again");
                setSubmitting(false);
              });
            }}
          >
            <label htmlFor="email">Code</label>
            <CodeInput />
            <input name="email" value={step.email} type="hidden" />
            <input name="flow" value="email-verification" type="hidden" />
            <button type="submit" className="btn btn-success">
              Continue
            </button>
            <Button
              type="button"
            //   variant="link"
              onClick={() => setStep("signIn")}
            >
              Cancel
            </Button>
          </form>
        </>
      )}
    </div>
  );
}