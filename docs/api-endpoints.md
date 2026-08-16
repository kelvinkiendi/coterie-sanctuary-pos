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
  ],
 "count": 150
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
}GET /staff/:id/performance
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


