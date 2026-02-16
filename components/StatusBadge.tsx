import { LeadStatus, STATUS_COLORS, STATUS_LABELS } from '@/lib/types';
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: LeadStatus;
  size?: 'sm' | 'md';
}

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full text-white',
        STATUS_COLORS[status],
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}
