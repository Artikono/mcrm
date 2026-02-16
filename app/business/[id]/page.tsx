import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Lead, LeadStatus, LEAD_STATUSES } from '@/lib/types';
import { LeadBoard } from './LeadBoard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BusinessPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch business
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();

  if (businessError || !business) {
    notFound();
  }

  // Fetch leads
  const { data: leads, error: leadsError } = await supabase
    .from('leads')
    .select('*')
    .eq('business_id', id)
    .order('created_at', { ascending: false });

  if (leadsError) {
    console.error('Error fetching leads:', leadsError);
  }

  // Calculate counts by status
  const allLeads = (leads as Lead[]) || [];
  const counts: Record<LeadStatus | 'ALL', number> = {
    ALL: allLeads.length,
    NEW: 0,
    CONTACTED: 0,
    APPOINTMENT_SCHEDULED: 0,
    NOT_RELEVANT: 0,
    NO_RESPONSE: 0,
  };

  for (const status of LEAD_STATUSES) {
    counts[status] = allLeads.filter((l) => l.status === status).length;
  }

  // Calculate monthly stats
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyLeads = allLeads.filter(
    (l) => new Date(l.created_at) >= startOfMonth
  );
  const monthlyScheduled = monthlyLeads.filter(
    (l) => l.status === 'APPOINTMENT_SCHEDULED'
  ).length;
  const conversionRate =
    monthlyLeads.length > 0
      ? Math.round((monthlyScheduled / monthlyLeads.length) * 100)
      : 0;

  return (
    <LeadBoard
      business={business}
      leads={allLeads}
      counts={counts}
      monthlyTotal={monthlyLeads.length}
      conversionRate={conversionRate}
    />
  );
}
