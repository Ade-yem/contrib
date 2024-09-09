import Button from "@/components/buttons/BaseButton";
import toast from "react-hot-toast";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";

export function SignInWithEmailCode({
  handleCodeSent,
  provider,
  children,
}: {
  handleCodeSent: (email: string) => void;
  provider?: string;
  children?: React.ReactNode;
}) {
  const { signIn } = useAuthActions();
//   const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        signIn(provider ?? "resend-otp", formData)
          .then(() => handleCodeSent(formData.get("email") as string))
          .catch((error) => {
            console.error(error);
            toast.error(
            "Could not send code",
            );
            setSubmitting(false);
          });
      }}
    >
      <label htmlFor="email">Email</label>
      <input name="email" id="email" className="mb-4 form-control" autoComplete="email" />
      {children}
      <Button type="submit" disabled={submitting}>
        Send code
      </Button>
    </form>
  );
}