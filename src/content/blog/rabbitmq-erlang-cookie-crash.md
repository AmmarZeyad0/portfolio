---
title: Why RabbitMQ crashed on first start (and the healthcheck that caused it)
description: A root-run healthcheck created the Erlang cookie before RabbitMQ could read it. Here's what happened and how a simple port check fixed it.
date: 2026-11-01
tags: [docker, rabbitmq, debugging]
---

> ✏️ **Draft from my CV notes.** Add your own logs, the exact compose snippet and what you tried first.

While moving my [Ticket Booking Platform](/projects/ticket-booking-platform) from plain `docker run` to Docker Compose, RabbitMQ kept crashing the very first time the stack came up.

## The symptom

On a fresh start, the RabbitMQ container crashed.

## The cause

The healthcheck I'd added ran **as root**, and on first start it created the **Erlang cookie** before RabbitMQ could read it. So RabbitMQ crashed.

## The fix

I replaced the CLI-based healthcheck with a simple **port check**, so the healthcheck no longer creates any files:

```yaml
# TODO: paste the final healthcheck from your docker-compose.yml here
```

## What I learned

- Healthchecks run real commands inside your container, and they can have side effects.
- Watch which **user** a command runs as, especially on first start when files are being created.
- The simplest check that answers "is it ready?" is usually the safest.
