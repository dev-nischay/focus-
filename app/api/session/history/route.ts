import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/prisma/db";
import { NextResponse } from "next/server";
import { ApiError, ApiResponse, httpStatus } from "@/types/response.types";
import { FocusSession } from "@/prisma/generated/client";
export async function GET(req: NextRequest): Promise<NextResponse<ApiResponse<FocusSession[]> | ApiError>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access", status: httpStatus.Unauthorized },
        { status: httpStatus.Unauthorized },
      );
    }

    const focusSessionHistory = await prisma.focusSession.findMany({ where: { userId: session.user.userId } });

    return NextResponse.json(
      { data: focusSessionHistory, success: true, status: httpStatus.Ok },
      { status: httpStatus.Ok },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong ", success: false, status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
