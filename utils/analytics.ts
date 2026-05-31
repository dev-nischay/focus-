export const analyticsCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const result = {
    today: 0,
    thisWeek: 0,
    allTime: 0,
    totalSessions: 0,
    weeklyUpdates: [] as { duration: number; createdAt: Date }[],
  };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeekWindow = new Date(startOfToday);
  startOfWeekWindow.setDate(startOfWeekWindow.getDate() - 6);

  for (const { duration, createdAt } of arr) {
    const sessionDate = new Date(createdAt);
    const sessionDayStart = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());

    if (sessionDayStart.getTime() === startOfToday.getTime()) {
      result.today += duration;
    } // for time spent today

    if (sessionDayStart >= startOfWeekWindow && sessionDate <= now) {
      result.thisWeek += duration;
      result.weeklyUpdates.push({ duration, createdAt });
    } // for time spent this week

    result.allTime += duration; // for total time spent
  }
  result.totalSessions = arr.length; // for total sessions

  return result;
};

export const topSessionsCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const sorted = [...arr].sort((a, b) => b.duration - a.duration); // top sessions

  return sorted.slice(0, 5);
};

export const recentSessionCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const now = new Date();

  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentSessions = arr.filter((session) => {
    const sessionDate = new Date(session.createdAt);
    return sessionDate >= twentyFourHoursAgo;
  });
  return recentSessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);
};

export const convertToDays = (weeklyUpdates: { duration: number; createdAt: Date }[]) => {
  return weeklyUpdates.reduce(
    (acc, curr) => {
      const currentDay = new Date(curr.createdAt).getUTCDay();

      switch (currentDay) {
        case 0:
          acc.sun += curr.duration;
          break;
        case 1:
          acc.mon += curr.duration;
          break;

        case 2:
          acc.tues += curr.duration;
          break;
        case 3:
          acc.wed += curr.duration;
          break;
        case 4:
          acc.thu += curr.duration;
          break;

        case 5:
          acc.fri += curr.duration;
          break;

        case 6:
          acc.sat += curr.duration;
          break;
        default:
          break;
      }

      return acc;
    },
    {
      mon: 0,
      tues: 0,
      wed: 0,
      thu: 0,
      fri: 0,
      sat: 0,
      sun: 0,
    },
  );
};
