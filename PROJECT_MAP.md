# SakBhaji Project Map

## 1. System Architecture Overview
The SakBhaji Admin Dashboard is designed as a modern, decoupled web application.

- **Frontend:** Next.js 15 (App Router), React, Tailwind CSS, shadcn/ui.
- **Backend & Database:** Supabase (PostgreSQL, Authentication, Real-time Subscriptions).
- **Automation:** n8n for WhatsApp Webhooks and data parsing.
- **Hosting:** Vercel (Frontend), Supabase Cloud (Backend), self-hosted or cloud n8n.

## 2. Component Flow

### 2.1 WhatsApp to Dashboard Flow
1. **Customer Interaction:** Customer sends an order message to the SakBhaji WhatsApp Business number.
2. **Webhook Trigger:** Meta WhatsApp Business API sends a webhook to the n8n automation flow.
3. **n8n Processing:** n8n parses the incoming message (extracting Name, Phone, Items, Total, Delivery Charge, Jhola requirement, Address).
4. **Database Insert:** n8n inserts the parsed order data as a new row in the Supabase `orders` table.
5. **Real-time Sync:** Supabase broadcasts an `INSERT` event to connected clients via Realtime Subscriptions.
6. **Dashboard UI:** The Next.js dashboard receives the event and updates the orders table and KPI cards instantly without a page refresh.

### 2.2 Dashboard to Customer Flow
1. **Admin Action:** Admin updates order status (e.g., "Out for Delivery") or triggers an action ("Send Reminder").
2. **Database Update:** The Next.js application updates the `orders` table in Supabase or calls a Next.js API Route.
3. **Webhook Trigger (Optional):** Supabase Webhooks or Next.js API Route triggers an n8n webhook.
4. **WhatsApp Message:** n8n formats the message and sends it via WhatsApp Business API back to the customer.

## 3. Frontend Architecture
The frontend is built with Next.js 15 App Router:
- `src/app/`: Contains the main routes (`/`, `/orders`, `/analytics`, `/login`).
- `src/components/ui/`: Reusable shadcn/ui generic components (Buttons, Inputs, Dialogs).
- `src/components/dashboard/`: Specific business components (KPI Cards, Real-time Order Table).
- `src/components/layout/`: Sidebar, Mobile Navigation, Topbar.
- `src/lib/supabase/`: Supabase client initialization and helper functions.
- `src/types/`: TypeScript definitions for database schemas and API responses.

## 4. Deployment Flow
1. **Version Control:** Developer pushes code to the `main` branch on GitHub.
2. **CI/CD:** Vercel detects the push and automatically triggers a build.
3. **Build Process:** Next.js compiles the application, runs ESLint and TypeScript checks.
4. **Deployment:** Vercel deploys the new version globally via its Edge Network.
5. **Environment Variables:** Vercel uses securely stored environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`) for connecting to Supabase.
