"use client";

import React, { useState } from "react";
import {
  X,
  Check,
  Smartphone,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  KeyRound,
  MapPin,
  Mail,
  Zap,
  Lock,
  Search,
  CheckCircle2,
  RefreshCw,
  Fingerprint,
} from "lucide-react";
import { CustomerAccount } from "@/lib/mockData";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (method: string) => void;
  account: CustomerAccount;
}

type AuthTab = "sso" | "sms" | "address" | "guest";

export function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
  account,
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>("sso");
  const [phoneNumber, setPhoneNumber] = useState("952-555-0192");
  const [otpCode, setOtpCode] = useState(["", "", "", ""]);
  const [otpSent, setOtpSent] = useState(false);
  const [searchAddress, setSearchAddress] = useState("");
  const [matchedAddress, setMatchedAddress] = useState<boolean | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccessMethod, setAuthSuccessMethod] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAppleSignIn = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessMethod(" Sign in with Apple (FaceID Verified)");
      setTimeout(() => {
        onLoginSuccess("Apple SSO");
        setAuthSuccessMethod(null);
        onClose();
      }, 1200);
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessMethod("Google Workspace SSO (Verified)");
      setTimeout(() => {
        onLoginSuccess("Google SSO");
        setAuthSuccessMethod(null);
        onClose();
      }, 1200);
    }, 1000);
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessMethod("SMS Passwordless Magic Code (Verified)");
      setTimeout(() => {
        onLoginSuccess("SMS Passwordless");
        setAuthSuccessMethod(null);
        setOtpSent(false);
        onClose();
      }, 1200);
    }, 900);
  };

  const handleAddressSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchAddress.toLowerCase().includes("promontory") || searchAddress.includes("9842") || searchAddress.length > 3) {
      setMatchedAddress(true);
    } else {
      setMatchedAddress(false);
    }
  };

  const handleClaimAddress = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccessMethod("Address Claim & Instant SMS Verification");
      setTimeout(() => {
        onLoginSuccess("Address Auto-Lookup");
        setAuthSuccessMethod(null);
        setMatchedAddress(null);
        setSearchAddress("");
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#7A1900] to-[#9E2A0D] p-5 sm:p-6 text-white flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-black text-xl">Next-Gen Identity & Auth</h3>
              <span className="bg-white/20 text-white text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Zero Passwords
              </span>
            </div>
            <p className="text-sm text-red-100 mt-1">
              1-tap biometric SSO, SMS magic links, and smart address lookup
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50 p-1.5 gap-1 text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveTab("sso")}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "sso"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Fingerprint className="w-4 h-4 text-[#7A1900]" />
            <span>1-Tap SSO</span>
          </button>
          <button
            onClick={() => setActiveTab("sms")}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "sms"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span>SMS Link</span>
          </button>
          <button
            onClick={() => setActiveTab("address")}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "address"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>Claim Home</span>
          </button>
          <button
            onClick={() => setActiveTab("guest")}
            className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
              activeTab === "guest"
                ? "bg-white text-emerald-800 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick Pay</span>
          </button>
        </div>

        {/* Success Screen */}
        {authSuccessMethod ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <div>
              <h4 className="text-xl font-black text-slate-900">
                Authenticated in 1.2 Seconds!
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Connected via <strong>{authSuccessMethod}</strong>.
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                ✓ Account #89545 Linked • Ready to Pay / Sync
              </div>
            </div>
          </div>
        ) : isAuthenticating ? (
          <div className="p-12 text-center space-y-4 my-auto">
            <RefreshCw className="w-10 h-10 text-[#7A1900] animate-spin mx-auto" />
            <div className="font-bold text-slate-900 text-sm">
              Verifying Biometric Token & Connecting Account...
            </div>
            <p className="text-xs text-slate-500">Querying SWS Navusoft ERP bridge</p>
          </div>
        ) : (
          <div className="p-6 space-y-5 text-slate-900 text-xs overflow-y-auto">
            {/* Tab 1: 1-Tap Biometric SSO */}
            {/* Tab 1: 1-Tap Biometric SSO */}
            {activeTab === "sso" && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-sm font-bold text-slate-900 block">
                    Zero Passwords. Zero PIN Codes.
                  </span>
                  <p className="text-xs text-slate-500">
                    Use your existing device biometrics to sign in or create an account instantly.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Apple SSO Button */}
                  <button
                    onClick={handleAppleSignIn}
                    className="w-full bg-black hover:bg-slate-900 text-white font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.99] shadow-sm text-sm"
                  >
                    <span className="text-lg"></span>
                    <span>Sign in with Apple (FaceID)</span>
                  </button>

                  {/* Google SSO Button */}
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-transform active:scale-[0.99] shadow-xs text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1.5 text-slate-700">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-500" />
                    <span>How Account Binding Works:</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When you authenticate via Apple or Google, our system matches your verified email or phone against SWS billing records. <strong>No manual 8-digit PIN or registration form required.</strong>
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Passwordless SMS Code / Magic Link */}
            {activeTab === "sms" && (
              <div className="space-y-4">
                {!otpSent ? (
                  <form onSubmit={handleSendOtp} className="space-y-3.5">
                    <div className="text-center space-y-1">
                      <span className="text-sm font-bold text-slate-900 block">
                        Passwordless Phone Login
                      </span>
                      <p className="text-xs text-slate-500">
                        Enter your mobile number on file to receive a 1-tap secure login link.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile Phone Number
                      </label>
                      <div className="relative">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="(952) 555-0192"
                          className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-base font-mono focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#7A1900] hover:bg-[#581200] text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <span>Text Me 1-Tap Login Link</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="text-center space-y-1">
                      <span className="text-sm font-bold text-emerald-700 block">
                        ✓ 4-Digit Code Sent to {phoneNumber}
                      </span>
                      <p className="text-xs text-slate-500">
                        Enter code below or tap the magic link in your SMS.
                      </p>
                    </div>

                    {/* 4 Digit Boxes */}
                    <div className="flex justify-center gap-3">
                      {[0, 1, 2, 3].map((idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          defaultValue={["8", "9", "5", "4"][idx]}
                          className="w-12 h-12 text-center text-xl font-mono font-bold border-2 border-slate-300 focus:border-[#7A1900] rounded-xl focus:outline-none bg-slate-50 text-slate-900"
                        />
                      ))}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                    >
                      <span>Verify & Open My Portal</span>
                      <Check className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-xs text-slate-500 hover:text-slate-900"
                    >
                      Change phone number
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Tab 3: "Claim Your Address" Smart Onboarding */}
            {activeTab === "address" && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-sm font-bold text-slate-900 block">
                    Moved In? Lost Your Bill?
                  </span>
                  <p className="text-xs text-slate-500">
                    Find your household service record simply by typing your street address.
                  </p>
                </div>

                <form onSubmit={handleAddressSearch} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Service Address (Eden Prairie / Savage)
                    </label>
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchAddress}
                        onChange={(e) => setSearchAddress(e.target.value)}
                        placeholder="e.g. 9842 Promontory Dr, Eden Prairie"
                        className="w-full pl-10 pr-3.5 py-2.5 border border-slate-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-[#7A1900]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Lookup Service Address</span>
                  </button>
                </form>

                {matchedAddress === true && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-3 animate-fade-in">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-emerald-950 text-sm">
                          Active Service Record Found!
                        </div>
                        <p className="text-xs text-emerald-800 mt-1">
                          9842 Promontory Dr • Route #4 (Thursday Pickup) • Acct #89545
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleClaimAddress}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <span>Claim Account via SMS to (952) •••-0192</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {matchedAddress === false && (
                  <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-900 text-xs sm:text-sm text-center">
                    No active account found for that address. Please check your spelling or contact Susie Scott at (952) 937-8900.
                  </div>
                )}
              </div>
            )}

            {/* Tab 4: Guest Invoice Quick Pay (Feature Parity with Navusoft + Apple Pay upgrade) */}
            {activeTab === "guest" && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <span className="text-sm font-bold text-slate-900 block">
                    Invoice Quick Pay (Guest Mode)
                  </span>
                  <p className="text-xs text-slate-500">
                    Settle a bill instantly without logging in. Full feature parity with Navusoft + 1-Tap Apple Pay.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500 text-xs block">Invoice #</span>
                      <span className="font-mono font-bold text-slate-900 text-sm">INV-89545-Q3</span>
                    </div>
                    <div>
                      <span className="text-slate-500 text-xs block">Amount Due</span>
                      <span className="font-mono font-bold text-emerald-700 text-base">$126.93</span>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-2.5 text-xs text-slate-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Service:</span>
                      <span className="font-semibold text-slate-900">Quarterly Trash & Recycling</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Address:</span>
                      <span className="font-semibold text-slate-900">9842 Promontory Dr</span>
                    </div>
                  </div>
                </div>

                {/* 1-Tap Payment Buttons */}
                <div className="space-y-2.5">
                  <button
                    onClick={() => {
                      setIsAuthenticating(true);
                      setTimeout(() => {
                        setIsAuthenticating(false);
                        setAuthSuccessMethod(" Apple Pay Guest Settlement ($126.93)");
                        setTimeout(() => {
                          onLoginSuccess("Guest Quick Pay");
                          setAuthSuccessMethod(null);
                          onClose();
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full bg-black hover:bg-slate-900 text-white font-black py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-transform active:scale-[0.99] text-base"
                  >
                    <span>Pay</span>
                    <span className="text-sm font-medium text-slate-300">Quick Pay $126.93</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAuthenticating(true);
                      setTimeout(() => {
                        setIsAuthenticating(false);
                        setAuthSuccessMethod("Google Pay Guest Settlement ($126.93)");
                        setTimeout(() => {
                          onLoginSuccess("Guest Quick Pay");
                          setAuthSuccessMethod(null);
                          onClose();
                        }, 1200);
                      }, 1000);
                    }}
                    className="w-full bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold py-3 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm transition-transform active:scale-[0.99]"
                  >
                    <span>Google Pay Quick Pay ($126.93)</span>
                  </button>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>After payment, 1 click saves your card to AutoPay so you never pay manually again.</span>
                </div>
              </div>
            )}

            {/* Comparison vs Old Way Banner */}
            <div className="border-t border-slate-100 pt-3.5 flex items-center justify-between text-xs text-slate-600">
              <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero legacy passwords to remember</span>
              </span>
              <span className="bg-slate-100 px-2.5 py-1 rounded-md text-xs font-mono font-bold text-slate-700">
                OAuth2 / WebAuthn
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
