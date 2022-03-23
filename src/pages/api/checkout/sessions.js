import Stripe from "stripe";
import { withSentry } from "@sentry/nextjs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const handleSubscription = (subscription) => {
  let priceId;
  switch (subscription) {
    case "monthly":
      priceId = process.env.MONTHLY_PRICING || "price_1KfdPbEDjZxHmxzHyohf5Rfa";
      break;
    case "quarterly":
      priceId =
        process.env.QUATERLY_PRICING || "price_1KffPvEDjZxHmxzH2AdaOrJw";
      break;
    case "yearly":
      priceId = process.env.YEARLY_PRICING || "price_1KfdSZEDjZxHmxzHA9mUmeIl";
      break;
    default:
      priceId = process.env.MONTHLY_PRICING || "price_1KfdPbEDjZxHmxzHyohf5Rfa";
      break;
  }

  return priceId;
};

const handler = async (req, res) => {
  const { subscription, domain, path } = req?.query;

  if (!domain || !path) {
    return res.json({
      message: "'domain' and 'path' must be provided as query string",
      statusCode: 403,
    });
  }

  const priceId = handleSubscription(subscription);

  try {
    const session = await stripe.checkout.sessions.create({
      success_url: `${domain}/admin/plan/success?success=true`,
      cancel_url: `${domain}/admin/plan/cancel?canceled=true`,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "subscription", // payment, setup, subscription
      subscription_data: {
        trial_period_days: process.env.TRIAL_PERIOD_DAYS || 7,
      },
    });
    return res.json({ url: session?.url });
  } catch (error) {
    return res.status(500).json({
      message: error?.raw?.message,
      type: error.raw.type,
      statusCode: error.raw.statusCode,
    });
  }
};

export default withSentry(handler);
