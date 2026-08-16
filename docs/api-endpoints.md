
# COTERIE POS — API Endpoint Specification

## Base URL

## Authentication
All endpoints require a Bearer token in the `Authorization` header:

---

## 🔐 Auth Endpoints

### Get User Role Claims
**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "user_id": "uuid",
  "role": "technician",
  "permissions": ["read:appointments", "update:own-appointments"]
}
GET /clients
{
  "data": [
    {
      "id": "uuid",
      "full_name": "Jane Doe",
      "phone_number": "254712345678",
      "membership_tier": "founder_circle"
    }
POST /clients
{
  "full_name": "Jane Doe",
  "phone_number": "254712345678",
  "email": "jane@example.com"
}
POST /appointments
{
  "client_id": "uuid",
  "service_id": "uuid",
  "staff_id": "uuid",
  "appointment_date": "2026-08-15",
  "start_time": "14:00:00"
}
PATCH /appointments/:id
{
  "status": "completed"
}
POST /mpesa-stk-push
{
  "phone_number": "254712345678",
  "amount": 25000,
  "account_reference": "COTERIE-FC-001",
  "transaction_description": "Founder Circle Enrollment"
}
{
  "checkout_request_id": "ws_CO_123456789",
  "response_code": "0",
  "response_description": "Success. Request accepted for processing"
}
POST /payment-callback
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "12345",
      "CheckoutRequestID": "ws_CO_123456789",
      "ResultCode": 0,
      "ResultDesc": "The service request is processed successfully.",
      "CallbackMetadata": {
        "Item": [
          {"Name": "Amount", "Value": 25000},
          {"Name": "MpesaReceiptNumber", "Value": "MK1234ABC"},
          {"Name": "TransactionDate", "Value": "20260810120000"},
          {"Name": "PhoneNumber", "Value": "254712345678"}
        ]
      }
    }
  }
}
POST /staff/:id/clock-in
{
  "timestamp": "2026-08-10T08:00:00Z"
}
GET /staff/:id/performance
{
  "appointments_completed": 45,
  "total_revenue_kes": 135000,
  "commission_earned_kes": 13500
}
GET /inventory
PATCH /inventory/:id
{
  "quantity": 25,
  "unit_cost": 450.00
}

---

### FILE: `docs/architecture.md`

**Paste this into:** `coterie-sanctuary-pos/docs/architecture.md`

```markdown
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
  ],
  "count": 150
}
