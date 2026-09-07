"use client";

import React, { useEffect, useState } from "react";
import {
  PaymentRequestButtonElement,
  useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentRequest } from "@stripe/stripe-js";
import { Loader2, Check, AlertCircle, ShieldCheck, Zap } from "lucide-react";

interface LivePaymentProps {
  amount: number;
  clientSecret: string;
  onSuccess: () => void;
  setIsProcessing: (processing: boolean) => void;
}

export function StripeLivePayment({
  amount,
  clientSecret,
  onSuccess,
  setIsProcessing,
}: LivePaymentProps) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [canPay, setCanPay] = useState<boolean | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!stripe || !clientSecret) return;

    const pr = stripe.paymentRequest({
      country: "US",
      currency: "usd",
      total: {
        label: "Suburban Waste Services - Residential Bill",
        amount: Math.round(amount * 100),
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    pr.canMakePayment()
      .then((result) => {
        if (result) {
          setPaymentRequest(pr);
          setCanPay(true);
        } else {
          setCanPay(false);
        }
      })
      .catch(() => setCanPay(false));

    pr.on("paymentmethod", async (ev) => {
      setIsProcessing(true);
      setStatusMessage("Authorizing with your bank via Stripe...");

      try {
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
          clientSecret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );

        if (confirmError) {
          ev.complete("fail");
          setStatusMessage(confirmError.message || "Payment failed");
          setIsProcessing(false);
        } else {
          ev.complete("success");
          if (paymentIntent?.status === "requires_action") {
            const { error: actionError } = await stripe.confirmCardPayment(clientSecret);
            if (actionError) {
              setStatusMessage(actionError.message || "Authentication failed");
              setIsProcessing(false);
            } else {
              onSuccess();
            }
          } else {
            onSuccess();
          }
        }
      } catch (err: any) {
        ev.complete("fail");
        setStatusMessage(err.message || "Unexpected payment error");
        setIsProcessing(false);
      }
    });

    return () => {
      // Clean up event listeners if any
    };
  }, [stripe, clientSecret, amount, onSuccess, setIsProcessing]);

  if (canPay === null) {
    return (
      <div className="py-4 flex items-center justify-center gap-2 text-sm text-slate-500">
        <Loader2 className="w-4 h-4 animate-spin text-[#7A1900]" />
        <span>Detecting Google Pay / Apple Pay wallet...</span>
      </div>
    );
  }

  if (canPay && paymentRequest) {
    return (
      <div className="space-y-3">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>
            <strong>Stripe Live Wallet Detected:</strong> Google Pay / Apple Pay is ready for 1-tap checkout.
          </span>
        </div>

        {statusMessage && (
          <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="pt-1">
          <PaymentRequestButtonElement
            options={{
              paymentRequest,
              style: {
                paymentRequestButton: {
                  type: "default",
                  theme: "dark",
                  height: "48px",
                },
              },
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 space-y-1">
      <p className="font-semibold flex items-center gap-1.5">
        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
        No active browser wallet detected on this device
      </p>
      <p className="text-amber-800/90 text-[11px]">
        Google Pay requires Chrome/Android with a saved card. Use the simulated 1-tap buttons below to preview the customer experience.
      </p>
    </div>
  );
}
