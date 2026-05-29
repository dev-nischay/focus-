import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import z, { treeifyError } from "zod";
import { FocusSession } from "@/prisma/generated/client";
import { ApiError, ApiResponse, httpStatus } from "@/types/response.types";
import { prisma } from "@/prisma/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<FocusSession> | ApiError>> {
  const requestSchema = z.object({
    title: z.string(),
    goal: z.string(),
  });

  try {
    const data = (await req.json()) as { title: string; goal: string };
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
    const focusSession = await prisma.focusSession.create({
      data: {
        userId: Number(session.user.userId),
        title: validate.data.title,
        goal: validate.data.goal,
        endTime: null,
        duration: null,
      },
    });

    return NextResponse.json(
      { data: focusSession, success: true, status: httpStatus.Created },
      { status: httpStatus.Created },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Cannot create session at the moment", success: false, status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
