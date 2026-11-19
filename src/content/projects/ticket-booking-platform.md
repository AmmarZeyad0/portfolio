---
title: Ticket Booking Platform
summary: An event-driven booking system with three FastAPI services and two Python workers, containerised end to end and on its way to CI/CD, Kubernetes and Terraform on AWS.
period: Oct 2026 – present
status: in-progress
order: 1
featured: true
stack: [FastAPI, Python, PostgreSQL, Redis, RabbitMQ, Docker, Docker Compose]
tags: [docker, devops, python]
---

Part of a structured DevOps mentorship. The plan takes this platform through containers → CI/CD → Kubernetes → Terraform on AWS.

## Architecture

Three FastAPI services and two Python workers, backed by **PostgreSQL**, **Redis** and **RabbitMQ**.

## What I've done so far

- **Dockerfiles for all five services** on a pinned `python:3.14-slim` base. Dependencies install before the code is copied, for layer caching, and each app runs as a **non-root user**.
- **Ran the whole stack with plain `docker run`** first: a user-defined network, a Postgres init script and a named volume. Then I moved it to **Docker Compose** with healthchecks, health-based start order and an `.env` file.
- **Fixed a RabbitMQ crash on first start.** A healthcheck running as root created the Erlang cookie before RabbitMQ could read it. I replaced it with a port check. ([Write-up](/blog/rabbitmq-erlang-cookie-crash))
- **Tested** that bookings reach `CONFIRMED` and that data survives `docker compose down` and `up`.
- **Documented every Dockerfile line and compose field** for review.

## Next

- CI/CD pipeline
- Kubernetes
- Terraform on AWS
