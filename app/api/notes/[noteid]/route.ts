import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { httpStatus } from "@/types/response.types";
import { prisma } from "@/prisma/db";
import { SessionNotes } from "@/prisma/generated/client";
import { ApiResponse, ApiError } from "@/types/response.types";
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ noteid: string }> },
): Promise<NextResponse<ApiResponse<SessionNotes> | ApiError>> {
  try {
    const session = await getServerSession(authOptions);
    const { noteid } = await params;
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access", status: httpStatus.Unauthorized },
        { status: httpStatus.Unauthorized },
      );
    }

    const note = await prisma.sessionNotes.findUnique({ where: { id: Number(noteid) } });

    if (!note) {
      return NextResponse.json(
        { success: false, error: "session note not found", status: httpStatus.Conflict },
        { status: httpStatus.Conflict },
      );
    }

    return NextResponse.json({ status: httpStatus.Ok, success: true, data: note }, { status: httpStatus.Ok });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
