// components/DashboardSkeleton.tsx
"use client";

import { ListComp } from "@/app/(pages)/history/page";

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

const CardSmallSkeleton = () => (
  <div className="w-full h-fit bg-foreground p-4 border shadow rounded-2xl border-customBorder">
    <div className="text-center flex flex-col gap-2 items-center">
      <Shimmer className="h-4 w-16" />
      <Shimmer className="h-7 w-20" />
      <Shimmer className="h-3 w-24" />
    </div>
  </div>
);

const ListCompSkeleton = () => {
  return (
    <div className="text-black  border-b  p-2 border-customBorder flex justify-between  items-center  ">
      <div className="px-1 py-2">
        <Shimmer className="h-4 w-24" />
        <Shimmer className="h-3 w-16 mt-2" />
      </div>
      <div className="text-main relative font-semibold text-sm mr-4 flex items-center gap-3">
        <span className="rounded-md h-4 w-20 " style={{ ...shimmerStyle }}></span>
        <span className="rounded-full size-7  flex justify-center items-center " style={{ ...shimmerStyle }}></span>
      </div>
    </div>
  );
};

export const HistorySkeleton = () => {
  return (
    <>
      <ShimmerStyles />
      <Shimmer className="h-6 w-36 mb-3" />
      <Shimmer className="h-3 w-24 mb-2" />
      <div className=" mt-8 max-w-[900px]">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {[0, 1, 2].map((_, i) => (
            <CardSmallSkeleton key={i} />
          ))}
        </div>

        <div className="grid grid-cols-1 h-fit bg-foreground mt-8 relative  border shadow rounded-xl border-customBorder">
          <div className="border-b absolute border-customBorder inset-x-0 top-16"></div>
          <div className="h-full w-full px-3 py-5 ">
            {/* header */}
            <div className=" flex justify-between  items-center w-full px-2   ">
              <Shimmer className="h-6 w-24  " />
              <Shimmer className=" h-8 w-20  px-2 py-2 p-1" />
            </div>
          </div>
          <div>
            {[1, 2, 3].map((_, i) => (
              <ListCompSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
