# Deal Hunt - Smart Product Price Tracker

Track product prices across e-commerce sites and get alerts on price drops. Built with Next.js 16, Firecrawl, and Supabase.

## 🎯 Features

-   **🔍 Track Any Product** - Works with Amazon, Flipkart, Apple, and more.
-   **📊 Price History** - Keeps a record of price changes over time.
-   **🔐 Google Authentication** - Secure sign-in with Google OAuth via Supabase.
-   **🔄 Automated Daily Checks** - Scheduled cron jobs check prices automatically.
-   **📧 Email Alerts** - Get notified immediately when prices drop via Resend.
-   **✨ Modern UI** - Beautiful masonry layout with glassmorphism effects.

## 🛠️ Tech Stack

-   **[Next.js 16](https://nextjs.org/)** - React framework with App Router.
-   **[Firecrawl](https://firecrawl.dev/)** - AI-powered web scraping and data extraction.
-   **[Supabase](https://supabase.com/)** - Backend as a Service (PostgreSQL, Auth, Realtime).
-   **[Resend](https://resend.com/)** - Email API for transactional alerts.
-   **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework.
-   **[Framer Motion](https://www.framer.com/motion/)** - Animations and gestures.
-   **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications to users.

## 📋 Prerequisites

Before you begin, ensure you have:

-   Node.js 18+ installed.
-   A **Supabase** account.
-   A **Firecrawl** account.
-   A **Resend** account.
-   Google OAuth credentials from **Google Cloud Console**.

## 🚀 Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/Tuhin200655/Project-Deal-Hunt.git
cd Project-Deal-Hunt
npm install
```

### 2. Supabase Setup

1.  **Create Project**: Create a new project at [supabase.com](https://supabase.com).
2.  **Run Database Migrations**: Go to the SQL Editor in your Supabase dashboard and run the following SQL to set up your tables and security policies:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Products table
create table products (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  name text not null,
  price numeric(10,2) not null,
  currency text not null default 'USD',
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Price history table
create table price_history (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references products(id) on delete cascade not null,
  price numeric(10,2) not null,
  currency text not null,
  checked_at timestamp with time zone default now()
);

-- Add unique constraint for upsert functionality
ALTER TABLE products
ADD CONSTRAINT products_user_url_unique UNIQUE (user_id, url);

-- Enable Row Level Security
alter table products enable row level security;
alter table price_history enable row level security;

-- Policies for products
create policy "Users can view their own products"
  on products for select
  using (auth.uid() = user_id);

create policy "Users can insert their own products"
  on products for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own products"
  on products for update
  using (auth.uid() = user_id);

create policy "Users can delete their own products"
  on products for delete
  using (auth.uid() = user_id);

-- Policies for price_history
create policy "Users can view price history for their products"
  on price_history for select
  using (
    exists (
      select 1 from products
      where products.id = price_history.product_id
      and products.user_id = auth.uid()
    )
  );

-- Indexes for performance
create index products_user_id_idx on products(user_id);
create index price_history_product_id_idx on price_history(product_id);
create index price_history_checked_at_idx on price_history(checked_at desc);
```

3.  **Enable Google Authentication**:
    *   Go to Authentication → Providers.
    *   Enable **Google**.
    *   Paste your Client ID and Client Secret from Google Cloud Console.
    *   Add `https://<your-project>.supabase.co/auth/v1/callback` to your authorized redirect URIs in Google Cloud.

4.  **Get API Credentials**:
    *   Project URL & Anon Key (Settings → API).
    *   Service Role Key (Settings → API). **Keep this secret!**

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Firecrawl
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=onboarding@resend.dev

# Cron Job Security (Generate a random string)
CRON_SECRET=your_generated_cron_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📦 Deployment

### Deploy to Vercel

1.  Push your code to GitHub.
2.  Import the project into [Vercel](https://vercel.com).
3.  Add the **Environment Variables** from your `.env` file to the Vercel project settings.
    *   *Note: If your local setup uses `PUBLIC_SUPABASE_SERVICE_ROLE_KEY`, ensure you add it or `SUPABASE_SERVICE_ROLE_KEY` to Vercel.*
4.  Deploy!

### Setup Cron Job

Once deployed, set up the cron job to run daily. You can use a service like **GitHub Actions**, **Vercel Cron**, or simply use **Supabase `pg_cron`**:

Run this SQL in Supabase to schedule the job (requires `pg_cron` and `pg_net` extensions):

```sql
-- Enable extensions
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Create trigger function
create or replace function trigger_price_check()
returns void
language plpgsql
security definer
as $$
begin
  perform net.http_post(
    url := 'https://your-vercel-app.vercel.app/api/cron/check-prices',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer YOUR_CRON_SECRET'
    )
  );
end;
$$;

-- Schedule daily at 9 AM
select cron.schedule(
  'daily-price-check',
  '0 9 * * *',
  'select trigger_price_check();'
);
```

**Note:** Replace `https://your-vercel-app.vercel.app` and `YOUR_CRON_SECRET` with your actual values.

## 📂 Project Structure

```
deal-hunt/
├── app/
│   ├── api/
│   │   └── cron/
│   │       └── check-prices/
│   │           └── route.js    # Cron job endpoint
│   ├── auth/                   # Auth callback route
│   ├── action.js               # Server Actions (Add/Preview Product)
│   ├── layout.js               # Root layout
│   └── page.jsx                # Main landing page
├── components/
│   ├── AddProductForm.jsx      # Input form with validation
│   ├── AuthButton.jsx          # Google Sign-in/Sign-out
│   ├── ProductCard.jsx         # Product display card
│   └── ProductGrid.jsx         # Masonry grid layout
├── lib/
│   ├── email.js                # Resend email logic & templates
│   └── firecrawl.js            # Firecrawl scraping logic
├── utils/
│   └── supabase/               # Supabase clients (client/server/middleware)
└── public/
    └── app-logo.png            # Application Logo
```

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ by [Tuhin](https://github.com/Tuhin200655)
