import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const amount = body.amount || 94.5;

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey.startsWith("sk_test_placeholder")) {
      return NextResponse.json({
        configured: false,
        message: "Stripe test keys not configured. Running in high-fidelity demo simulation mode.",
      });
    }

    const stripe = new Stripe(secretKey);

    // Convert amount to cents
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Suburban Waste Services - Quarterly Residential Bill",
      metadata: {
        customer_account: "SWS-89545",
        customer_name: "Patrick Badley",
        service_address: "Eden Prairie, MN",
      },
    });

    return NextResponse.json({
      configured: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { configured: false, error: error.message || "Failed to initialize payment intent" },
      { status: 500 }
    );
  }
}
