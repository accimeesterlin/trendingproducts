// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY });
};
