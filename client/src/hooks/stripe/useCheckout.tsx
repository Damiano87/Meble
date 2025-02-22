import { createStripeApi } from "@/api/stripe/stripeApi";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";

export const useCheckout = () => {
  const { checkoutSessionApi } = createStripeApi();
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
