'use client';

import Link from 'next/link';
import { Business } from '@/lib/types';
import { formatDate } from '@/lib/utils';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  // Generate a consistent color based on business name
  const colors = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-pink-500 to-pink-600',
    'from-indigo-500 to-indigo-600',
  ];
  const colorIndex = business.name.charCodeAt(0) % colors.length;
  const gradientColor = colors[colorIndex];

  return (
    <Link
      href={`/business/${business.id}`}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-lg transition-all active:scale-[0.98] group"
    >
      <div className="flex items-center gap-4">
        {/* Business Avatar */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientColor} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
          <span className="text-xl font-bold text-white">
            {business.name.charAt(0)}
          </span>
        </div>

        {/* Business Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {business.name}
          </h3>
          <p className="text-sm text-gray-500">
            נוצר ב-{formatDate(business.created_at)}
          </p>
        </div>

        {/* Arrow */}
        <svg
          className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-all"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
    </Link>
  );
}
