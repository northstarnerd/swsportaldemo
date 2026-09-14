# AGENTS.md — Workspace Guidelines & Operating System

> **Workplace Philosophy:** Build an agent workplace, not a prompt library. Judgment stays human, state lives on disk, context loads only when needed, and dangerous actions are harness-gated. Models and IDEs will churn; this operating system will not.

---

## 1. System & Architecture Standards

### Tech Stack Invariants
* **Framework:** Next.js 14 with App Router (`src/app/`).
* **Language:** TypeScript with strict mode enabled (`tsconfig.json`). Zero `any` types allowed—use `unknown`, strict type guards, and discriminated unions.
* **Styling & Icons:** Tailwind CSS (`tailwind.config.js`) + Lucide React (`lucide-react`).
* **Deployment:** Vercel serverless platform connected to `main` on GitHub (`northstarnerd/swsportaldemo`). Every push to `main` triggers an automatic production build.

### Layer Boundaries
Always respect strict architectural separation between layers:

```
┌────────────────────────────────────────────────────────┐
│                   Client UI Layer                      │
│   (src/app/page.tsx, src/components/*, "use client")   │
│   - Pure UI presentation, Framer Motion, confetti      │
│   - Stripe Elements & PaymentRequestButtonElement      │
│   - Zero server secrets; only NEXT_PUBLIC_* variables  │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP POST (JSON)
┌───────────────────────────▼────────────────────────────┐
│               Serverless API Route Layer               │
│        (src/app/api/create-payment-intent/route.ts)    │
│   - Node runtime on Vercel edge/serverless             │
│   - Safe Stripe SDK initialization (`stripe`)          │
│   - Owns STRIPE_SECRET_KEY; never leaks secrets        │
└───────────────────────────┬────────────────────────────┘
                            │ API Calls
┌───────────────────────────▼────────────────────────────┐
│               External Service Gateways                │
│     - Stripe API (PaymentIntents, Webhooks, Payouts)   │
│     - NavuSoft ERP / Billing APIs (Future phase)       │
└────────────────────────────────────────────────────────┘
```

---

## 2. Payments & Security Boundary (PCI-DSS Invariants)

Payment handling must follow non-negotiable security boundaries:

1. **Zero Raw PAN Ingestion:**
   * Raw primary account numbers (PANs) and CVVs must **NEVER** touch our serverless handlers or backend logs.
   * All card capture on the client must be performed by Stripe Elements or browser native payment sheets (Google Pay / Apple Pay).
2. **Environment Variable Separation:**
   * `STRIPE_SECRET_KEY`: Server-side only. Must **never** be prefixed with `NEXT_PUBLIC_` or imported in `"use client"` components.
   * `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Client-side publishable key for initializing Stripe.js.
3. **Graceful Fallback / Demo Continuity:**
   * The application must function flawlessly in **high-fidelity interactive demo mode** even if Stripe keys are missing or placeholder (`sk_test_placeholder`).
   * If a user's browser lacks an active Google Wallet or Apple Pay card, the modal must provide clear feedback and allow clicking through the simulated 1-tap experience.

---

## 3. Artifact Taxonomy & Storage Rules

```
AGENTS.md          ← Workspace invariants & operating rules (always active)
WORKFLOW.md        ← Human-Agent operational playbook (on demand)
ARCHITECTURE.md    ← Living system architecture & domain diagrams (on demand)
STATE.md           ← Active session ledger & single source of truth (always read on resume)
scripts/verify.sh  ← Deterministic quality gate (executed before completion)
scratch/           ← Task-specific multi-session logs (scratch/task-NNN/)
```

### Flow of Truth (Precedence Rule)
* **Code & Types (`src/`)** reflect the executable reality.
* **`ARCHITECTURE.md`** reflects the current system design and planned domain expansions.
* **`STATE.md`** reflects the active work status, open tasks, recent decisions, and immediate next steps.
* **Rule:** If code changes alter the architecture or task status, the corresponding documentation must be updated in the same Git commit.

---

## 4. Quality Gates & Verification

### Before Marking ANY Task Complete
Never declare a task complete without running the deterministic quality gate:

```bash
npm run verify
```

`scripts/verify.sh` deterministically enforces:
1. `npx tsc --noEmit` — Zero TypeScript compilation or type errors.
2. `npm run build` — Successful Next.js production build with clean static page generation and serverless tracing.

If `npm run verify` fails, the task is **not** done. Fix all issues before requesting review or committing.

---

## 5. Git Hygiene & Continuous Deployment

* **Commit Format:** `<type>(<scope>): <description>`
  * Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `chore`, `test`
  * Example: `feat(payments): add Stripe PaymentRequest 1-tap Google Pay support`
* **Clean Working Tree:** Never leave uncommitted scratch files or broken states.
* **Vercel CD Awareness:** Pushing to `main` instantly updates the live production site at [swsportaldemo.vercel.app](https://swsportaldemo.vercel.app). Ensure all assets are non-symlinked and builds are verified before pushing.

---

## 6. Human–Agent Contract

### Ownership Split
> **You (Human) own:** Intent, architectural approval, and merge/deploy decisions.
> **The Agent owns:** Exploration, implementation, and rigorous verification.

### RPI: Review Plan before Implementation
For non-trivial changes:
1. Produce an implementation plan artifact.
2. Stop and obtain human review.
3. Implement strictly against the approved plan.
4. Execute `npm run verify` yourself to prove the build passes.

### Anti-Patterns (Immediate Rejection)
* **Rubber-stamping:** Reporting "build succeeded" without actually executing `npm run verify`.
* **Sycophancy:** Reverting valid security/architectural boundaries without evidence when challenged.
* **State Amnesia:** Finishing a session without updating `STATE.md` or leaving context purely in conversational memory.
* **Token Bloat:** Ingesting large files or whole directories when a targeted file search suffices.
