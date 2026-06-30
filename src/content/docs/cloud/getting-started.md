---
title: Getting Started
description: Get early access, create your Cloud team, and set up projects and API keys.
---

Deck Cloud is in early access. You need a Cloud account and API key before connecting Laravel apps. The package must already be installed in each app — see [Package → Getting Started](/package/getting-started/) first.

## Getting access

[Get early access](https://deckapp.cloud/#waitlist) on the homepage. When your spot opens, you receive an invitation email to create a team at [app.deckapp.cloud](https://app.deckapp.cloud).

Already invited? Sign in and complete onboarding — Cloud walks you through the first project and environment.

## Workspace setup

Each Cloud team maps to one billing account. Inside a team you define:

| Resource | Maps to |
| --- | --- |
| Project | `DECK_PROJECT` on each agent — e.g. `billing-api` |
| Environment | `DECK_ENVIRONMENT` on each agent — e.g. `production`, `staging` |
| API key | `DECK_API_KEY` — one token per agent or shared across apps in the same team |

Create these under **Settings → Installation** or **Settings → Projects**. Slugs must match exactly what you set in each app's `.env`.

## API keys

Generate keys at **Settings → API keys**. The plain token is shown **once** at creation — copy it into `DECK_API_KEY` on the agent immediately. Revoke and rotate keys from the same page if compromised.

## Team and billing

Invite teammates at **Settings → Team**. Manage subscription and invoices at **Settings → Billing**. Every team starts on a 7-day free trial — you keep full access during the trial and are only charged once it ends. Add a payment method under **Settings → Billing** before the trial expires to keep Cloud features active.

## Connect your apps

With project, environment, and API key ready, add the agent variables to each Laravel app — [Connecting Agents](/cloud/connecting-agents/).
