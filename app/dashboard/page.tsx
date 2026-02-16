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
          <h1 className="text-xl font-bold text-gray-900">העסקים שלי</h1>
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
          <div className="text-center py-16 px-6">
            {/* Friendly illustration */}
            <div className="relative w-36 h-36 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full"></div>
              <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-inner">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-2 left-6 w-4 h-4 bg-yellow-400 rounded-full shadow-sm"></div>
              <div className="absolute top-8 -right-2 w-3 h-3 bg-green-400 rounded-full shadow-sm"></div>
              <div className="absolute -bottom-1 left-10 w-3 h-3 bg-pink-400 rounded-full shadow-sm"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ברוכים הבאים! 👋
            </h2>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto leading-relaxed">
              צור את העסק הראשון שלך והתחל לנהל את הלידים בקלות ובמהירות
            </p>

            {/* Arrow pointing up to form */}
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span className="text-sm font-medium">הזן שם עסק למעלה</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
