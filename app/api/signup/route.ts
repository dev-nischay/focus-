import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/prisma/db";
import type { ApiError, ApiResponse } from "@/types/response.types";
import { httpStatus } from "@/types/response.types";
import { User } from "@/prisma/generated/client";

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<User> | ApiError>> {
  const requestSchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  try {
    const validate = requestSchema.safeParse(await req.json());

    if (validate.error) {
      const tree = z.treeifyError(validate.error);

      return NextResponse.json(
        {
          success: false,
          error: "Incorrect email or password",
          fieldErrors: tree.properties,
          status: httpStatus.BadRequest,
        },
        { status: httpStatus.BadRequest },
      );
    }

    const alreadyExists = await prisma.user.findUnique({ where: { email: validate.data.email } });

    if (alreadyExists?.email) {
      return NextResponse.json(
        { success: false, error: "user already exists", status: httpStatus.Conflict },
        { status: httpStatus.Conflict },
      );
    }

    const { email, password } = validate.data;
    const username = email.split("@")[0];
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashPassword, username },
    });

    return NextResponse.json({ success: true, data: user, status: httpStatus.Created }, { status: httpStatus.Created });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Something went wrong", status: httpStatus.InternalServerError },
      { status: httpStatus.InternalServerError },
    );
  }
}
