import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

//all card api route
export async function GET(request: NextRequest) {

  const take = request.nextUrl.searchParams.get('take');
  const skip = request.nextUrl.searchParams.get('skip');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const cards = await prisma.card.findMany({
      skip: Number(skip),
      take: Number(take),
      orderBy: [{
        id: 'desc'
      }],
      include: {
        views: {
          select: {
            count: true,
          }
        },
      }
    });

    const count = await prisma.card.count();

    return NextResponse.json({ status: "success", cards, count });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      cards: []
    });
  }
}
