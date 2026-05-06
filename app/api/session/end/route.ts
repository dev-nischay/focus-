import { prisma } from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z, { treeifyError } from "zod";
import { FocusSession } from "@/prisma/generated/client";
import { ApiError, ApiResponse, httpStatus } from "@/types/response.types";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { EndFocusSessionBody } from "@/types/request-body.types";
export async function PATCH(req: NextRequest): Promise<NextResponse<ApiResponse<FocusSession> | ApiError>> {
  const requestSchema = z.object({
    endTime: z.date(),
    sessionId: z.int(),
  });

  try {
    const session = await getServerSession(authOptions);
    const data = (await req.json()) as EndFocusSessionBody;
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

    const { endTime, sessionId } = validate.data;

    const currentSession = await prisma.focusSession.findUnique({
      where: { id: sessionId },
      select: { startTime: true },
    });

    // call the duration function here calculate the duration and save it in the db
    const duration = 12323; // asumming this is calculate version

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

const calulateDuration = (startTime: Date, endTime: Date) => {
  const diffInMs = date2.getTime() - date1.getTime();
  const durationInMinutes = Math.floor(diffInMs / (1000 * 60));

  return durationInMinutes;
};

const date1 = new Date("2026-05-05T18:00:19.581Z");
const date2 = new Date("2026-05-05T21:40:19.581Z");

console.log(calulateDuration(date1, date2));
