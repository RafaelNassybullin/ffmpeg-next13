import {prisma } from "@/_base"

import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs";
import { join } from "path";
import { APIKEY } from "@/lib";

//delete-banner api route
export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get('id');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {
    
    if (apikey) {
      throw Error
    }

    const deleteBanner = await prisma.banner.delete({
      where: { id: Number(id) },
      select: {
        img: true
      }
    })

    const bannerPath = join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/banner-image/${deleteBanner.img}`
    );

    if (deleteBanner.img) {
      unlink(bannerPath, err => console.log(err))
    }

    return NextResponse.json({ status: "success" });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
}
