'use client';

export function WeatherSkeleton() {
  return (
    <div className="flex flex-col gap-4 pb-4 animate-fade-in" role="status" aria-label="טוען נתוני מזג אוויר...">
      {/* City indicators */}
      <div className="flex justify-center gap-1.5 py-2">
        <div className="skeleton w-6 h-2 rounded-full" />
        <div className="skeleton w-2 h-2 rounded-full" />
      </div>

      {/* Hero card */}
      <div className="glass-surface rounded-card-lg p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="skeleton w-32 h-6" />
          <div className="skeleton w-24 h-4" />
          <div className="skeleton w-16 h-16 rounded-full mt-4" />
          <div className="skeleton w-28 h-16 mt-2" />
          <div className="skeleton w-20 h-4" />
          <div className="skeleton w-24 h-3 mt-1" />
        </div>

        <div className="flex justify-center gap-6 mt-5">
          <div className="skeleton w-14 h-4" />
          <div className="skeleton w-14 h-4" />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="glass-surface-light rounded-card p-3 flex flex-col items-center gap-2">
              <div className="skeleton w-5 h-5 rounded-full" />
              <div className="skeleton w-8 h-3" />
              <div className="skeleton w-10 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Hourly */}
      <div className="glass-surface rounded-card-lg p-4">
        <div className="skeleton w-20 h-4 mb-3" />
        <div className="flex gap-3 overflow-hidden">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
              <div className="skeleton w-10 h-3" />
              <div className="skeleton w-5 h-5 rounded-full" />
              <div className="skeleton w-8 h-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Daily */}
      <div className="glass-surface rounded-card-lg p-4">
        <div className="skeleton w-20 h-4 mb-3" />
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-3 py-3">
            <div className="skeleton w-12 h-4" />
            <div className="skeleton w-5 h-5 rounded-full" />
            <div className="skeleton flex-1 h-1.5 rounded-full" />
          </div>
        ))}
      </div>

      <span className="sr-only">טוען נתוני מזג אוויר...</span>
    </div>
  );
}
