"use client";
import { WeeklyProgress } from "@/ui/WeeklyProgress";
import TopSessionsCard from "@/ui/TopSessions";
export default function () {
  return (
    <div className="text-black  flex-1 px-9 py-8">
      <div className="font-serif text-3xl tracking-tight font-light">Good afternoon, Alex</div>
      <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">
        Monday, May 4, 2025 · Keep at it!
      </div>

      <div className=" mt-8 max-w-[900px]  ">
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <CardSmall />
          <CardSmall />
          <CardSmall />
          <CardSmall />
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyProgress />
          <TopSessionsCard />
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2  gap-4  ">
          <CardList />
        </div>
      </div>
    </div>
  );
}

export const CardSmall = () => {
  return (
    <div className=" w-full bg-foreground p-4 border   shadow rounded-2xl border-customBorder  ">
      <div className="text-center flex flex-col gap-2 text-main">
        <div className="text-xs">TODAY</div>
        <div className="text-2xl text-green-800 font-medium">
          2h <span className="pl-2">19m</span>
        </div>
        <div className="text-xs ">studied today</div>
      </div>
    </div>
  );
};

export const CardLarge = () => {
  return <div className=" w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-52 "></div>;
};

export const CardList = () => {
  return (
    <div className=" w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-fit ">
      <div className="text-main font-medium text-xs  uppercase ">Recent Sessions</div>

      {[2, 2, 3, 3].map((e, index) => {
        return (
          <div key={index} className="flex flex-col  p-1  ">
            <div className="text-black  border-b  border-customBorder flex justify-between  items-center ">
              <div className="px-1 py-2">
                <div className="text-sm font-medium">Nextjs Practise</div>
                <div className="text-main   text-xs">2025-03-10</div>
              </div>
              <div className="text-main font-semibold text-sm"> 1h 34m</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
