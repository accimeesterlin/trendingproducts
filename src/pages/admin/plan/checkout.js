import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { userStore } from "@Components/stores";
import { Pricing } from "@Components/langingpage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutPage() {
  const { user, isAuthenticated } = userStore((state) => state);
  const router = useRouter();

  useEffect(async () => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  return <Pricing />;
}
export default CheckoutPage;
