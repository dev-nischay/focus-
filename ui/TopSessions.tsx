"use client";

// Define the data structure for a session
interface Session {
  name: string;
  duration: string; // e.g., "2h 11m"
  progressColor: string; // Tailwind color class, e.g., "bg-purple-900"
  percentage: number; // e.g., 75 for 75% complete
}

const sessionsData: Session[] = [
  {
    name: "Biology - Cell Mito",
    duration: "2h 11m",
    progressColor: "bg-main", // Deep purple from the reference image
    percentage: 30,
  },
  {
    name: "Math - Algebra 1",
    duration: "1h 56m",
    progressColor: "bg-mist-500", // Muted cyan from the reference image
    percentage: 40,
  },
  {
    name: "Physics - Forces",
    duration: "1h 44m",
    progressColor: "bg-yellow-600", // Warm amber from the reference image
    percentage: 45,
  },
  {
    name: "World History - WWI",
    duration: "1h 22m",
    progressColor: "bg-mauve-500", // Teal-green from the reference image
    percentage: 30,
  },
];

const TopSessionsCard = () => {
  return (
    <div className="w-full bg-white p-4 rounded-3xl shadow-sm border border-stone-100  tracking-tighter">
      {/* 1. Card Header */}
      <div className="mb-4">
        <h2 className="text-main text-xs font-medium tracking-wide  uppercase  ">TOP SESSIONS (LAST 7 DAYS)</h2>
      </div>

      {/* 2. Session List */}
      <div className="space-y-4">
        {sessionsData.map((session, index) => (
          <div key={index} className="w-full ">
            {/* Session Info (Name and Time) */}
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-main text-xs font-medium  tracking-wide">{session.name}</span>
              <span className="text-main text-xs font-medium tracking-wide whitespace-nowrap">{session.duration}</span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-1.5 bg-background rounded-full overflow-hidden">
              {/* Animated Progress Bar */}
              <div
                className={`absolute left-0 top-0 h-full rounded-full transition-all duration-1000 ease-out ${session.progressColor}`}
                style={{ width: `${session.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSessionsCard;
