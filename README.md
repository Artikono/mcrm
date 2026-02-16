# Mini CRM - Lead Management System

A simple, mobile-first lead management system for small businesses built with Next.js, Supabase, and TailwindCSS.

## Features

- **Authentication**: Email/password login and registration
- **Multi-Business Support**: Manage multiple businesses under one account
- **Lead Management**: Add, view, edit, and delete leads
- **Status Tracking**: Track leads through stages (New, Contacted, Appointment Scheduled, Not Relevant, No Response)
- **Quick Actions**: One-tap status changes and quick contact buttons
- **Follow-Up System**: Automatic follow-up reminders for stale leads
- **Monthly Statistics**: Track conversion rates and lead counts
- **Mobile-First**: Optimized for mobile devices with large touch targets
- **Row-Level Security**: Complete data isolation between users

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, TailwindCSS
- **Backend**: Supabase (PostgreSQL, Authentication, Row-Level Security)
- **Deployment**: Vercel (Frontend), Supabase Cloud (Backend)

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd mcrm
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the migration file:
   - Copy contents from `supabase/migrations/001_initial.sql`
   - Run in the SQL Editor
3. Go to **Project Settings > API** to get your credentials

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

**businesses**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Business name |
| owner_user_id | uuid | Foreign key to auth.users |
| created_at | timestamptz | Creation timestamp |

**leads**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| business_id | uuid | Foreign key to businesses |
| name | text | Lead name |
| phone | text | Phone number |
| instagram | text | Instagram handle (optional) |
| treatment_type | text | Service type (optional) |
| status | lead_status | Current status |
| notes | text | Notes (optional) |
| created_at | timestamptz | Creation timestamp |
| next_followup_at | timestamptz | Follow-up date (optional) |

### Status Enum

- `NEW` - New lead (default)
- `CONTACTED` - Lead has been contacted
- `APPOINTMENT_SCHEDULED` - Appointment booked
- `NOT_RELEVANT` - Lead not relevant
- `NO_RESPONSE` - No response from lead

## Follow-Up Logic

A lead needs follow-up when:
- Status is `NEW` or `CONTACTED`
- AND either:
  - `next_followup_at` is set and has passed
  - OR `next_followup_at` is not set and lead is older than 3 days

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

### Supabase Configuration for Production

1. In Supabase Dashboard > Authentication > URL Configuration:
   - Add your Vercel domain to "Site URL"
   - Add your Vercel domain to "Redirect URLs"

2. Enable Email confirmations (optional):
   - Go to Authentication > Email Templates
   - Configure SMTP for production emails

## Project Structure

```
mcrm/
├── app/
│   ├── login/                    # Login/Register page
│   ├── dashboard/                # Business selection page
│   └── business/
│       └── [id]/
│           ├── page.tsx          # Lead board
│           └── lead/
│               └── [leadId]/     # Lead details
├── components/
│   ├── AddLeadForm.tsx
│   ├── BusinessCard.tsx
│   ├── FollowUpSection.tsx
│   ├── LeadCard.tsx
│   ├── StatusBadge.tsx
│   └── StatusFilter.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts             # Browser client
│   │   ├── server.ts             # Server client
│   │   └── middleware.ts         # Auth middleware
│   ├── types.ts                  # TypeScript types
│   └── utils.ts                  # Utility functions
├── supabase/
│   └── migrations/
│       └── 001_initial.sql       # Database schema
├── middleware.ts                 # Next.js middleware
└── .env.local.example            # Environment template
```

## Security

- **Row-Level Security (RLS)**: All database tables have RLS enabled
- **Data Isolation**: Users can only access their own businesses and leads
- **Secure Authentication**: Handled by Supabase Auth
- **No Service Role Key Exposure**: Only anon key is used client-side

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Status Colors

| Status | Color |
|--------|-------|
| New | Blue |
| Contacted | Orange |
| Appointment Scheduled | Green |
| Not Relevant | Red |
| No Response | Gray |

## License

MIT
