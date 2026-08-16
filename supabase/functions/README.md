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
