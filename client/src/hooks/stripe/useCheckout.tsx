import { createStripeApi } from "@/api/stripe/stripeApi";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../auth/useAxiosPrivate";

export const useCheckout = () => {
  const axiosPrivate = useAxiosPrivate();
  const { checkoutSessionApi } = createStripeApi(axiosPrivate);
  const { mutate, isPending, error } = useMutation({
    mutationFn: checkoutSessionApi,
    onSuccess: async (data) => {
      const stripe = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
      );
      await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
    onError: (error) => {
      console.error("Błąd podczas tworzenia sesji:", error);
    },
  });

  return { checkout: mutate, isPending, error };
};
