-- Mini CRM Database Schema
-- Version: 1.0.0

-- ============================================
-- ENUM TYPE
-- ============================================

CREATE TYPE lead_status AS ENUM (
  'NEW',
  'CONTACTED',
  'APPOINTMENT_SCHEDULED',
  'NOT_RELEVANT',
  'NO_RESPONSE'
);

-- ============================================
-- TABLES
-- ============================================

-- Businesses table
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups by owner
CREATE INDEX idx_businesses_owner ON businesses(owner_user_id);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  instagram TEXT,
  treatment_type TEXT,
  status lead_status NOT NULL DEFAULT 'NEW',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  next_followup_at TIMESTAMPTZ
);

-- Create indexes for faster queries
CREATE INDEX idx_leads_business ON leads(business_id);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_leads_created_at ON leads(created_at);
CREATE INDEX idx_leads_followup ON leads(next_followup_at) WHERE next_followup_at IS NOT NULL;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- BUSINESSES POLICIES
-- ============================================

-- Users can only see their own businesses
CREATE POLICY "Users can view own businesses"
  ON businesses
  FOR SELECT
  USING (owner_user_id = auth.uid());

-- Users can only insert businesses they own
CREATE POLICY "Users can create own businesses"
  ON businesses
  FOR INSERT
  WITH CHECK (owner_user_id = auth.uid());

-- Users can only update their own businesses
CREATE POLICY "Users can update own businesses"
  ON businesses
  FOR UPDATE
  USING (owner_user_id = auth.uid())
  WITH CHECK (owner_user_id = auth.uid());

-- Users can only delete their own businesses
CREATE POLICY "Users can delete own businesses"
  ON businesses
  FOR DELETE
  USING (owner_user_id = auth.uid());

-- ============================================
-- LEADS POLICIES
-- ============================================

-- Users can only see leads from businesses they own
CREATE POLICY "Users can view leads from own businesses"
  ON leads
  FOR SELECT
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_user_id = auth.uid()
    )
  );

-- Users can only insert leads into businesses they own
CREATE POLICY "Users can create leads in own businesses"
  ON leads
  FOR INSERT
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE owner_user_id = auth.uid()
    )
  );

-- Users can only update leads in businesses they own
CREATE POLICY "Users can update leads in own businesses"
  ON leads
  FOR UPDATE
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_user_id = auth.uid()
    )
  )
  WITH CHECK (
    business_id IN (
      SELECT id FROM businesses WHERE owner_user_id = auth.uid()
    )
  );

-- Users can only delete leads from businesses they own
CREATE POLICY "Users can delete leads from own businesses"
  ON leads
  FOR DELETE
  USING (
    business_id IN (
      SELECT id FROM businesses WHERE owner_user_id = auth.uid()
    )
  );
