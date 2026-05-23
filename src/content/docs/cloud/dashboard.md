---
title: Dashboard
description: Jobs, Activity, Workers, and remote commands in the Cloud app.
---

Once agents are connected, [app.deckapp.cloud](https://app.deckapp.cloud) gives you a unified view across every linked Laravel app. Filter by project and environment to focus on one deployable at a time.

## Pages

| Page | Purpose |
| --- | --- |
| Dashboard | Overview metrics, recent failures, and job volume charts |
| Jobs | Per-class stats, history, block/unblock, and correlation views |
| Activity | Searchable execution log with cancel and retry actions |
| Workers | Live worker snapshots and queue workload from all agents |

## Settings

| Settings page | Purpose |
| --- | --- |
| Installation | Step-by-step agent setup, env snippet, and connection status |
| Projects | Manage project and environment slugs |
| API keys | Create and revoke agent tokens |
| Team | Invite teammates and manage roles |
| Alerts | Cloud-side alert configuration |
| Billing | Subscription and billing portal |
| Account | Profile and security |

## Remote commands

Actions you take in Cloud — cancel a running job, block a class, cancel pending jobs — are queued as commands and delivered to the matching agent on its next poll. The agent executes them using the same Redis-backed primitives as the local `/deck` dashboard.

Command types include cooperative cancel, force cancel, cancel pending, block class, unblock class, and cancel all running for a class. See [Agent API](/cloud/agent-api/) for the wire protocol.
