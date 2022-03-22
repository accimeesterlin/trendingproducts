import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";
import axios from "axios";
import { userStore } from "@Components/stores";
import { Pricing } from "@Components/langingpage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

function CheckoutPage({ url: domain, urlOrigin }) {
  const [origin, setOrigin] = useState(urlOrigin);
  const { user, isAuthenticated } = userStore((state) => state);
  const router = useRouter();

  console.log("Url Origin: ", urlOrigin);
  console.log("Domain: ", domain);

  const getCheckoutSessionUrl = async (subscription) => {
    const { pathname } = router;
    let url = "/api/checkout/sessions?";

    if (pathname) {
      url += `path=${pathname}&`;
    }

    if (origin) {
      url += `domain=${origin}&`;
    }

    if (subscription) {
      url += `subscription=${subscription}&`;
    }

    try {
      const { data } = await axios(url);
      window.open(data?.url);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(async () => {
    const { origin: locationOrigin } = window.location;

    if (locationOrigin) {
      setOrigin(locationOrigin);
    }
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [user]);

  if (!isAuthenticated) {
    return null;
  }

  return <Pricing getCheckoutSessionUrl={getCheckoutSessionUrl} />;
}

export const getServerSideProps = ({ req }) => {
  const { referer } = req?.headers;
  const { origin } = absoluteUrl(req);

  return {
    props: {
      url: referer,
      urlOrigin: origin,
    },
  };
};

export default CheckoutPage;
