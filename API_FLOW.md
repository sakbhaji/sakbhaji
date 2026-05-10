# SakBhaji API Flow

This document details the data pipeline from a customer placing an order on WhatsApp to the order appearing on the Next.js Dashboard.

## The Flow: WhatsApp → n8n → Supabase → Dashboard

### Step 1: Customer Interaction (WhatsApp)
- A customer sends a message to the SakBhaji WhatsApp Business number.
- Example message: "Bhaiya, 1kg aloo, 500g tamatar bhej do. Naam: Rahul, Address: Sector 4, Jhola: Yes."

### Step 2: Meta Webhook to n8n
- Meta's WhatsApp Business API triggers a webhook payload containing the incoming message text, sender phone number, and timestamp.
- The n8n instance receives this payload on a designated Webhook Node.

### Step 3: n8n Processing & Parsing
- **Extraction:** n8n uses AI or Regex nodes to extract structured data from the natural language message:
  - `phone`: "+91XXXXXXXXXX"
  - `naam`: "Rahul"
  - `address`: "Sector 4"
  - `items`: `[{"name": "aloo", "qty": 1, "unit": "kg"}, {"name": "tamatar", "qty": 500, "unit": "g"}]`
  - `jhola`: `true`
- **Calculation:** n8n calculates the `total` based on a predefined item price list, and assigns a `delivery_charge` if applicable.

### Step 4: Database Insertion (n8n to Supabase)
- n8n uses an HTTP Request Node or a native Supabase Node to make a `POST` request to the Supabase REST API for the `orders` table.
- Using the Supabase Service Role Key, it inserts the structured JSON payload into the `orders` table.

### Step 5: Real-time Update (Supabase to Dashboard)
- Supabase's Realtime engine detects the new `INSERT` on the `orders` table.
- The Next.js dashboard, running on the admin's device, has an active WebSocket connection via the Supabase JS client (`supabase.channel('custom-all-channel')`).
- The dashboard receives the `INSERT` payload instantly.
- React State is updated, adding the new order to the top of the Orders Table and recalculating KPI cards (e.g., "Total Orders Today") dynamically.

## Reverse Flow: Dashboard → WhatsApp (Optional/Future)
1. Admin clicks "Send Reminder" on the dashboard.
2. Next.js API route calls a separate n8n webhook.
3. n8n formats a WhatsApp template message and sends it via the WhatsApp Business API.
