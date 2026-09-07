# Suburban Waste Services – Customer Portal POC

Modern, mobile-first customer self-service portal and 1-tap bill payment proof-of-concept for **Suburban Waste Services (SWS)** in Eden Prairie, MN.

## Features

- **1-Tap Bill Payment**:
  - Native **Google Pay** and **Apple Pay** support via Stripe Payment Request API.
  - Interactive test simulation mode with instant receipt clearing & celebration confetti.
  - Credit/Debit card support with one-click test card autofill.
- **Service Management**:
  - Live route schedule and next service date tracker.
  - Container request & manager modal (trash, recycling, yard waste).
  - Extra service request modal (bulky item pickup, cart repairs).
  - Calendar sync (.ics export) for garbage & recycling pickup reminders.
- **Account Recovery**:
  - Phone / SMS passwordless access flow.
- **Pitch Decks**:
  - Embedded executive and strategic pitch decks for operational transition and market expansion.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Lucide Icons
- **Animation**: Framer Motion & Canvas Confetti
- **Payments**: Stripe (`@stripe/stripe-js`, `@stripe/react-stripe-js`, `stripe`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portal.

## Deployment

Deployable to [Vercel](https://vercel.com) with zero additional configuration.
