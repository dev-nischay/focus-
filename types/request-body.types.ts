export type userBody = {
  username: string;
  email: string;
  image: string;
};

export type SessionNotesBody = {
  topic: string;
  content: string;
  sessionId: number;
};

export type DashBoardResponse = {
  today: number;
  thisWeek: number;
  allTime: number;
  totalSessions: number;
  topSessions: { createdAt: Date; duration: number; title: string }[];
  weeklyProgress: {
    mon: number;
    tues: number;
    wed: number;
    thu: number;
    fri: number;
    sat: number;
    sun: number;
  };
  recentSessions: { createdAt: Date; duration: number; title: string }[];
};
