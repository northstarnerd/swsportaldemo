import React from "react";
import { MobilePayView, MobilePayDetails } from "@/components/MobilePayView";

interface PayTokenPageProps {
  params: {
    token: string;
  };
}

function decodeToken(token: string): Partial<MobilePayDetails> {
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
    // If it's a simple slug like 89545 or 89545-q3
    return {
      accountNumber: token.includes("89545") ? "SWS-89545" : `SWS-${token.slice(0, 8)}`,
      customerName: "Patrick Badley",
      amount: 94.5,
      service: "Quarterly Trash & Organics Service",
      address: "Eden Prairie, MN (Route 4)",
    };
  }
}

export default function PayTokenPage({ params }: PayTokenPageProps) {
  const details = decodeToken(params.token);
  return <MobilePayView initialDetails={details} />;
}
