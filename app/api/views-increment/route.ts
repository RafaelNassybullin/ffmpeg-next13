import { prisma } from "@/_base";
import { APIKEY } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

//views increment route
export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  const id = request.nextUrl.searchParams.get('id');
  const value = request.nextUrl.searchParams.get('value');

  try {

    if (apikey) {
      throw Error
    }

    const viewers = await prisma.views.update({
      where: { cardID: Number(id) },
      data: { count: Number(value) },
      select: {
        count: true
      }
    })
    return NextResponse.json({ status: "success", viewers });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      
    });
  }
}
