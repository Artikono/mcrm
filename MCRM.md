Mini CRM Lead Management System
Technical Specification & Development Roadmap

Version 1.0

1. Project Overview
Goal

Build a simple, clean, mobile-first lead management system for small businesses (e.g. nail technicians, beauty professionals, etc.).

The system should:

Organize incoming leads

Track status progression

Provide monthly lead insights

Help follow up with unsold leads

Be extremely simple and intuitive

This is a lightweight CRM focused only on lead tracking.

2. Target Users

Small business owners

Beauty professionals

Service providers

Solo entrepreneurs

Small teams (future phase)

Primary device: Mobile phone

3. Technology Stack (Recommended)
Frontend

Next.js (App Router)

Tailwind CSS

Shadcn/UI (optional but recommended)

Fully responsive design

Backend

Supabase

PostgreSQL database

Authentication

Row-level security

Auto-generated APIs

Hosting

Vercel (Frontend)

Supabase Cloud (Backend)

4. MVP Features (Phase 1)
4.1 Authentication

Email + password login

Secure sessions

Each user sees only their own businesses

4.2 Business Selection Page
Screen: Dashboard

Display:

List of businesses owned by user

Card layout

Button: “Add Business”

Clicking a business opens its Lead Board.

4.3 Lead Management
Screen: Lead Board

Display:

Button: ➕ Add Lead

Filter tabs:

New

Contacted

Appointment Scheduled

Not Relevant / No Response

Monthly Lead Counter (top right)

Each lead displayed as a card:

Card includes:

Name

Phone

Instagram

Treatment type

Created date

Status badge

Quick status update buttons

4.4 Add Lead Form

Fields:

Name (required)

Phone (required)

Instagram (optional)

Treatment Type (optional)

Notes (optional)

Status (default: "New")

4.5 Lead Details Page

When clicking a lead:

Show:

Full information

Call button (tel:)

WhatsApp button (wa.me link)

Instagram link

Change status dropdown

Add notes

Set follow-up date

4.6 Follow-Up System

Logic:

If status is "New" or "Contacted"

AND no appointment scheduled

AND more than X days passed

Mark as:
"Needs Follow-Up"

Dashboard section:

Leads needing follow-up

4.7 Monthly Statistics

On Lead Board:

Total leads this month

Breakdown by status

Conversion rate:
Scheduled / Total

5. Database Schema
Table: users (handled by Supabase Auth)
Table: businesses
id (uuid, pk)
name (text)
owner_user_id (uuid, fk)
created_at (timestamp)

Table: leads
id (uuid, pk)
business_id (uuid, fk)
name (text)
phone (text)
instagram (text)
treatment_type (text)
status (enum)
notes (text)
created_at (timestamp)
last_contacted_at (timestamp)
next_followup_at (timestamp)

Status Enum
NEW
CONTACTED
APPOINTMENT_SCHEDULED
NOT_RELEVANT
NO_RESPONSE

6. UX Design Principles

Mobile-first

Large buttons

Minimal text

Card-based UI

Clear status colors:

Blue = New

Orange = Contacted

Green = Scheduled

Red = Not relevant

Gray = No response

7. Development Phases
Phase 1 – MVP (Weeks 1–2)

Setup Next.js project

Connect Supabase

Build authentication

Create businesses table + UI

Create leads table + CRUD

Add status filtering

Add monthly counter

Deploy to Vercel

Goal: Working production-ready system

Phase 2 – Quality Improvements

Search leads

Advanced filtering

Editable follow-up intervals

Activity log

Soft delete

Export CSV

Phase 3 – WhatsApp Integration

Options:

Basic (Simple)

Generate WhatsApp deep link:

https://wa.me/<phone>?text=<template>

Advanced (Official API)

Integrate:

Meta WhatsApp Business API

360dialog

Twilio

Features:

Send templates

Automatic reminders

Conversation tracking

Phase 4 – Multi-User & Teams

Add:

Table: business_users
id
business_id
user_id
role (owner / admin / staff)


Features:

Multiple users per business

Permissions

Activity tracking

Phase 5 – Advanced Analytics

Conversion rate over time

Monthly revenue estimation

Treatment type breakdown

Performance dashboard

Phase 6 – SaaS Productization

If turning into a real SaaS:

Add:

Stripe integration

Subscription tiers

Free plan limits

Billing dashboard

Admin panel

Marketing website

8. Future Expansion Ideas

AI auto-tagging of leads

AI follow-up suggestion text

Automatic WhatsApp reminders

Google Calendar integration

Instagram DM webhook integration

Mobile app (React Native)

White-label version

CRM for multiple industries

9. Security Considerations

Row Level Security in Supabase

Business data isolation

Input validation

Rate limiting (future)

10. Scalability Plan

The system should:

Support 1 business → thousands

Support 10 leads → millions

Work for solo user → multi-team

Architecture already supports growth.

11. Project Structure (Frontend)
/app
  /login
  /dashboard
  /business/[id]
  /business/[id]/lead/[leadId]

/components
  LeadCard.tsx
  BusinessCard.tsx
  StatusBadge.tsx
  FollowUpSection.tsx

/lib
  supabaseClient.ts
  utils.ts

12. Deployment Plan

Create Supabase project

Set environment variables

Deploy frontend to Vercel

Connect domain

Enable HTTPS

Production testing

13. Definition of Success

MVP is successful if:

User can add leads in under 5 seconds

User can change status in 1 tap

User can see monthly total instantly

User can identify follow-up leads easily

14. Long-Term Vision

Transform this from a simple lead tracker into:

A lightweight CRM system for small service businesses worldwide.

Start simple.
Build clean.
Scale gradually.