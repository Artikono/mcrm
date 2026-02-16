'use client';

import Link from 'next/link';
import { Lead, FOLLOW_UP_DAYS } from '@/lib/types';
import { needsFollowUp, formatRelativeTime } from '@/lib/utils';

interface FollowUpSectionProps {
  leads: Lead[];
  businessId: string;
}

export function FollowUpSection({ leads, businessId }: FollowUpSectionProps) {
  const followUpLeads = leads.filter((lead) =>
    needsFollowUp(lead.status, lead.created_at, lead.next_followup_at, FOLLOW_UP_DAYS)
  );

  if (followUpLeads.length === 0) {
    return null;
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-5 h-5 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-semibold text-orange-800">
          דרוש מעקב ({followUpLeads.length})
        </h3>
      </div>
      <div className="space-y-2">
        {followUpLeads.slice(0, 5).map((lead) => (
          <Link
            key={lead.id}
            href={`/business/${businessId}/lead/${lead.id}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100 hover:border-orange-300 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-medium text-gray-900 truncate">{lead.name}</p>
              <p className="text-sm text-gray-500 truncate">{lead.phone}</p>
            </div>
            <span className="text-xs text-orange-600 whitespace-nowrap mr-2">
              {lead.next_followup_at
                ? `עד: ${formatRelativeTime(lead.next_followup_at)}`
                : formatRelativeTime(lead.created_at)}
            </span>
          </Link>
        ))}
        {followUpLeads.length > 5 && (
          <p className="text-sm text-orange-600 text-center pt-2">
            +{followUpLeads.length - 5} לידים נוספים דורשים תשומת לב
          </p>
        )}
      </div>
    </div>
  );
}
