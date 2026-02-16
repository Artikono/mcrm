export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-14 bg-gray-200 rounded animate-pulse" />
        </div>
      </header>
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="h-14 w-full bg-gray-200 rounded-xl animate-pulse mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse"
            >
              <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
