import { prisma } from "@/_base"
import { APIKEY } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const category = await prisma.category.findMany();

    return NextResponse.json({ status: "success", category });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      category: []
    });
  }
}
