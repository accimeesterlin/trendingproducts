import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const handleSubscription = (subscription) => {
  let priceId;
  switch (subscription) {
    case "monthly":
      priceId = "price_1KfdPbEDjZxHmxzHyohf5Rfa";
      break;
    case "quarterly":
      priceId = "price_1KffPvEDjZxHmxzH2AdaOrJw";
      break;
    case "yearly":
      priceId = "price_1KfdSZEDjZxHmxzHA9mUmeIl";
      break;
    default:
      priceId = "price_1KfdPbEDjZxHmxzHyohf5Rfa";
      break;
  }

  return priceId;
};

export default async (req, res) => {
  const origin = req?.headers?.origin;
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Request Method should be 'Post'" });
  }

  if (!req?.headers?.referer.includes("plan")) {
    return res.redirect("/signup");
  }

  const { subscription } = req.body;
  const priceId = handleSubscription(subscription);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/plan/success?success=true`,
      cancel_url: `${origin}/plan/cancel?canceled=true`,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription", // payment, setup, subscription
      subscription_data: {
        trial_period_days: 14,
      },
    });

    return res.redirect(303, session?.url);
  } catch (error) {
    return res.json({
      message: error?.raw?.message,
      type: error.raw.type,
      statusCode: error.raw.statusCode,
    });
  }
};
