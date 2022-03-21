import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Pricing } from "@Components/langingpage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutPage() {
  return <Pricing />;
}
export default CheckoutPage;
