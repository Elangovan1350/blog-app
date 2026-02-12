import { prisma } from "@/components/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email } = await req.json();
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return NextResponse.json(user);
}
