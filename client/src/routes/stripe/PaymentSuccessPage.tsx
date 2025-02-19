import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "@/api/apiRequest";
import PaymentSuccessfull from "./components/PaymentSuccessfull";
import PaymentNotSuccesfull from "./components/PaymentNotSuccesfull";
import Error from "./components/Error";
import LoadingIndicator from "@/components/LoadingIndicator";
import NoSessionId from "./components/NoSessionId";

// function for verifying payment status
const verifyPayment = async (sessionId: string | null) => {
  //   if (!sessionId) {
  //     throw new Error("Brak ID sesji płatności");
  //   }

  const { data } = await apiRequest.get(`/stripe/api/verify-payment`, {
    params: { session_id: sessionId },
  });
  return data;
};

function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // use useQuery hook to fetch payment status
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["verifyPayment", sessionId],
    queryFn: () => verifyPayment(sessionId),
    enabled: !!sessionId,
    retry: 1,
    staleTime: Infinity, // query will not refetch until the page is refreshed
    gcTime: 5 * 60 * 1000,
  });

  if (!sessionId) {
    return <NoSessionId />;
  }

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return (
      <Error
        message={error instanceof Error ? error.message : "Wystąpił błąd"}
      />
    );
  }

  if (!data.success) {
    return <PaymentNotSuccesfull message={data.message} />;
  }

  // payment successful
  return <PaymentSuccessfull {...data} />;
}

export default PaymentSuccessPage;
