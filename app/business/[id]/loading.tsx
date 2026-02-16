export default function BusinessLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-7 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="text-right">
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mb-1" />
              <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
        </div>
      </header>
      <div className="max-w-lg mx-auto px-4 py-4">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-20 bg-gray-200 rounded-lg animate-pulse"
            />
          ))}
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
            >
              <div className="flex justify-between mb-3">
                <div>
                  <div className="h-5 w-32 bg-gray-200 rounded mb-2" />
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded-full" />
              </div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-3" />
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <div className="h-8 flex-1 bg-gray-200 rounded-lg" />
                <div className="h-8 flex-1 bg-gray-200 rounded-lg" />
                <div className="h-8 flex-1 bg-gray-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
