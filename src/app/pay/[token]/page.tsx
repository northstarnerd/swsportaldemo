import React from "react";
import { MobilePayView, MobilePayDetails } from "@/components/MobilePayView";

interface PayTokenPageProps {
  params: {
    token: string;
  };
}

import { getPaymentLink } from "@/lib/paymentStore";

function decodeToken(token: string): Partial<MobilePayDetails> {
  // 1. Check link store for short code lookup
  const stored = getPaymentLink(token);
  if (stored) {
    return stored;
  }

  // 2. Fallback to base64url if passed
  try {
    const jsonStr = Buffer.from(token, "base64url").toString("utf-8");
    const data = JSON.parse(jsonStr);
    return {
      accountNumber: data.acc || "SWS-89545",
      customerName: data.name || "Patrick Badley",
      amount: typeof data.amt === "number" ? data.amt : 94.5,
      service: data.srv || "Quarterly Trash & Organics Service",
      address: data.addr || "Eden Prairie, MN (Route 4)",
    };
  } catch {
    // 3. Known account numbers
    if (token.includes("74120")) {
      return {
        accountNumber: "SWS-74120",
        customerName: "Robert Miller",
        amount: 94.5,
        service: "Quarterly Trash & Organics Service",
        address: "8210 Pioneer Trail, Eden Prairie, MN",
      };
    }
    if (token.includes("62914")) {
      return {
        accountNumber: "SWS-62914",
        customerName: "Jennifer Anderson",
        amount: 126.93,
        service: "Quarterly Trash + Extra Yard Waste Cart",
        address: "9104 Prairie Bluff Rd, Eden Prairie, MN",
      };
    }
    return {
      accountNumber: token.includes("89545") ? "SWS-89545" : `SWS-${token.slice(0, 8)}`,
      customerName: "Patrick Badley",
      amount: 94.5,
      service: "Quarterly Trash & Organics Service",
      address: "6484 Promontory Drive, Eden Prairie, MN",
    };
  }
}

export default function PayTokenPage({ params }: PayTokenPageProps) {
  const details = decodeToken(params.token);
  return <MobilePayView initialDetails={details} />;
}
