"use client";

type DayData = {
  label: string;
  hours: number;
  sessions: number;
};

type WeeklyProgressProps = {
  days?: DayData[];
  /** 0 = Mon … 6 = Sun. Omit to use the viewer’s current weekday. */
  todayIndex?: number;
};

/** Map JS Sunday=0…Saturday=6 to chart index Mon=0 … Sun=6 */
function mondayFirstWeekdayIndex(d = new Date()) {
  const js = d.getDay();
  return js === 0 ? 6 : js - 1;
}

const defaultDays: DayData[] = [
  { label: "Mon", hours: 1.5, sessions: 2 },
  { label: "Tue", hours: 3.0, sessions: 3 },
  { label: "Wed", hours: 2.25, sessions: 2 },
  { label: "Thu", hours: 4.5, sessions: 4 },
  { label: "Fri", hours: 3.75, sessions: 3 },
  { label: "Sat", hours: 2, sessions: 1 },
  { label: "Sun", hours: 4, sessions: 4 },
];

export function WeeklyProgress({ days = defaultDays, todayIndex }: WeeklyProgressProps) {
  const todayIx = todayIndex ?? mondayFirstWeekdayIndex(new Date());
  const maxHours = Math.max(...days.map((d) => d.hours), 1);
  const gridMax = Math.ceil(maxHours / 2) * 2;
  const totalHrs = days.reduce((a, d) => a + d.hours, 0);

  const gridSteps = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-white border border-customBorder shadow rounded-2xl p-5">
      {/* Header */}
      <p className="text-[11px] font-medium tracking-widest uppercase text-[#8B7A63] mb-1">Weekly Progress</p>
      <p className="text-[22px] font-medium text-[#2C2416] leading-none mb-6">
        {totalHrs.toFixed(1)} <span className="text-sm font-normal text-[#8B7A63]">hrs this week</span>
      </p>

      {/* Chart */}
      <div className="relative flex items-end gap-2.5 h-[140px] pb-2">
        {/* Grid lines */}
        <div className="absolute inset-0 bottom-6 pointer-events-none">
          {gridSteps.map((pct) => {
            return (
              <div key={pct} className="absolute left-0 right-0" style={{ bottom: `${pct * 100}%` }}>
                <div className="absolute inset-x-0 h-px bg-[#EBE2D4]" />
                <span
                  className="absolute text-[10px] text-[#B0A090] whitespace-nowrap"
                  style={{ right: "calc(100% + 6px)", transform: "translateY(50%)" }}
                ></span>
              </div>
            );
          })}
        </div>

        {/* Bars */}
        {days.map((day, i) => {
          const isToday = i === todayIx;
          const isEmpty = day.hours === 0;
          const barPct = isEmpty ? 0 : (day.hours / gridMax) * 100;

          return (
            <div key={day.label} className="group relative flex-1 flex flex-col items-center h-full">
              {/* Hover tooltip */}
              <div className="absolute bottom-[calc(100%-18px)] left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white border border-[#D4C5A9] rounded-lg px-2 py-1 text-[11px] font-medium text-[#2C2416] whitespace-nowrap shadow-sm">
                  {day.hours > 0
                    ? `${day.hours}h · ${day.sessions} ${day.sessions === 1 ? "session" : "sessions"}`
                    : "No session"}
                </div>
              </div>

              {/* Bar track */}
              <div className="flex-1 w-full flex items-end">
                {isEmpty ? (
                  <div className="w-full h-1 rounded bg-[#EBE2D4]" />
                ) : (
                  <div
                    className={[
                      "w-full rounded-t-md rounded-b-sm origin-bottom",
                      "transition-all duration-150 group-hover:brightness-90 group-hover:scale-y-[1.02]",
                      isToday ? "bg-[#8B6B3D]" : "bg-[#D4C5A9]",
                    ].join(" ")}
                    style={{ height: `${barPct}%`, minHeight: "4px" }}
                  />
                )}
              </div>

              {/* Day label */}
              <span
                className={[
                  "mt-1.5 text-[11px]",
                  isToday ? "text-[#8B6B3D] font-medium" : "text-[#8B7A63] font-normal",
                ].join(" ")}
              >
                {isToday ? `· ${day.label} ·` : day.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
