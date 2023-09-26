import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/_base"
import { APIKEY } from "@/lib";


//banner first api route
export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const banner = await prisma.banner.findFirst({
      orderBy: [{
        id: 'desc'
      }],
      select: {
        url: true,
        img: true
      }
    })

    return NextResponse.json({ status: "success", banner });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      banner: {}
    });
  }
}
