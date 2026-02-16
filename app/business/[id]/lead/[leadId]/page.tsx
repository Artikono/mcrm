import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Lead } from '@/lib/types';
import { LeadDetails } from './LeadDetails';

interface PageProps {
  params: Promise<{ id: string; leadId: string }>;
}

export default async function LeadPage({ params }: PageProps) {
  const { id, leadId } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch business to verify ownership
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('id', id)
    .single();

  if (businessError || !business) {
    notFound();
  }

  // Fetch lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .select('*')
    .eq('id', leadId)
    .eq('business_id', id)
    .single();

  if (leadError || !lead) {
    notFound();
  }

  return <LeadDetails lead={lead as Lead} businessId={id} businessName={business.name} />;
}
