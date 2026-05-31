// components/NotesSkeleton.tsx

const shimmerStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #f0ece6 25%, #faf7f4 50%, #f0ece6 75%)",
  backgroundSize: "600px 100%",
  animation: "shimmer 1.6s infinite linear",
};

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

const NoteCardSkeleton = () => (
  <div className="bg-foreground rounded-xl border border-customBorder shadow-sm overflow-hidden flex flex-col p-5">
    {/* coloured top bar */}
    <Shimmer className="-mt-5 -mx-5 mb-5 rounded-none" style={{ height: "4px" }} />
    {/* content lines */}
    <Shimmer className="mb-2" style={{ height: "13px", width: "95%" }} />
    <Shimmer className="mb-2" style={{ height: "13px", width: "75%" }} />
    <Shimmer style={{ height: "13px", width: "85%" }} />
    {/* footer */}
    <div className="mt-6 flex justify-between items-center border-t border-customBorder pt-3">
      <Shimmer style={{ height: "11px", width: "80px" }} />
    </div>
  </div>
);

export function NotesSkeleton() {
  return (
    <>
      <ShimmerStyles />

      {/* heading */}
      <Shimmer className="mb-2.5" style={{ height: "28px", width: "160px" }} />
      <Shimmer className="mb-6" style={{ height: "13px", width: "130px" }} />

      {/* search + toggle */}
      <div className="flex gap-3 items-center mb-6">
        <Shimmer style={{ height: "38px", width: "220px", borderRadius: "8px" }} />
        <Shimmer style={{ height: "36px", width: "36px", borderRadius: "8px" }} />
      </div>

      <div className="max-w-[900px]">
        {/* pinned section */}
        <Shimmer style={{ height: "11px", width: "55px" }} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <NoteCardSkeleton key={i} />
          ))}
        </div>

        {/* all notes section */}
        <div className="mt-6">
          <Shimmer style={{ height: "11px", width: "70px" }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
