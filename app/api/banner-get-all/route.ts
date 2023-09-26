import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

//banner get all api route
export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const banner = await prisma.banner.findMany({
      orderBy: [{
        id: 'desc'
      }],
    })

    return NextResponse.json({
      status: "success",
      banner
    });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      banner: [],
      count: 0
    });

  }

}