import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get('id');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    await prisma.category.delete({
      where: { id: Number(id) }
    })


    return NextResponse.json({ status: "success" });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
}
