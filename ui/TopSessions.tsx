import { minToHours } from "@/utils/timeCals";

type SessionData = {
  createdAt: Date;
  duration: number;
  title: string;
}[];

const progressColor = ["bg-main", "bg-mist-500", "bg-yellow-600", "bg-mauve-500", "bg-purple-700"];

// figure out to calculate percentage

const calculatePercentage = (minutes: number) => {
  return (minutes / 1440) * 100;
};

const TopSessionsCard = ({ topSessions }: { topSessions: SessionData }) => {
  const sessionData = topSessions.map((e) => ({ ...e, percentage: calculatePercentage(e.duration) }));

  return (
    <div className="w-full bg-white p-5 rounded-3xl shadow-sm border border-customBorder tracking-tighter">
      {/* 1. Card Header */}
      <div className="mb-4">
        <h2 className="text-main text-xs font-medium tracking-wide  uppercase  ">TOP SESSIONS</h2>
      </div>

      {/* 2. Session List */}
      <div className="space-y-4">
        {sessionData.length > 0 ? (
          sessionData.map((session, index) => {
            const { minutes, hours } = minToHours(session.duration);
            return (
              <div key={index} className="w-full ">
                {/* Session Info (Name and Time) */}
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-main text-xs font-medium  tracking-wide">{session.title}</span>
                  <span className="text-main text-xs font-medium tracking-wide whitespace-nowrap">
                    {hours}h {minutes}m
                  </span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative w-full h-1.5 bg-background rounded-full overflow-hidden">
                  {/* Animated Progress Bar */}
                  <div
                    className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${progressColor[index]}`}
                    style={{ width: `${session.percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-sm text-black/80 mt-2">create sessions to view your analytics</div>
        )}
      </div>
    </div>
  );
};

export default TopSessionsCard;
