// components/DashboardSkeleton.tsx
"use client";

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #f0ece6 25%, #faf7f4 50%, #f0ece6 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.6s infinite linear",
};

// Inject keyframes once
const ShimmerStyles = () => (
  <style>{`
    @keyframes shimmer {
      0%   { background-position: -600px 0; }
      100% { background-position:  600px 0; }
    }
  `}</style>
);

const Shimmer = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`rounded-md ${className ?? ""}`} style={{ ...shimmerStyle, ...style }} />
);

const CardSmallSkeleton = () => (
  <div className="w-full h-fit bg-foreground p-4 border shadow rounded-2xl border-customBorder">
    <div className="text-center flex flex-col gap-2 items-center">
      <Shimmer className="h-3 w-16" />
      <Shimmer className="h-7 w-20" />
      <Shimmer className="h-3 w-24" />
    </div>
  </div>
);

const WeeklyProgressSkeleton = () => (
  <div className="bg-white border border-customBorder shadow rounded-2xl p-5">
    <Shimmer className="h-3 w-24 mb-2" />
    <Shimmer className="h-6 w-36 mb-6" />
    <div className="flex items-end gap-2.5 h-[140px] pb-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5">
          <Shimmer className="w-full rounded-t-md" style={{ height: `${[35, 55, 80, 45, 65, 25, 15][i]}%` }} />
          <Shimmer className="h-2.5 w-6" />
        </div>
      ))}
    </div>
  </div>
);

const TopSessionsSkeleton = () => (
  <div className="w-full bg-white p-4 rounded-3xl shadow-sm border border-stone-100 tracking-tighter">
    <Shimmer className="h-3 w-24 mb-5" />
    <div className="space-y-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="flex justify-between mb-2">
            <Shimmer className="h-3" style={{ width: `${[110, 140, 90, 120][i]}px` }} />
            <Shimmer className="h-3 w-12" />
          </div>
          <Shimmer className="h-1.5 w-full rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

const RecentSessionsSkeleton = () => (
  <div className="w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-fit">
    <Shimmer className="h-3 w-28 mb-4" />
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex justify-between items-center py-2.5 border-b border-customBorder last:border-b-0">
        <div>
          <Shimmer className="h-3.5 w-36 mb-1.5" />
          <Shimmer className="h-2.5 w-20" />
        </div>
        <Shimmer className="h-3.5 w-12" />
      </div>
    ))}
  </div>
);

export const DashboardSkeleton = () => (
  <>
    <ShimmerStyles />
    <div className="max-w-[900px]">
      <Shimmer className="h-8 w-56 mb-2.5" />
      <Shimmer className="h-4 w-72 mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSmallSkeleton key={i} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeeklyProgressSkeleton />
        <TopSessionsSkeleton />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <RecentSessionsSkeleton />
      </div>
    </div>
  </>
);
