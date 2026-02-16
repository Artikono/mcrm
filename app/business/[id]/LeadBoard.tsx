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
                className="p-2 -mr-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <h1 className="text-xl font-bold text-gray-900 truncate">
                {business.name}
              </h1>
            </div>
            <div className="text-left">
              <div className="text-2xl font-bold text-gray-900">{monthlyTotal}</div>
              <div className="text-xs text-gray-500">לידים החודש</div>
            </div>
          </div>

          {/* Monthly Stats Bar */}
          <div className="flex items-center gap-4 py-2 px-3 bg-gray-50 rounded-lg text-sm">
            <div className="flex items-center gap-1">
              <span className="text-gray-500">המרה:</span>
              <span className="font-semibold text-green-600">{conversionRate}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-500">נקבעו:</span>
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
          <div className="text-center py-16 px-6">
            {selectedStatus === 'ALL' ? (
              <>
                {/* Friendly illustration */}
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full"></div>
                  <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      className="w-14 h-14 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                      />
                    </svg>
                  </div>
                  {/* Decorative dots */}
                  <div className="absolute -top-1 right-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-6 -left-1 w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="absolute -bottom-1 right-8 w-2 h-2 bg-pink-400 rounded-full"></div>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  בואו נתחיל! 🎉
                </h2>
                <p className="text-gray-500 mb-6 max-w-xs mx-auto">
                  הוסף את הליד הראשון שלך ותתחיל לעקוב אחרי הלקוחות הפוטנציאליים
                </p>

                {/* Arrow pointing to FAB */}
                <div className="flex items-center justify-center gap-2 text-blue-600 animate-bounce">
                  <span className="text-sm font-medium">לחץ על הכפתור</span>
                  <svg className="w-5 h-5 rotate-[-135deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-10 h-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-lg font-medium text-gray-900 mb-1">
                  אין לידים בסטטוס זה
                </h2>
                <p className="text-gray-500 text-sm">
                  נסה לבחור פילטר אחר או הוסף לידים חדשים
                </p>
              </>
            )}
          </div>
        )}
      </main>

      {/* Add Lead FAB */}
      <AddLeadForm businessId={business.id} />
    </div>
  );
}
