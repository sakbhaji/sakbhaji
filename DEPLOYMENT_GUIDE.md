# SakBhaji Deployment Guide

## 1. Supabase Setup
1. Create an account at [supabase.com](https://supabase.com) and start a new project.
2. Go to the SQL Editor and run the SQL provided in the `DATABASE_SCHEMA.md` to create your `orders` table.
3. Enable Realtime for the `orders` table:
   - Go to Database -> Replication.
   - Under "Source", toggle `orders` to enabled.
4. Retrieve your API Keys:
   - Go to Project Settings -> API.
   - Copy the `Project URL` and `anon public` key.

## 2. GitHub Setup
1. Initialize a git repository locally: `git init`
2. Commit your code: `git add .` and `git commit -m "Initial commit"`
3. Create a new repository on GitHub (e.g., `sakbhaji-dashboard`).
4. Push your code:
   ```bash
   git remote add origin https://github.com/yourusername/sakbhaji-dashboard.git
   git branch -M main
   git push -u origin main
   ```

## 3. Vercel Deployment (Frontend)
1. Log in to [vercel.com](https://vercel.com) using your GitHub account.
2. Click "Add New..." -> "Project".
3. Import the `sakbhaji-dashboard` repository.
4. In the configuration step, open "Environment Variables" and add:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
5. Click "Deploy". Vercel will build and host your Next.js application.

## 4. n8n Setup (Automation)
1. Access your n8n instance (Cloud or Self-Hosted).
2. Create a new workflow.
3. Add a **Webhook Trigger** node (Method: POST) to receive messages from Meta WhatsApp API.
4. Add processing nodes (e.g., AI parser or Regex) to extract the required JSON structure.
5. Add an **HTTP Request** node to push data to Supabase:
   - Method: POST
   - URL: `https://<YOUR_SUPABASE_ID>.supabase.co/rest/v1/orders`
   - Headers: 
     - `apikey`: `<YOUR_SUPABASE_SERVICE_ROLE_KEY>`
     - `Authorization`: `Bearer <YOUR_SUPABASE_SERVICE_ROLE_KEY>`
     - `Content-Type`: `application/json`
   - Body: Pass the structured JSON data mapped from the webhook.
6. Activate the workflow. Provide the n8n Webhook URL to your Meta WhatsApp Business API configuration.
