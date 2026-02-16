'use client';

import Link from 'next/link';
import { Business } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link
      href={`/business/${business.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all active:scale-[0.98]"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {business.name}
      </h3>
      <p className="text-sm text-gray-500">
        Created {formatDate(business.created_at)}
      </p>
    </Link>
  );
}
