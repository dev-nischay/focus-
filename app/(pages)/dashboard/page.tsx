import TopSessionsCard from "@/ui/TopSessions";
import { CardSmall } from "@/ui/Card";
import { WeeklyProgress } from "@/ui/WeeklyProgress";
import axios from "axios";
import { DashBoardResponse } from "@/types/request-body.types";
import { Divide } from "lucide-react";
import { minToHours } from "@/utils/timeCals";
export default async function () {
  const data = await axios.get("/api/dashboard/");
  const analytics = (await data.data) as DashBoardResponse;
  const currentDate = new Date().toString().split(" ");
  const recentSession = analytics.recentSessions;
  return (
    <>
      <div className="font-serif text-3xl tracking-tight font-light">Good afternoon, Alex</div>
      <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">
        `${currentDate[0]},${currentDate[1]},${currentDate[2]},${currentDate[3]}` · Keep at it!
      </div>

      <div className=" mt-4 max-w-[900px]  ">
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 ">
          <CardSmall title="today" context="studied today" mins={analytics.today} />
          <CardSmall title="this week" context="total this week" mins={analytics.thisWeek} />
          <CardSmall title="all time" context="total focused" mins={analytics.allTime} />
          <CardSmall title="sessions" context="sessions joined" singleVal={analytics.totalSessions} />
          {/* fix total session as there are no mins and hours */}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <WeeklyProgress weeklyUpdates={analytics.weeklyProgress} />
          <TopSessionsCard topSessions={analytics.topSessions} />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2  gap-4  ">
          <div className=" w-full bg-foreground p-4 border shadow rounded-2xl border-customBorder h-fit ">
            <div className="text-main font-medium text-xs  uppercase ">Recent Sessions</div>
            {recentSession.length > 0 ? (
              recentSession.map((e) => <CardList recentSessions={e} />)
            ) : (
              <div>No completed sessions to display</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const CardList = ({
  recentSessions,
}: {
  recentSessions: {
    createdAt: Date;
    duration: number;
    title: string;
  };
}) => {
  const { hours, minutes } = minToHours(recentSessions.duration);

  const formatDate = recentSessions.createdAt.toISOString().split("T")[0];

  return (
    <div className="flex flex-col  p-1  ">
      <div className="text-black  border-b  border-customBorder flex justify-between  items-center ">
        <div className="px-1 py-2">
          <div className="text-sm font-medium">{recentSessions.title}</div>
          <div className="text-main   text-xs">{formatDate}</div>
        </div>
        <div className="text-main font-semibold text-sm">
          `${hours}h ${minutes}m`
        </div>
      </div>
    </div>
  );
};
