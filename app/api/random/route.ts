import { prisma } from "@/_base"
import { APIKEY } from "@/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const apikey = request.headers.get("api-key") !== APIKEY;

  const slug = request.nextUrl.searchParams.get('slug');

  try {

    if (apikey) {
      throw Error
    }

    const randomCards = await prisma.$queryRaw` 
    SELECT * FROM "public"."Card" 
    INNER JOIN "public"."Views"
      ON "public"."Views"."cardID" = "public"."Card"."id"
    WHERE "slug" <> ${slug}
    ORDER BY RANDOM() LIMIT 6;
    `;

    return NextResponse.json({ status: "success", randomCards });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      randomCards: []
    });
  }
}
