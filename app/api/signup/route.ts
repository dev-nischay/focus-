import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/prisma/db";
import type { ApiError, ApiResponse } from "@/types/response.types";
import { getServerSession } from "next-auth";

export type User = {
  id: number;
  email: string;
  username: string;
  image: string;
};
export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse<User> | ApiError>> {
  const schema = z.object({
    email: z.email(),
    password: z.string(),
  });

  try {
    const validate = schema.safeParse(await req.json());

    if (validate.error) {
      const tree = z.treeifyError(validate.error);

      return NextResponse.json({ success: false, error: "Invalid field data", fieldErrors: tree.properties });
    }

    const alreadyExists = await prisma.user.findUnique({ where: { email: validate.data.email } });

    if (alreadyExists?.email) {
      return NextResponse.json({ success: false, error: "user already exists" });
    }

    const { email, password } = validate.data;
    const username = email.split("@")[0];
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashPassword, username },
      select: { id: true, email: true, username: true, image: true },
    });

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Something went wrong" });
  }
}
