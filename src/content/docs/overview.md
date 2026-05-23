---
title: Overview
description: The Deck ecosystem — package, Cloud, and how they fit together.
---

Deck has two products that work together: an open-source **package** (`deck/deck`) you install in each Laravel app, and an optional hosted **Cloud dashboard** at [app.deckapp.cloud](https://app.deckapp.cloud). Documentation is split the same way.

## Three URLs

| URL | What it is |
| --- | --- |
| [deckapp.cloud](https://deckapp.cloud) | Marketing site and documentation (you are here) |
| [app.deckapp.cloud](https://app.deckapp.cloud) | Hosted Cloud dashboard — sign in, manage teams, view all apps |
| `/deck` | Self-hosted dashboard inside each Laravel app (from the package) |

## How they connect

```text
  Your Laravel apps                    Deck Cloud (hosted)
  ┌─────────────────────┐              ┌──────────────────────┐
  │ deck/deck package   │── events ──► │ app.deckapp.cloud    │
  │ /deck dashboard     │◄─ commands ──│ Jobs · Activity ·    │
  │ Horizon + Redis     │              │ Workers · Settings   │
  └─────────────────────┘              └──────────────────────┘
```

Horizon and Redis stay on your infrastructure. The package records every job locally. Cloud is optional — add an API key when you want a unified view across many apps.

## Which docs to read

| Goal | Start here |
| --- | --- |
| Install Deck in one Laravel app | [Package → Getting Started](/package/getting-started/) |
| Understand Deck vs Horizon | [Package → Horizon & Deck](/package/horizon/) |
| Sign up for Cloud and connect apps | [Deck Cloud → Getting Started](/cloud/getting-started/) |
| Configure the Cloud agent in `.env` | [Deck Cloud → Connecting Agents](/cloud/connecting-agents/) |

## Package documentation

The open-source `deck/deck` package — install in each Laravel app for local `/deck` observability and queue controls.

- [Getting Started](/package/getting-started/) — install in three commands
- [Horizon & Deck](/package/horizon/) — how Deck complements Horizon
- [Usage](/package/usage/) — dashboard, cancel, block, retry
- [Production](/package/production/) — retention, Redis, security
- [Configuration](/package/configuration/) — environment variables

## Deck Cloud documentation

The hosted dashboard at [app.deckapp.cloud](https://app.deckapp.cloud) — one pane of glass across every connected app.

- [Introduction](/cloud/introduction/) — what Cloud is and how it fits
- [Getting Started](/cloud/getting-started/) — waitlist, team setup, API keys
- [Dashboard](/cloud/dashboard/) — Jobs, Activity, Workers, remote commands
- [Connecting Agents](/cloud/connecting-agents/) — wire each Laravel app to Cloud
- [Agent API](/cloud/agent-api/) — ingest endpoints and command polling
