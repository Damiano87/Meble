import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "@/api/checkoutApi";

export const useCheckout = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: createCheckoutSession,
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
