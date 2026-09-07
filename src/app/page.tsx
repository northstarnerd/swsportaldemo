"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { AccountSummary } from "@/components/AccountSummary";
import { ServiceSchedule } from "@/components/ServiceSchedule";
import { ServiceHistory } from "@/components/ServiceHistory";
import { PaymentModal } from "@/components/PaymentModal";
import { AutoPayModal } from "@/components/AutoPayModal";
import { ExtraServiceModal } from "@/components/ExtraServiceModal";
import { SmsRecoveryModal } from "@/components/SmsRecoveryModal";
import { StoryComparisonModal } from "@/components/StoryComparisonModal";
import { CalendarSyncModal } from "@/components/CalendarSyncModal";
import { AuthModal } from "@/components/AuthModal";
import { ContainerManagerModal } from "@/components/ContainerManagerModal";
import { DemoToolbar } from "@/components/DemoToolbar";
import { INITIAL_ACCOUNT_DATA, CustomerAccount } from "@/lib/mockData";

export default function DashboardPage() {
  const [account, setAccount] = useState<CustomerAccount>(INITIAL_ACCOUNT_DATA);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [autoPayModalOpen, setAutoPayModalOpen] = useState(false);
  const [extraModalOpen, setExtraModalOpen] = useState(false);
  const [smsDemoOpen, setSmsDemoOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [calendarModalOpen, setCalendarModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [containerModalOpen, setContainerModalOpen] = useState(false);

  // Handle updated Auto-Pay preferences
  const handleAutoPaySave = (updatedAutoPay: CustomerAccount["billing"]["autoPay"]) => {
    setAccount((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        autoPay: updatedAutoPay,
      },
    }));
  };

  // Handle successful bill payment
  const handlePaymentSuccess = () => {
    setAccount((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        totalDue: 0.0,
        pastDue: 0.0,
        status: "Paid",
        autoPay: {
          ...prev.billing.autoPay,
          statusNote: "Auto-pay active and in good standing.",
          failedReason: undefined,
        },
      },
    }));
  };

  // Handle on-demand service booking (extra bag / bulky item)
  const handleExtraServiceSuccess = (name: string, cost: number) => {
    const newHistoryItem = {
      id: `hist-${Date.now()}`,
      serviceId: `${Math.floor(8700000 + Math.random() * 99999)}`,
      date: "Thu, Aug 27, 2026",
      day: "Thursday",
      serviceName: name,
      status: "Scheduled" as const,
    };

    setAccount((prev) => ({
      ...prev,
      recentHistory: [newHistoryItem, ...prev.recentHistory],
    }));
  };

  // Toggle between Paid and Past-Due state for demos
  const handleToggleState = () => {
    if (account.billing.totalDue === 0) {
      setAccount(INITIAL_ACCOUNT_DATA);
    } else {
      handlePaymentSuccess();
    }
  };

  // Reset to initial screenshot state
  const handleReset = () => {
    setAccount(INITIAL_ACCOUNT_DATA);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900 font-sans selection:bg-[#7A1900] selection:text-white">
      {/* Top Header */}
      <Header
        account={account}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenContainers={() => setContainerModalOpen(true)}
        onOpenCalendar={() => setCalendarModalOpen(true)}
        onOpenStory={() => setStoryModalOpen(true)}
      />

      {/* Main Content Dashboard */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Row 1: Account & Billing Overview */}
        <AccountSummary
          account={account}
          onOpenPayment={() => setPaymentModalOpen(true)}
          onOpenAutoPay={() => setAutoPayModalOpen(true)}
        />

        {/* Row 2: Service Schedule & Calendar Integration */}
        <ServiceSchedule
          services={account.services}
          onOpenExtraServices={() => setExtraModalOpen(true)}
          onOpenCalendarSync={() => setCalendarModalOpen(true)}
          onOpenContainerManager={() => setContainerModalOpen(true)}
        />

        {/* Row 3: Live Verification History */}
        <ServiceHistory history={account.recentHistory} />

      </main>

      {/* Modals & Dialogs */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={account.billing.totalDue > 0 ? account.billing.totalDue : 126.93}
        onSuccess={handlePaymentSuccess}
      />

      <AutoPayModal
        isOpen={autoPayModalOpen}
        onClose={() => setAutoPayModalOpen(false)}
        account={account}
        onSave={handleAutoPaySave}
      />

      <CalendarSyncModal
        isOpen={calendarModalOpen}
        onClose={() => setCalendarModalOpen(false)}
      />

      <ContainerManagerModal
        isOpen={containerModalOpen}
        onClose={() => setContainerModalOpen(false)}
        account={account}
      />

      <ExtraServiceModal
        isOpen={extraModalOpen}
        onClose={() => setExtraModalOpen(false)}
        onBookSuccess={handleExtraServiceSuccess}
      />

      <SmsRecoveryModal
        isOpen={smsDemoOpen}
        onClose={() => setSmsDemoOpen(false)}
        onCleared={handlePaymentSuccess}
      />

      <StoryComparisonModal
        isOpen={storyModalOpen}
        onClose={() => setStoryModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(method) => {
          console.log("Logged in via", method);
        }}
        account={account}
      />

      {/* Pitch Demo Toolbar (Bottom floating) */}
      <DemoToolbar
        onOpenSmsDemo={() => setSmsDemoOpen(true)}
        onOpenStory={() => setStoryModalOpen(true)}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenContainers={() => setContainerModalOpen(true)}
        onReset={handleReset}
        onToggleState={handleToggleState}
        isPaid={account.billing.totalDue === 0}
      />
    </div>
  );
}
