# COTERIE POS — Database Schema

## Entity Relationship Overview

---

## Tables

### `clients`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() |
| full_name | VARCHAR(100) | NOT NULL |
| phone_number | VARCHAR(15) | UNIQUE, NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| membership_tier | VARCHAR(50) | DEFAULT 'standard' |
| created_at | TIMESTAMPTZ | DEFAULT now() |
| updated_at | TIMESTAMPTZ | DEFAULT now() |

### `services`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| name | VARCHAR(100) | NOT NULL |
| category | VARCHAR(50) | NOT NULL (manicure, pedicure, addon) |
| duration_minutes | INTEGER | NOT NULL |
| price_kes | DECIMAL(10,2) | NOT NULL |
| is_active | BOOLEAN | DEFAULT true |

### `appointments`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| client_id | UUID | FOREIGN KEY → clients(id) |
| service_id | UUID | FOREIGN KEY → services(id) |
| staff_id | UUID | FOREIGN KEY → staff(id) |
| appointment_date | DATE | NOT NULL |
| start_time | TIME | NOT NULL |
| status | VARCHAR(20) | DEFAULT 'scheduled' |
| notes | TEXT | |

### `payments`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| appointment_id | UUID | FOREIGN KEY → appointments(id) |
| amount_kes | DECIMAL(10,2) | NOT NULL |
| mpesa_receipt | VARCHAR(50) | UNIQUE |
| payment_status | VARCHAR(20) | DEFAULT 'pending' |
| transaction_type | VARCHAR(20) | 'stk_push' or 'c2b' |
| checkout_request_id | VARCHAR(100) | |
| created_at | TIMESTAMPTZ | DEFAULT now() |

### `staff`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| full_name | VARCHAR(100) | NOT NULL |
| role | VARCHAR(20) | NOT NULL (owner, admin, technician, receptionist) |
| phone_number | VARCHAR(15) | UNIQUE |
| commission_rate | DECIMAL(5,2) | DEFAULT 0.00 |
| is_active | BOOLEAN | DEFAULT true |

### `inventory`
| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | PRIMARY KEY |
| product_name | VARCHAR(100) | NOT NULL |
| category | VARCHAR(50) | NOT NULL |
| quantity | INTEGER | DEFAULT 0 |
| unit_cost | DECIMAL(10,2) | NOT NULL |
| reorder_level | INTEGER | DEFAULT 10 |

---

## Row Level Security (RLS) Policies

| Table | Policy | Role | Access |
|-------|--------|------|--------|
| clients | `clients_owner_policy` | owner | ALL |
| clients | `clients_receptionist_policy` | receptionist | SELECT, INSERT, UPDATE |
| appointments | `appointments_technician_policy` | technician | SELECT (own only) |
| payments | `payments_admin_policy` | admin | ALL |
| staff | `staff_owner_policy` | owner | ALL |

---

## Triggers & Functions

| Trigger | Table | Purpose |
|---------|-------|---------|
| `trg_update_inventory_on_sale` | payments | Deducts product quantity from inventory on confirmed payment |
| `trg_calculate_commission` | payments | Calculates staff commission on confirmed payment |
| `trg_update_client_tier` | payments | Upgrades client to Founder Circle after qualifying payment |
