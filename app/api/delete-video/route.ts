import { prisma } from "@/_base"
import { APIKEY, publicUploadsDir } from "@/lib";
import { unlink } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {

  const id = request.nextUrl.searchParams.get('id');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const thumbnails = await prisma.card.findUnique({
      where: { id: Number(id) as number },
      select: {
        image: true,
        preview: true,
        name: true
      }
    });

    await prisma.card.update({
      where: { id: Number(id) as number },
      data: {
        views: { delete: true },
        timeStamp: { delete: true }
      }
    });

    await prisma.card.delete({
      where: { id: Number(id) as number },
    })

    const { image, preview, name } = thumbnails as { image: string, preview: string, name: string }

    const videoPath = publicUploadsDir("one-video", name);
    const imagePath = publicUploadsDir("card-image", image);
    const previewPath = publicUploadsDir("card-preview", preview);

    unlink(videoPath, () => console.log("video deleted"));
    unlink(imagePath, () => console.log("image deleted"));
    unlink(previewPath, () => console.log("preview deleted"));

    return NextResponse.json({ status: "success" });

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
    });
  }
}
