import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export default function LinkedAccounts () {
  const user = useQuery(api.user.getUser);
  const cards = useQuery(api.authorization.getAuthorization, {userId: user!?._id});
  const paymentDetails = useQuery(api.paymentMethod.getPaymentMethods, {userId: user!?._id})
  return (
    <div>
      
    </div>
  )
}