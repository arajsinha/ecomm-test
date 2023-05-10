import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.headers.billingaddress);
    console.log(req.headers.shippingaddress);
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        // payment_method_types: ['card'],
        // billing_address_collection: 'auto',
        // shipping_address_collection: {allowed_countries: ['IN']},
        shipping_options: [{ shipping_rate: "shr_1MkKv3SFUaTZgP2dWOAo3RI6" }],
        line_items: req.body.map((item) => {
          // console.log("Nice")
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/vfxfwnaw/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/canceled`,
        metadata: {
          user_uid: req.headers.useruid,
          billingaddress: req.headers.billingaddress,
          shippingaddress: req.headers.shippingaddress
        }
      };

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
