'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Business, Lead, LeadStatus } from '@/lib/types';
import { LeadCard } from '@/components/LeadCard';
import { StatusFilter } from '@/components/StatusFilter';
import { AddLeadForm } from '@/components/AddLeadForm';
import { FollowUpSection } from '@/components/FollowUpSection';

interface LeadBoardProps {
  business: Business;
  leads: Lead[];
  counts: Record<LeadStatus | 'ALL', number>;
  monthlyTotal: number;
  conversionRate: number;
}

export function LeadBoard({
  business,
  leads,
  counts,
  monthlyTotal,
  conversionRate,
}: LeadBoardProps) {
  const [selectedStatus, setSelectedStatus] = useState<LeadStatus | 'ALL'>('ALL');

  const filteredLeads =
    selectedStatus === 'ALL'
      ? leads
      : leads.filter((lead) => lead.status === selectedStatus);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="p-2 -ml-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {business.name}
              </h1>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{monthlyTotal}</div>
              <div className="text-xs text-gray-500">leads this month</div>
            </div>
          </div>

          {/* Monthly Stats Bar */}
          <div className="flex items-center gap-4 py-2 px-3 bg-gray-50 rounded-lg text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Conversion:</span>
              <span className="font-semibold text-green-600">{conversionRate}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">Scheduled:</span>
              <span className="font-semibold text-gray-900">{counts.APPOINTMENT_SCHEDULED}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="max-w-lg mx-auto px-4 py-4">
        <StatusFilter
          selected={selectedStatus}
          onSelect={setSelectedStatus}
          counts={counts}
        />
      </div>

      {/* Leads List */}
      <main className="max-w-lg mx-auto px-4">
        {/* Follow-up Section - only show when viewing all leads */}
        {selectedStatus === 'ALL' && (
          <FollowUpSection leads={leads} businessId={business.id} />
        )}

        {filteredLeads.length > 0 ? (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <LeadCard key={lead.id} lead={lead} businessId={business.id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              {selectedStatus === 'ALL' ? 'No leads yet' : 'No leads with this status'}
            </h2>
            <p className="text-gray-500 text-sm">
              {selectedStatus === 'ALL'
                ? 'Add your first lead to get started'
                : 'Try selecting a different filter'}
            </p>
          </div>
        )}
      </main>

      {/* Add Lead FAB */}
      <AddLeadForm businessId={business.id} />
    </div>
  );
}
