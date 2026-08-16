# COTERIE POS — System Architecture

## 1. Authentication Flow

**Process:**
1. User submits email/password to Supabase Auth
2. Supabase validates and returns JWT
3. Edge function `/auth/role-claim` queries `staff` table for role
4. Role is embedded as custom claim in JWT
5. Frontend stores token; all subsequent requests include it

---

## 2. MPesa Payment Lifecycle

**Idempotency Handling:**
- Each STK push request generates a unique `idempotency_key`
- Before processing callback, system checks if `checkout_request_id` exists
- Duplicate callbacks are logged and ignored

---

## 3. Role-Based Access Control (RBAC)

| Role | Permissions |
|------|-------------|
| **owner** | Full system access, financial reports, staff management |
| **admin** | Client management, appointment scheduling, payment reconciliation |
| **technician** | View own appointments, update appointment status, view own commissions |
| **receptionist** | Create clients, book appointments, process walk-in payments |

**Implementation:**
- PostgreSQL RLS policies check `auth.jwt() ->> 'role'` against table policies
- Edge functions validate role before executing business logic
- Frontend routes are conditionally rendered based on role claim

---

## 4. Automated Workflows

| Trigger | Action |
|---------|--------|
| Payment confirmed | Deduct products from inventory |
| Payment confirmed | Calculate and log staff commission |
| Inventory below reorder_level | Flag for restocking |
| Client reaches 3 paid visits | Auto-upgrade to "loyal" tier |
| Founder Circle payment confirmed | Activate 6-month membership countdown |

---

## 5. Security Measures

- **RLS:** All tables have Row Level Security enabled
- **Input Validation:** All Edge Functions validate request body with Zod schemas
- **Rate Limiting:** MPesa endpoints limited to 10 requests/minute per phone
- **Audit Trail:** All payment transactions logged with timestamps and IP addresses
- 
