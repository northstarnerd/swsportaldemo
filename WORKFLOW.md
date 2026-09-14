# WORKFLOW.md — Human–Agent Operating Manual

> This is the operational mechanism map for the `payments` repository. It defines:
> - Which mechanism handles which concern.
> - Model allocation by task complexity.
> - Context window management and rotation thresholds.
> - Explicit human decision gates.

---

## 1. Mechanism Map

| Mechanism | Purpose | Lifecycle / When Loaded |
|---|---|---|
| **`AGENTS.md`** | Invariants — rules, tech stack standards, and PCI security boundaries that apply every session | Always active |
| **`STATE.md`** | Active session ledger — completed milestones, open tasks, and handoff pointers | Read at start of every session; updated at end |
| **`WORKFLOW.md`** | Operational patterns — how to work, model selection, context rot rules | Loaded on demand when establishing session cadence |
| **`ARCHITECTURE.md`** | Living system architecture, payment data flow, and component taxonomy | Loaded on demand during architectural changes |
| **`scripts/verify.sh`** | Deterministic quality gate (`npm run verify`) | Executed before declaring any task complete |
| **`scratch/task-NNN/`** | Multi-session task state — structured logs that survive context resets | Read and updated during multi-step work |

---

## 2. Model Selection Guide

Pay for judgment upstream; use mid-tier or lighter horsepower for execution and grinding.

| Task Type | Model Tier | Rationale |
|---|---|---|
| **Architecture & Security Design** (Payment flows, auth boundary, webhook integrity) | **Pro / Opus** | Judgment call — subtle security or architectural errors are silently dangerous. |
| **Feature Implementation** (Next.js API routes, UI components, Framer Motion) | **Inherit / Sonnet** | Execution against an approved spec. Mid-tier excels at clean React/TypeScript code. |
| **Code Review & Verification Audit** (Checking worker diffs, verifying PCI compliance) | **Pro / Opus** | Finding subtle edge cases, race conditions, or unhandled errors. |
| **Boilerplate & Mechanical Grunt Work** (Grep, file listing, type fixes, script wrapping) | **Flash / Small** | Bounded, deterministic output; no high-level synthesis needed. |

> **The Golden Rule:** A detailed plan with concrete examples and verify commands allows a mid-tier model to execute flawlessly. If the output contract is ambiguous or failure modes are silent, pay for the larger model.

---

## 3. Context Rot & Window Rotation

### The Core Research Finding (HumanLayer & Andrej)
> *"Instruction following degrades predictably around ~30% capacity or ~60k–100k tokens absolute. More context is not more capability—the instruction budget does not scale linearly with the token window."*

### Practical Thresholds
| Context Footprint | % of 200k Window | Action Required |
|---|---|---|
| **~60,000 tokens** | ~30% | ⚠️ Plan session rotation; write intermediate notes to `scratch/`. |
| **~100,000 tokens** | ~50% | ⛔ **Rotate immediately** — compact context and start a fresh session. |
| **100k+ tokens** | > 50% | High risk of hallucination and instruction drift. Do not push through. |

### Natural Breakpoints for Fresh Sessions
1. **Design Approved:** Write `scratch/task-NNN/01-plan.md` → Rotate.
2. **Implementation Complete:** Write `scratch/task-NNN/02-impl.md` → Rotate.
3. **Verification Passed:** Write `scratch/task-NNN/03-verify.md` → Update `STATE.md` → Commit.

### Seamless Handoff Protocol
1. Before closing a session, write the handoff status to `STATE.md` or `scratch/task-NNN/XX-handoff.md`.
2. Commit all staged work to Git so the working tree is clean.
3. Start the next session with:
   > *"Read `STATE.md` and `scratch/task-NNN/`. Resume from the first unchecked box."*

---

## 4. Human Decision Gates

AI agents propose and execute; humans evaluate and approve. Never skip these gates:

```
Task Identified
      │
      ▼
[GATE 1: Plan Review] ────────▶ Human approves plan artifact before code is modified
      │
      ▼
Agent Implements
      │
      ▼
[GATE 2: Quality Gate] ───────▶ Agent runs `npm run verify` (zero errors allowed)
      │
      ▼
[GATE 3: Diff & Push] ────────▶ Human reviews git diff; changes pushed to Vercel production
```

1. **Gate 1 (Plan Review):** Stop before making source changes on any non-trivial task. Provide an implementation plan.
2. **Gate 2 (Verification):** Run `npm run verify` deterministically. Never accept self-reported completion without command proof.
3. **Gate 3 (Diff Review):** Review `git diff` before pushing to `main`, keeping production at [swsportaldemo.vercel.app](https://swsportaldemo.vercel.app) protected.

---

## 5. Session Startup Checklist

At the beginning of every session:
- [ ] Read [`STATE.md`](file:///Users/pat/code/payments/STATE.md) to identify active tasks and recent decisions.
- [ ] Check `scratch/` for in-flight task directories (`scratch/task-NNN/`).
- [ ] Run `git status` to ensure you are starting from a clean, known Git baseline.
- [ ] State your target milestone and model choice explicitly before writing code.
