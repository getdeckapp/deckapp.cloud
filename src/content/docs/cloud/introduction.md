---
title: Introduction
description: One operations dashboard for every Laravel app — without replacing Horizon.
---

**One operations dashboard for every Laravel app — without replacing Horizon or moving your queues.**

Horizon and Redis stay on your infrastructure. The `deck/deck` package is the **agent**; [Deck Cloud](https://app.deckapp.cloud) is where operators manage many services.

## What you get

| On each app (package) | On Deck Cloud (hosted) |
| --- | --- |
| `/deck` for local history and incidents | **One URL** for every project and environment |
| Horizon for workers and throughput | Worker snapshots and queue workload |
| Cancel/block flags in **your** Redis | **Remote commands** — cancel, block, drain |
| Per-app alerts and search | Cross-app signals (roadmap) |

## How it works

```text
  billing-api (prod) ──┐
  billing-api (staging)├──► Deck Cloud  ◄── you
  notifications (prod)─┘         ▲
                                 │ HTTPS (API key)
  Each app: deck/deck ───────────┘   workers · commands · events
  Each app: Horizon / Redis (unchanged)
```

1. Install [`deck/deck`](/package/getting-started/) in each Laravel app.
2. Create a Cloud team, project, environment, and API key — [Getting Started](/cloud/getting-started/).
3. Add the agent env vars to each app — [Connecting Agents](/cloud/connecting-agents/).
4. Open Cloud, filter by project and environment, and act on queues from one place.

The in-app `/deck` dashboard shows a **Cloud connection** indicator when linked. Remote commands use the same primitives as local operations: cooperative cancel, block class, cancel pending, and more.

## Next steps

- [Getting Started](/cloud/getting-started/) — waitlist, workspace, and API keys
- [Dashboard](/cloud/dashboard/) — Cloud pages and remote commands
- [Connecting Agents](/cloud/connecting-agents/) — `.env` configuration
- [Agent API](/cloud/agent-api/) — wire protocol reference
