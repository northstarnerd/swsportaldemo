# Workspace State & Session Ledger (`STATE.md`)

> **Single source of truth for active tasks, recent decisions, and cross-session handoffs.**
> *Last Updated:* 2026-09-13
> *Production Deployment:* [https://swsportaldemo.vercel.app](https://swsportaldemo.vercel.app)
> *GitHub Repository:* [https://github.com/northstarnerd/swsportaldemo](https://github.com/northstarnerd/swsportaldemo)

---

## 🎯 Current Objectives & Status

### Completed Milestones
- [x] **Initial Customer Portal POC:**
  - [x] Next.js 14 App Router setup with Tailwind CSS, Lucide icons, and Framer Motion animations.
  - [x] Account balance summary ($94.50 quarterly residential bill).
  - [x] Route schedule tracker with upcoming service dates.
  - [x] Container manager modal (trash, recycling, yard waste cart requests).
  - [x] Extra service modal (bulky item pickup, cart repair).
  - [x] Calendar sync engine (`lib/icsGenerator.ts`) exporting native `.ics` reminder files.
  - [x] Embedded executive pitch decks (`/pitch`, `/family-pitch`).
- [x] **1-Tap Payments & Stripe Integration:**
  - [x] Installed Stripe client and server SDKs (`@stripe/stripe-js`, `@stripe/react-stripe-js`, `stripe`).
  - [x] Created serverless PaymentIntent creation API at [`src/app/api/create-payment-intent/route.ts`](file:///Users/pat/code/payments/src/app/api/create-payment-intent/route.ts).
  - [x] Built [`StripeLivePayment.tsx`](file:///Users/pat/code/payments/src/components/StripeLivePayment.tsx) using Stripe's `PaymentRequestButtonElement` for native Google Pay and Apple Pay sheets.
  - [x] Built hybrid payment modal in [`PaymentModal.tsx`](file:///Users/pat/code/payments/src/components/PaymentModal.tsx) with automatic hardware wallet detection, interactive simulation fallback, and 1-click test card autofill (`4242...`).
- [x] **Git & GitHub Infrastructure:**
  - [x] Git initialized with clean `.gitignore` (excluding `node_modules`, `.next`, `.env*`).
  - [x] GitHub remote linked to `https://github.com/northstarnerd/swsportaldemo.git`.
  - [x] macOS Keychain credentials configured; end-to-end commit and push verified.
- [x] **Vercel Cloud Deployment:**
  - [x] Authenticated Vercel CLI and linked project to `patrickbadley's projects`.
  - [x] Diagnosed initial build failure via Vercel CLI events (symlink collision on `public/images`).
  - [x] Fixed symlink, added build safety flag in `next.config.mjs`, and achieved **Ready** production deployment.
- [x] **Agentic Development Pipeline (2026-09-13):**
  - [x] Established `AGENTS.md` (invariants, PCI-DSS boundaries, layer separation).
  - [x] Established `WORKFLOW.md` (mechanism map, model allocation, context rot thresholds).
  - [x] Established `ARCHITECTURE.md` (system data flows, component taxonomy).
  - [x] Created deterministic backpressure quality gate in `scripts/verify.sh` (`npm run verify`).
  - [x] Created `scratch/` workspace for multi-session task tracking.

---

### Pending / Active Backlog
- [ ] **Live Stripe Test Credentials:**
  - [ ] Obtain live Stripe test keys (`pk_test_...`, `sk_test_...`) from Stripe Dashboard.
  - [ ] Add them to Vercel Project Settings (or local `.env.local`) to process live test tokenizations.
- [ ] **Twilio SMS Passwordless Authentication:**
  - [ ] Implement backend route `/api/auth/send-sms` and `/api/auth/verify-code` using mock or real Twilio API.
  - [ ] Connect [`src/components/SmsRecoveryModal.tsx`](file:///Users/pat/code/payments/src/components/SmsRecoveryModal.tsx) to backend auth state.
- [ ] **AutoPay Enrollment Flow:**
  - [ ] Implement recurring mandate setup in [`src/components/AutoPayModal.tsx`](file:///Users/pat/code/payments/src/components/AutoPayModal.tsx).
  - [ ] Support saving payment method via Stripe SetupIntents.
- [ ] **NavuSoft ERP Integration Layer:**
  - [ ] Define API contract for customer route schedules and billing ledger synchronization.
  - [ ] Replace static `mockData.ts` with dynamic route fetches with graceful fallback.
- [ ] **Custom Domain Setup:**
  - [ ] Point custom domain (e.g. `portal.suburbanwaste.com` or custom demo URL) to Vercel deployment.

---

## 📌 Key Decisions Log

* **Hybrid Payment Architecture:** The checkout modal automatically tests if active Stripe keys and a browser wallet (Google Pay/Apple Pay) are present. If present, it executes live tokenization. If absent, it gracefully falls back to an interactive demo flow with zero crashes or error alerts.
* **PCI-DSS Level 1 Isolation:** Zero cardholder data (PAN, CVV) touches our Next.js backend. All card entry is delegated to Stripe Elements or browser digital wallets.
* **Deterministic Verification Gate:** All sessions must run `npm run verify` (`scripts/verify.sh`) before completing tasks or committing code.
* **Disk-Backed State Machine:** State is tracked in `STATE.md` and `scratch/task-NNN/`. Incoming sessions resume from disk state rather than asking the human to rebuild context.

---

## ⏭️ Immediate Next Actions for Incoming Sessions

1. Read [`AGENTS.md`](file:///Users/pat/code/payments/AGENTS.md) for workspace invariants and PCI-DSS rules.
2. Review [`STATE.md`](file:///Users/pat/code/payments/STATE.md) (this file) to locate active tasks.
3. If beginning a multi-step feature, create a task scratchpad: `scratch/task-NNN/01-plan.md`.
4. Run `npm run verify` before committing.
5. Update this ledger and commit to Git upon task completion.
