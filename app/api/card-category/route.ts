import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

import { NextRequest, NextResponse } from "next/server";

//card category api route
export async function GET(request: NextRequest) {

  const take = request.nextUrl.searchParams.get('take');
  const skip = request.nextUrl.searchParams.get('skip');
  const category = request.nextUrl.searchParams.get('category');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const cards = await prisma.category.findFirst({
      where: {
        name: String(category)
      },
      select: {
        card: {
          skip: Number(skip) || 0,
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
        }
      }
    })


    const countCategory = await prisma.category.findFirst({
      where: {
        name: String(category)
      },
      select: {
        _count: {
          select: {
            card: true
          }
        }
      }
    })

    const count = countCategory?._count.card;
    const categoryCard = cards?.card;

    return NextResponse.json({ status: "success", categoryCard, count });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      categoryCard: [],
      count: 0
    });
  }
}
