# SakBhaji Database Schema

This document outlines the Supabase PostgreSQL database schema for the SakBhaji dashboard.

## 1. `orders` Table (Primary)
Stores all incoming orders from the WhatsApp n8n flow.

| Column Name       | Type                     | Properties                                  | Description                                           |
| ----------------- | ------------------------ | ------------------------------------------- | ----------------------------------------------------- |
| `id`              | `uuid`                   | Primary Key, Default: `uuid_generate_v4()`  | Unique identifier for the order                       |
| `phone`           | `text`                   | Not Null                                    | Customer's WhatsApp number                            |
| `naam`            | `text`                   | Not Null                                    | Customer's Name                                       |
| `address`         | `text`                   | Not Null                                    | Delivery Address                                      |
| `items`           | `jsonb`                  | Not Null, Default: `[]`                     | Array of items `{ name: string, qty: number, price: number }` |
| `total`           | `numeric(10,2)`          | Not Null                                    | Total order amount                                    |
| `delivery_charge` | `numeric(10,2)`          | Default: `0`                                | Delivery fee applied                                  |
| `jhola`           | `boolean`                | Default: `false`                            | Indicates if customer requested a bag                 |
| `status`          | `text`                   | Default: `'pending'`                        | Enum: `'pending'`, `'processing'`, `'delivered'`, `'cancelled'` |
| `created_at`      | `timestamp with time zone`| Default: `now()`                           | Record creation timestamp                             |

---

## 2. Future-Ready Tables

### `customers`
Tracks customer profiles and engagement.
- `id` (uuid, PK)
- `phone` (text, Unique)
- `name` (text)
- `total_orders` (integer)
- `total_spent` (numeric)
- `last_order_date` (timestamp)
- `tags` (text[]) - e.g., VIP, Regular, Inactive

### `delivery_agents`
Tracks delivery personnel.
- `id` (uuid, PK)
- `name` (text)
- `phone` (text)
- `status` (text) - e.g., 'active', 'inactive'

### `inventory`
Manages vegetable stock.
- `id` (uuid, PK)
- `item_name` (text)
- `category` (text)
- `price_per_kg` (numeric)
- `stock_quantity` (numeric)
- `status` (text) - e.g., 'in_stock', 'out_of_stock'

### `offers`
Stores active promotional campaigns.
- `id` (uuid, PK)
- `offer_code` (text)
- `discount_percentage` (integer)
- `valid_until` (timestamp)

## 3. Row Level Security (RLS)
For the MVP and MVP testing:
- **Enable RLS** on all tables.
- **Policies:** 
  - `Allow all operations for authenticated users` (Admins).
  - `Allow INSERT for anonymous` (for the n8n webhook connection, using a Service Role Key or anonymous key if RLS allows specific insert paths). It's recommended to use the Supabase Service Role Key in n8n to bypass RLS securely.
