import { prisma } from "@/prisma/db";
import { FocusSession } from "@/prisma/generated/client";
import { ApiResponse } from "@/types/response.types";
import { CardSmall } from "@/ui/Card";
import { minToHours } from "@/utils/timeCals";
import axios, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";
export default async function History() {
  const dropDownVals = ["All time", "This week", "This month"];
  const session = useSession();

  const data = await prisma.focusSession.aggregate({
    where: { userId: session.data!.user.userId },
    _avg: { duration: true },
    _count: { userId: true },
    _sum: { duration: true },
  });

  const res = (await axios.get("/api/history/")).data as AxiosResponse<ApiResponse<FocusSession[]>>;
  const history = res.data.data;
  return (
    <>
      <div className="font-serif text-3xl tracking-tight font-light">Session History</div>
      <div className="text-sm text-main font-medium tracking-tight leading mt-1 ">Every session counts</div>

      <div className=" mt-8 max-w-[900px] ">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <CardSmall title="total sessions" context="completed" singleVal={data._count.userId} />
          <CardSmall title="total time" context="focused" mins={data._sum.duration ?? 0} />
          <CardSmall title="avg session" context="per session" mins={data._count.userId} />
        </div>

        <div className="grid grid-cols-1 h-fit bg-foreground mt-8 relative  border shadow rounded-xl border-customBorder   ">
          <div className="border-b absolute border-customBorder inset-x-0 top-16"></div>
          <div className="h-full w-full px-3 py-5 ">
            {/* header */}
            <div className=" flex justify-between  items-center w-full px-2  ">
              <div className="text-xs mb-1 font-semibold text-main  uppercase  border-customBorder">all sessions</div>
              <div>
                <select
                  id="cars"
                  className="text-xs font-medium text-black border border-taupe-400 px-2 py-2 bg-background  rounded-lg p-1 "
                >
                  {dropDownVals.map((e, index) => {
                    return (
                      <option key={index} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            {/* history list */}
            <div className="mt-5 ">
              {history.length > 0 ? (
                history.map((e, index) => {
                  return <ListComp title={e.title} key={index} date={e.createdAt} duration={e.duration!} />;
                })
              ) : (
                <div>No completed sessions to display</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const ListComp = ({ title, date, duration }: { title: string; date: Date; duration: number }) => {
  const { hours, minutes } = minToHours(duration);

  const formatDate = date.toISOString().split("T")[0];
  return (
    <div className="text-black  border-b  p-2 border-customBorder flex justify-between  items-center mt-2 ">
      <div className="px-1 py-2">
        <div className="text-sm font-medium capitalize">{title}</div>
        <div className="text-main  mt-1 text-xs">{formatDate}</div>
      </div>
      <div className="text-main relative font-semibold text-sm mr-4 flex items-center gap-3">
        <span className="text-main font-mono">
          `${hours}h ${minutes},`
        </span>
        <span className="rounded-full size-7 text-sm bg-[#EAF2EC] text-green-800  flex justify-center items-center">
          ✓
        </span>
      </div>
    </div>
  );
};
