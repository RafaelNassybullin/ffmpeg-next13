import { prisma } from "@/_base"
import { APIKEY } from "@/lib";

import { NextRequest, NextResponse } from "next/server";

//create category api route
export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;
  const category = request.nextUrl.searchParams.get('category');

  try {
    
    if (apikey) {
      throw Error
    }

    if (!category) {
      throw Error
    }

    await prisma.category.create({
      data: {
        name: category
      }
    })

    return NextResponse.json({ status: "success", category });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      category: []
    });
  }
}
