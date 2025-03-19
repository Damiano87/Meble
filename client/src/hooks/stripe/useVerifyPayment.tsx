import { createStripeApi } from "@/api/stripe/stripeApi";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import useAxiosPrivate from "../auth/useAxiosPrivate";

export const useVerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const axiosPrivate = useAxiosPrivate();
  const sessionId = searchParams.get("session_id");
  const { verifyPaymentApi } = createStripeApi(axiosPrivate);
  // use useQuery hook to fetch payment status
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["verifyPayment", sessionId],
    queryFn: () => verifyPaymentApi(sessionId),
    enabled: !!sessionId,
    retry: 1,
    staleTime: Infinity, // query will not refetch until the page is refreshed
    gcTime: 5 * 60 * 1000,
  });

  return { data, isPending, isError, error, sessionId };
};
