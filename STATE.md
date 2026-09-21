# Workspace State & Session Ledger (`STATE.md`)

> **Single source of truth for active tasks, recent decisions, and cross-session handoffs.**
> *Last Updated:* 2026-09-21
> *Production Deployment:* [https://swsportaldemo.vercel.app](https://swsportaldemo.vercel.app)
> *GitHub Repository:* [https://github.com/northstarnerd/swsportaldemo](https://github.com/northstarnerd/swsportaldemo)

---

## 🎯 Current Objectives & Status

### Completed Milestones
- [x] **URL-Isolated Multi-Demo Suite Scaffolding (Session 2026-09-21):**
  - [x] Engineered clean URL-driven routing structure under `/demos/*` with $0 extra Vercel cost.
  - [x] Enforced strict invariant: zero switcher toggles or cross-demo links on customer pages.
  - [x] Built internal link directory hub at [`src/app/demos/page.tsx`](file:///Users/pat/code/payments/src/app/demos/page.tsx).
  - [x] Built isolated prototype for **Walters Recycling & Refuse** at [`src/app/demos/walters/page.tsx`](file:///Users/pat/code/payments/src/app/demos/walters/page.tsx).
  - [x] Built isolated prototype for **1-Tap MedPay (Pediatrics/Oral Surgery)** at [`src/app/demos/medpay/page.tsx`](file:///Users/pat/code/payments/src/app/demos/medpay/page.tsx).
  - [x] Built isolated prototype for **Residential Snow Dispatch** at [`src/app/demos/snow/page.tsx`](file:///Users/pat/code/payments/src/app/demos/snow/page.tsx).
  - [x] Built isolated prototype for **SafeRoute K-12 Transportation** at [`src/app/demos/bus/page.tsx`](file:///Users/pat/code/payments/src/app/demos/bus/page.tsx).
  - [x] Parameterized [`PaymentModal.tsx`](file:///Users/pat/code/payments/src/components/PaymentModal.tsx) and [`icsGenerator.ts`](file:///Users/pat/code/payments/src/lib/icsGenerator.ts) for multi-merchant reusability.
- [x] **SWS Callback & Active Engagement (Session 2026-09-21):**
  - [x] SWS called back! SWS pilot conversation is now the primary, prioritized focus.
  - [x] Established and documented adjacent market expansion playbook in [`EXPANSION_IDEAS.md`](file:///Users/pat/code/payments/EXPANSION_IDEAS.md) covering:
    - **Adjacent Twin Cities Independent Haulers:** Walters Recycling, Aspen Waste, Dick's Sanitation (DSI), Highland, Tennis (shared Navusoft/Soft-Pak/Tower tech, 100% code reuse, executive outreach model).
    - **1-Tap MedPay / Private Medical & Dental:** Warm family beachhead (physician spouse credibility, brother-in-law at Maxillofacial Surgery Center), HSA/FSA card support, $30–$250 post-insurance patient balance recovery, $250–$500/mo SaaS economics.
    - **Route-Based Home Services:** Timely Minnesota residential snow plowing dispatch/cards-on-file, septic pumping, municipal sweeping.
  - [x] Placed horizontal expansion verticals on official backburner as the dual-purpose scaling roadmap (once SWS pilot metrics prove out) or fallback playbook (if SWS negotiations stall).
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
- [x] **UI & Accessibility Standardization (Session 2026-09-07 / 2026-09-13):**
  - [x] Standardized 4-tier typography scale across all components, modals, and decks.
  - [x] Eliminated all hardcoded micro-fonts (`text-[9px]`, `text-[10px]`, `text-[11px]`) in favor of crisp, accessible `text-xs font-bold`, `text-sm`, and `text-base`.
  - [x] Ensured form touch inputs satisfy minimum 16px font-size to prevent mobile Safari auto-zooming.
  - [x] Unified button sizing and padding across service actions (`[ Manage Bins ]`, `[ Sync Calendar ]`, `[ Extra Bags ]`).
  - [x] Cleaned up demo clutter and removed test shift badges.
- [x] **Family Alignment & Vertical Expansion Deck (`/family-pitch`):**
  - [x] Built 13-slide interactive widescreen presentation deck.
  - [x] W-2 physician spouse tax shield calculator and passive-to-active time investment model.
  - [x] Private Medical & Dental Practice Expansion analysis (solving paper-invoice friction inspired by Southdale Pediatrics and maxillofacial/dental surgery centers).
- [x] **Corporate & Holding Company Architecture & Brand Identity:**
  - [x] Explored corporate entity naming frameworks: Evaluated "North Star" heritage vs. regional over-saturation in Minnesota.
  - [x] Established "Pink Cardinal" naming track honoring daughters (pink) and family cardinal heritage + rare biological pink cardinal phenomenon.
  - [x] Verified USPTO trademark and Minnesota Secretary of State registries (100% clean, zero software/tech conflicts).
  - [x] Identified target domain: `pinkcardinal.tech` ($9.99/yr).
  - [x] Generated initial visual identity explorations (geometric modern, friendly character mascot, and unicorn cardinal in flight) in [`pink_cardinal_logo_concepts.md`](file:///Users/pat/.gemini/antigravity/brain/d3d236a5-9860-4f03-8ca7-c53c19854058/pink_cardinal_logo_concepts.md).
- [x] **Git & GitHub Infrastructure:**
  - [x] Git initialized with clean `.gitignore` (excluding `node_modules`, `.next`, `.env*`).
  - [x] GitHub remote linked to `https://github.com/northstarnerd/swsportaldemo.git`.
  - [x] macOS Keychain credentials configured; end-to-end commit and push verified.
- [x] **Vercel Cloud Deployment:**
  - [x] Authenticated Vercel CLI and linked project to `patrickbadley's projects`.
  - [x] Diagnosed initial build failure via Vercel CLI events (symlink collision on `public/images`).
  - [x] Fixed symlink, added build safety flag in `next.config.mjs`, and achieved **Ready** production deployment.
- [x] **Agentic Development Pipeline:**
  - [x] Established `AGENTS.md` (invariants, PCI-DSS boundaries, layer separation).
  - [x] Established `WORKFLOW.md` (mechanism map, model allocation, context rot thresholds).
  - [x] Established `ARCHITECTURE.md` (system data flows, component taxonomy).
  - [x] Created deterministic backpressure quality gate in `scripts/verify.sh` (`npm run verify`).
  - [x] Created `scratch/` workspace for multi-session task tracking.

- [x] **Productionalization & Multi-Tenant Architecture Blueprint (Session 2026-09-14):**
  - [x] Evaluated production infrastructure stack: Next.js on Vercel ($20/mo Pro baseline, ~$20–$65/mo total stack including managed PostgreSQL/Supabase, Twilio SMS, Resend email).
  - [x] Evaluated multi-company deployment topology (5 separate repos vs. 5 separate deployments vs. Single-Repo Multi-Tenant SaaS).
  - [x] Adopted Multi-Tenant SaaS strategy: single repository, dynamic tenant branding via Next.js middleware (subdomains/custom domains), Postgres RLS for data isolation, and Stripe Connect for multi-merchant fund distribution.

- [x] **Executive Presentation & Customer Case Study Polish (Session 2026-09-14):**
  - [x] **Respectful "Complement & Enhance" Pitch Architecture:** Refactored `/pitch` to position our platform as a modern mobile front-door that complements and maximizes the ROI of SWS's core Navusoft ERP rather than adversarial replacement.
  - [x] **Jargon Elimination:** Replaced financial industry jargon ("Automated SMS Dunning") with clear, consumer-friendly terminology ("1-Click SMS Card Recovery").
  - [x] **Widescreen Slide Stage:** Expanded `/pitch` to an 1100px × 620px widescreen canvas with a fixed 420px internal stage height, completely eliminating dimensional shifts and jumping during slide navigation.
  - [x] **Case Study Modal Upgrade (`StoryComparisonModal.tsx`):**
    - [x] Softened tone to focus on the authentic resident experience without unverified assertions; labeled phone call volume as an explicit assumption.
    - [x] Accurately documented the multi-step stacked popup checkout flow ("Add Wallet" Screen 1 asks for Card Type & Name before Screen 2 asks for card numbers).
    - [x] Cropped and embedded the verified SWS resident account screenshot (`public/navusoft-modal-cropped.png`).
    - [x] Replaced overflowing horizontal slider with a clean 4-step segmented pill grid (zero mid-slide scrollbars).
    - [x] Expanded modal layout to 4XL (`max-w-4xl`, 620px height) with spacious typography.
  - [x] **The 30-Day Risk-Free Past-Due Recovery Pilot:** Established the "Option 2" pilot strategy as the primary closing hook (targeting only the ~300 declined quarterly cards with 1-click SMS recovery, carrying zero operational risk for SWS).
  - [x] **Mobile App Roadmap & Packaging:** Evaluated and documented the 1–2 week Capacitor.js native wrapper roadmap for official Apple App Store and Google Play Store listings.
  - [x] **3-Layer Telemetry Architecture:** Defined the metrics stack (PostHog/Stripe for conversion funnels, Sentry/Datadog for error tracking, and a 1-page visual executive report for SWS leadership).
  - [x] **Executive Q&A Ledger:** Created permanent living document [`executive_qa_ledger.md`](file:///Users/pat/.gemini/antigravity/brain/a37ed6ce-e10f-4b9b-8e9a-76c89141df99/executive_qa_ledger.md) to record all strategic answers, technical architectures, and success KPIs.

- [x] **Customer-First Phone Outreach Strategy & Cheat Sheet (Session 2026-09-14):**
  - [x] Formulated the "Neighbor + Active Customer on Route 4" phone strategy for calling `(952) 937-8900` to speak directly with Office Manager Susie Scott, bypassing vendor gatekeeping.
  - [x] Created one-page call cheat sheet in [`scratch/sws-phone-call-cheatsheet.md`](file:///Users/pat/code/payments/scratch/sws-phone-call-cheatsheet.md) with word-for-word gatekeeper scripts, Susie pitch, objection handlers, and immediate follow-up email template.
- [x] **Paper Mail vs. 1-Tap SMS Economic Modeling:**
  - [x] Modeled hard unit economics per $94.50 quarterly bill: Paper past-due notice costs ~$7.47–$7.73 total ($0.73 stamp, $0.35 materials, $1.25 fulfillment labor, $2.10 phone collection labor, higher MOTO CC interchange) vs. ~$3.05 for 1-Tap SMS ($0.015 Twilio text + standard CC fee, $0 extra for Apple Pay).
  - [x] Projected aggregate quarterly savings on ~300 declined cards: ~$1,320 in direct costs saved ($5,280/year) and 40 staff hours returned to front-office operations.
- [x] **The 3-Phase "Crawl, Walk, Run" Commercial Pitch Architecture:**
  - [x] **Phase 1 (The Crawl - Zero-IT Past-Due Pilot):** SWS provides a CSV of 50–100 delinquent/expired card accounts. We send 1-click Apple Pay SMS links, collect payments, deposit funds into their account, and hand Susie a clean Navusoft reconciliation sheet. Requires zero code changes on SWS website and zero IT effort.
  - [x] **Phase 2 (The Walk - Parallel Soft-Launch):** Deploy side-by-side with a *"✨ Try Our New Mobile Portal (Beta / 1-Tap Apple Pay)"* button on `suburbanwaste.com`. Legacy Navusoft portal remains 100% active, eliminating cutover risk, site downtime, and customer disruption.
  - [x] **Phase 3 (The Run - Full Operating Layer):** Living calendar sync (.ics), self-service bulky item scheduling, automated holiday pickup texts, and native iOS/Android App Store listings via Capacitor.js.

- [x] **On-Demand SMS Recovery Pipeline & Mobile Payment Flow (Session 2026-09-15):**
  - [x] Implemented [`src/app/api/sms/send-recovery/route.ts`](file:///Users/pat/code/payments/src/app/api/sms/send-recovery/route.ts) supporting both live cellular SMS via Twilio Messages API and graceful zero-dependency simulated mode.
  - [x] Created stateless `base64url` token generation enabling robust `/pay/[token]` URLs without database dependencies.
  - [x] Built standalone mobile-first payment landing page at [`src/app/pay/[token]/page.tsx`](file:///Users/pat/code/payments/src/app/pay/[token]/page.tsx) and [`src/app/pay/page.tsx`](file:///Users/pat/code/payments/src/app/pay/page.tsx) using [`MobilePayView.tsx`](file:///Users/pat/code/payments/src/components/MobilePayView.tsx).
  - [x] Integrated Stripe Elements (`StripeLivePayment`) for native 1-tap Apple Pay / Google Pay sheets alongside 1-click test card autofill (`4242...`) and simulated wallet fallback.
  - [x] Built interactive [`SmsTriggerModal.tsx`](file:///Users/pat/code/payments/src/components/SmsTriggerModal.tsx) and added `[ 📲 Send Live SMS ]` action to [`DemoToolbar.tsx`](file:///Users/pat/code/payments/src/components/DemoToolbar.tsx) for instant on-demand text dispatch.
  - [x] Updated `.env.example` with optional Twilio configuration variables (`TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`).

- [x] **SWS Initial Call & Voicemail Status (Session 2026-09-16):**
  - [x] Executed front-office outreach to Suburban Waste Services at `(952) 937-8900`.
  - [x] Successfully reached Susie Scott's direct office voicemail; delivered the neighbor-first voicemail anchoring on **Promontory Drive in Eden Prairie** and highlighting paper bill & phone call reduction.
  - [x] Established live **"When Susie Calls Back"** protocol in [`scratch/sws-phone-call-cheatsheet.md`](file:///Users/pat/code/payments/scratch/sws-phone-call-cheatsheet.md) and artifact [`sws_call_cheat_sheet.md`](file:///Users/pat/.gemini/antigravity/brain/a4cb826c-f783-4d96-87c2-9a2497cac801/sws_call_cheat_sheet.md).
  - [x] Defined 24–48 hour follow-up cadence (targeted follow-up window: Thursday afternoon / Friday morning).

- [x] **Susie Scott Inbound Callback & In-Person Meeting Breakthrough (Session 2026-09-21):**
  - [x] **Inbound Call Received:** Susie Scott called Patrick back directly from SWS front office `(952) 937-8900`.
  - [x] **Operational Intel Gathered:** SWS is currently struggling through its Navusoft customer portal transition, receiving widespread customer complaints about login failures, working with another waste industry software firm, and experiencing acute apprehension toward major software changes.
  - [x] **Positioning & Next Step:** Patrick framed his skill set around low-friction problem solving without a software overhaul; Susie agreed to an in-person meeting in Savage, MN and took Patrick's email to coordinate availability for this week or next.
  - [x] **Two-Track Commercial & Partnership Architecture:**
    - **Track A (Product / Vertical SaaS):** Patrick owns 100% of the software product (1-tap SMS past-due pilot + Express Pay by phone # on `suburbanwastemn.com`) targeting SWS as the live flagship pilot.
    - **Track B (Advisory / Faris Consulting):** If SWS requests broader vendor oversight or architecture advisory to manage the other waste vendor, Patrick will partner with Jared Faris (Faris Consulting) under the established 85/15 model. Patrick leads the in-person relationship solo in Savage, with a warm handoff to a joint Zoom call with Jared for commercial scoping.
  - [x] Created two-part executive playbook in artifact [`jared_and_susie_meeting_playbook.md`](file:///Users/pat/.gemini/antigravity/brain/a4cb826c-f783-4d96-87c2-9a2497cac801/jared_and_susie_meeting_playbook.md) and on disk at [`scratch/jared_and_susie_meeting_playbook.md`](file:///Users/pat/code/payments/scratch/jared_and_susie_meeting_playbook.md).

---

### Pending / Active Backlog
- [ ] **Multi-Tenant SaaS Foundation:**
  - [ ] Next.js middleware for tenant/subdomain resolution (`tenant.portal.com` -> tenant context).
  - [ ] Relational schema design (PostgreSQL / Supabase) with `company_id` scoping and RLS to replace static `lib/mockData.ts`.
  - [ ] Stripe Connect architecture (Connected Accounts) for per-company merchant payouts.
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

* **Multi-Tenant SaaS over Multi-Repo/Multi-Deployment:** Standardize on a single codebase with dynamic tenant resolution via Next.js middleware (custom domains/subdomains), Postgres RLS, and Stripe Connect. This avoids the exponential maintenance overhead and sync drift of managing 5+ separate repositories or deployment instances.
* **Vercel + Managed Postgres Production Footprint:** Production hosting baseline on Vercel Pro ($20/mo) coupled with serverless PostgreSQL (Supabase/Neon) and transactional communications (Twilio/Resend) keeps total platform fixed overhead under $65/mo.
* **Hybrid Payment Architecture:** The checkout modal automatically tests if active Stripe keys and a browser wallet (Google Pay/Apple Pay) are present. If present, it executes live tokenization. If absent, it gracefully falls back to an interactive demo flow with zero crashes or error alerts.
* **PCI-DSS Level 1 Isolation:** Zero cardholder data (PAN, CVV) touches our Next.js backend. All card entry is delegated to Stripe Elements or browser digital wallets.
* **Typography & UI Invariants:** Minimum 12px (`text-xs font-bold`) for secondary metadata, 14px (`text-sm`) for body/actions, 16px (`text-base`) for inputs, and no arbitrary micro-fonts.
* **"Crawl, Walk, Run" Commercial Staging:** Never lead with an aggressive hard cutover of their existing customer portal or ERP. Lead with a zero-IT past-due recovery pilot (CSV export -> SMS Apple Pay), follow with a parallel soft-launch ("✨ Try Our New Mobile Portal" button side-by-side on `suburbanwaste.com`), and scale into full self-service operations (bulky items, calendar sync).
* **Paper Mail Reduction as Primary Economic Hook:** Position the ROI on eliminating physical postage, paper notices, and manual phone payments ($7.50+ total cost per delinquent bill vs. $3.05 with SMS) rather than abstract "digital transformation."
* **Disk-Backed State Machine:** State is tracked in `STATE.md` and `scratch/task-NNN/`. Incoming sessions resume from disk state rather than asking the human to rebuild context.

---

## ⏭️ Immediate Next Actions for Incoming Sessions

1. Read [`AGENTS.md`](file:///Users/pat/code/payments/AGENTS.md) for workspace invariants and PCI-DSS rules.
2. Review [`STATE.md`](file:///Users/pat/code/payments/STATE.md) (this file) to locate active tasks.
3. If beginning a multi-step feature, create a task scratchpad: `scratch/task-NNN/01-plan.md`.
4. Run `npm run verify` before committing.
5. Update this ledger and commit to Git upon task completion.

