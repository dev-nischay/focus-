export const analyticsCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const result = {
    today: 0,
    thisWeek: 0,
    allTime: 0,
    totalSessions: 0,
    weeklyUpdates: [] as { duration: number; createdAt: Date }[],
  };

  const currentDate = new Date();

  for (const { duration, createdAt } of arr) {
    if (currentDate.getUTCDate() === createdAt.getUTCDate()) {
      result.today += duration;
    } // for time spent today

    if (createdAt.getUTCDate() - currentDate.getUTCDate() <= 7) {
      result.thisWeek += duration;
      result.weeklyUpdates.push({ duration, createdAt });
    } // for time spent this week

    if (duration) {
      result.allTime += duration;
    } // for total time spent
  }
  result.totalSessions = arr.length; // for total sessions

  return result;
};

export const topSessionsCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const sorted = arr.sort((a, b) => b.duration! - a.duration!); // top sessions

  return sorted.map((e) => e);
};

export const recentSessionCalculator = (arr: { duration: number; createdAt: Date; title: string }[]) => {
  const now = new Date();

  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const recentSessions = arr.filter((session) => {
    const sessionDate = new Date(session.createdAt);
    return sessionDate >= twentyFourHoursAgo;
  });
  return recentSessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};
