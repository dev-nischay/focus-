import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z, { treeifyError } from "zod";
import { FocusSession } from "@/prisma/generated/client";
import { ApiError, ApiResponse, httpStatus } from "@/types/response.types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { calulateDuration } from "@/utils/calculateDuration";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<FocusSession> | ApiError>> {
  const requestSchema = z.object({
    sessionId: z.number(),
  });

  try {
    const session = await getServerSession(authOptions);
    const data = (await req.json()) as { sessionId: number };
    const validate = requestSchema.safeParse(data);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access", status: httpStatus.Unauthorized },
        { status: httpStatus.Unauthorized },
      );
    }

    if (!validate.success) {
      const tree = treeifyError(validate.error);
      console.error(tree.properties);

      return NextResponse.json(
        { error: "Invalid request schema", success: false, status: httpStatus.BadRequest },
        { status: httpStatus.BadRequest },
      );
    }

    const sessionId = validate.data.sessionId;

    const currentSession = await prisma.focusSession.findUnique({
      where: { id: sessionId },
      select: { endTime: true, startTime: true },
    });

    if (!currentSession || currentSession.endTime) {
      return NextResponse.json(
        { error: "focus session must be active to end", success: false, status: httpStatus.Conflict },
        { status: httpStatus.Conflict },
      );
    }

    const endTime = new Date();
    const duration = calulateDuration(currentSession.startTime, endTime);

    const endedSession = await prisma.focusSession.update({
      where: { id: sessionId },
      data: { endTime, duration },
    });

    return NextResponse.json({ success: true, data: endedSession, status: httpStatus.Ok }, { status: httpStatus.Ok });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
