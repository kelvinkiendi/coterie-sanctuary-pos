# COTERIE Sanctuary POS — Backend System

**Stack:** PostgreSQL · Supabase Edge Functions · MPesa Daraja API · JWT/RBAC

Production-grade backend for COTERIE Nail Sanctuary, a premium nail studio in Kilimani, 
Nairobi. This system handles client management, appointment scheduling, payment processing 
via MPesa, staff operations, and tiered membership enrollment.

---

## 🏗 Architecture Overview

---

## 📊 Database Design

See [`docs/database-schema.md`](docs/database-schema.md) for full ER diagram and table definitions.

## 🔌 API Specification

See [`docs/api-endpoints.md`](docs/api-endpoints.md) for complete endpoint documentation.

## 🏛 System Architecture

See [`docs/architecture.md`](docs/architecture.md) for auth flow, payment lifecycle, and RBAC design.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Database | PostgreSQL 15+ (Supabase) |
| Serverless API | Supabase Edge Functions (Deno/TypeScript) |
| Authentication | Supabase Auth (JWT + custom role claims) |
| Payments | Safaricom Daraja API v2 |
| Migrations | Supabase CLI |
| Deployment | Supabase Cloud |

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/kelvinkiendi/-coterie-sanctuary-pos.git

# Install Supabase CLI
npm install -g supabase

# Link to project
supabase link --project-ref nahnjpdydgzmfuwfhfzn

# Run migrations
supabase db reset


# Serve edge functions locally
supabase functions serve
