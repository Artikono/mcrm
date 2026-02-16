import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Business } from '@/lib/types';
import { BusinessCard } from '@/components/BusinessCard';
import { AddBusinessForm } from './AddBusinessForm';
import { LogoutButton } from './LogoutButton';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: businesses, error } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching businesses:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">My Businesses</h1>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        <AddBusinessForm />

        {businesses && businesses.length > 0 ? (
          <div className="space-y-3 mt-6">
            {(businesses as Business[]).map((business) => (
              <BusinessCard key={business.id} business={business} />
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-1">
              No businesses yet
            </h2>
            <p className="text-gray-500 text-sm">
              Create your first business to start tracking leads
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
