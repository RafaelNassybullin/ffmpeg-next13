import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

import { NextRequest, NextResponse } from "next/server";

//card-search api route
export async function GET(request: NextRequest) {

  const take = request.nextUrl.searchParams.get('take');
  const skip = request.nextUrl.searchParams.get('skip');
  const search = request.nextUrl.searchParams.get('search');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const searchCard = await prisma.card.findMany({
      take: Number(take) || 6,
      skip: Number(skip) || 0,
      where: {
        title: {
          search: String(search).split(" ").join(" | ")
        },
        description: {
          search: String(search).split(" ").join(" | ")
        }
      },
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
    })

    const count = await prisma.card.count({
      where: {
        title: {
          search: String(search).split(" ").join(" | ")
        },
        description: {
          search: String(search).split(" ").join(" | ")
        }
      },
    })

    return NextResponse.json({ status: "success", searchCard, count });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      searchCard: [],
      count: 0
    });
  }
}
