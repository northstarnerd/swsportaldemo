import React from "react";
import { MobilePayView, MobilePayDetails } from "@/components/MobilePayView";

interface PayPageProps {
  searchParams?: {
    acc?: string;
    name?: string;
    amt?: string;
    srv?: string;
    addr?: string;
  };
}

export default function PayPage({ searchParams }: PayPageProps) {
  const amount = searchParams?.amt ? parseFloat(searchParams.amt) : 94.5;

  const details: Partial<MobilePayDetails> = {
    accountNumber: searchParams?.acc || "SWS-89545",
    customerName: searchParams?.name || "Patrick Badley",
    amount: isNaN(amount) ? 94.5 : amount,
    service: searchParams?.srv || "Quarterly Trash & Organics Service",
    address: searchParams?.addr || "Eden Prairie, MN (Route 4)",
  };

  return <MobilePayView initialDetails={details} />;
}
