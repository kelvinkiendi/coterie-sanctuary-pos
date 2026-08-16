
# Supabase Edge Functions

## Function List

| Function | File | Purpose |
|----------|------|---------|
| `mpesa-stk-push` | `mpesa-stk-push/index.ts` | Initiates STK push to client phone |
| `payment-callback` | `payment-callback/index.ts` | Handles Daraja payment confirmation |
| `auth-role-claim` | `auth-role-claim/index.ts` | Returns user role from staff table |

## Local Development

```bash
supabase functions serve
supabase functions deploy mpesa-stk-push
supabase functions deploy payment-callback
supabase functions deploy auth-role-claim


---

### FILE: `.env.example`

**Paste this into:** `coterie-sanctuary-pos/.env.example`

```bash
# Supabase
SUPABASE_URL=https://nahnjpdydgzmfuwfhfzn.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# MPesa Daraja API
MPESA_CONSUMER_KEY=your-consumer-key
MPESA_CONSUMER_SECRET=your-consumer-secret
MPESA_PASSKEY=your-passkey
MPESA_SHORTCODE=your-shortcode
MPESA_ENVIRONMENT=sandbox

# App
COTERIE_BUSINESS_SHORTCODE=COTERIE
