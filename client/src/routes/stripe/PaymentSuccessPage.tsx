import PaymentSuccessfull from "./components/PaymentSuccessfull";
import PaymentNotSuccesfull from "./components/PaymentNotSuccesfull";
import Error from "./components/Error";
import LoadingIndicator from "@/components/LoadingIndicator";
import NoSessionId from "./components/NoSessionId";
import { useVerifyPayment } from "@/hooks/stripe/useVerifyPayment";

function PaymentSuccessPage() {
  const { data, sessionId, isPending, isError, error } = useVerifyPayment();

  if (!sessionId) {
    return <NoSessionId />;
  }

  if (isPending) {
    return (
      <div className="h-screen">
        <LoadingIndicator />
      </div>
    );
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
