import z, { treeifyError } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";
import { ApiResponse, httpStatus } from "@/types/response.types";
import { SessionNotesBody } from "@/types/request-body.types";
import { prisma } from "@/prisma/db";
import { SessionNotes } from "@/prisma/generated/client";
import { ApiError } from "@/types/response.types";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<SessionNotes> | ApiError>> {
  const requestSchema = z.object({
    content: z.string(),
    sessionId: z.int(),
  });

  try {
    const data = (await req.json()) as SessionNotesBody;
    const session = await getServerSession(authOptions);
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

    const { content, sessionId } = validate.data;

    const focusSession = await prisma.focusSession.findUnique({ where: { id: sessionId }, select: { endTime: true } });

    if (!focusSession || focusSession.endTime) {
      return NextResponse.json(
        { error: "session must exist and be active to add notes", success: false, status: httpStatus.Conflict },
        { status: httpStatus.Conflict },
      );
    }

    const notes = await prisma.sessionNotes.upsert({
      create: { content, sessionId, userId: session.user.userId },
      update: { content },
      where: { sessionId, userId: session.user.userId },
    });

    return NextResponse.json(
      { data: notes, success: true, status: httpStatus.Created },
      { status: httpStatus.Created },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access", status: httpStatus.Unauthorized },
        { status: httpStatus.Unauthorized },
      );
    }

    const notes = await prisma.sessionNotes.findMany({ where: { userId: session.user.userId } });

    // CHECK IN THE FRONTEND TO HANDLE EMPTY NOTES ARRAY

    return NextResponse.json({ data: notes, success: true, status: httpStatus.Ok }, { status: httpStatus.Ok });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
