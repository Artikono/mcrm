'use client';

import { LeadStatus, LEAD_STATUSES, STATUS_LABELS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatusFilterProps {
  selected: LeadStatus | 'ALL';
  onSelect: (status: LeadStatus | 'ALL') => void;
  counts?: Record<LeadStatus | 'ALL', number>;
}

export function StatusFilter({ selected, onSelect, counts }: StatusFilterProps) {
  const filters: (LeadStatus | 'ALL')[] = ['ALL', ...LEAD_STATUSES];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
      {filters.map((status) => {
        const isSelected = selected === status;
        const count = counts?.[status] ?? 0;

        return (
          <button
            key={status}
            onClick={() => onSelect(status)}
            className={cn(
              'flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
              isSelected
                ? 'bg-gray-900 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
            )}
          >
            {status === 'ALL' ? 'All' : STATUS_LABELS[status]}
            {counts && (
              <span
                className={cn(
                  'ml-1.5 px-1.5 py-0.5 rounded text-xs',
                  isSelected ? 'bg-white/20' : 'bg-gray-100'
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
