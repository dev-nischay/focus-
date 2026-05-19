import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { ApiResponse, httpStatus, ApiError } from "@/types/response.types";
import { prisma } from "@/prisma/db";
import { analyticsCalculator, topSessionsCalculator, recentSessionCalculator, convertToDays } from "@/utils/analytics";
import { DashBoardResponse } from "@/types/request-body.types";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<DashBoardResponse | []> | ApiError>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access", status: httpStatus.Unauthorized },
        { status: httpStatus.Unauthorized },
      );
    }

    const userData = (await prisma.focusSession.findMany({
      where: { userId: session.user.userId, duration: { not: null } },
      select: { duration: true, createdAt: true, title: true },
    })) as { duration: number; title: string; createdAt: Date }[];

    if (userData.length === 0) {
      return NextResponse.json(
        {
          status: httpStatus.Ok,
          success: true,
          data: [],
        },
        { status: httpStatus.Ok },
      );
    }

    const topSessions = topSessionsCalculator(userData);

    const analyticsData = analyticsCalculator(userData);

    const recentSessions = recentSessionCalculator(userData);

    const weeklyProgress = convertToDays(analyticsData.weeklyUpdates);

    return NextResponse.json(
      {
        status: httpStatus.Ok,
        success: true,
        data: {
          ...analyticsData,
          topSessions,
          recentSessions,
          weeklyProgress,
        },
      },
      { status: httpStatus.Ok },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
