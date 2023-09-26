import { writeFile } from 'fs/promises'
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server'
import path from "path";
import { prisma } from "@/_base"
import { timeStampDuration } from '@/lib';
import { getImage } from '@/function/ffmpeg-video-image';
import { getVideoInfo } from '@/function/ffmpeg-video-info';
import { getPreview } from '@/function/ffmpeg-video-preview';

//upload video route
export async function POST(request: NextRequest) {
  try {
    const data = await request.formData()
    const title = data.get("title") as string;
    const description = data.get("description") as string;
    const chips = JSON.parse(data.get("chips") as string)
    const imageSeconds = JSON.parse(data.get("imageSeconds") as string)
    const previewSeconds = JSON.parse(data.get("previewSeconds") as string)
    const file: File | null = data.get('file') as unknown as File

    if (!file) {
      throw Error
    }
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const name = `video-${nanoid()}.mp4`
    const rootDir = path.join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/one-video/${name}`
    )
    await writeFile(rootDir, buffer)
    const image = await getImage(name, Number(imageSeconds));
    const { duration, width, height } = await getVideoInfo(name);
    const { preview } = await getPreview(name, previewSeconds);
    await prisma.card.create({
      data: {
        title, //data
        description, //data
        name, //data
        image, //ffmpeg
        preview, //ffmpeg
        width, //ffmpeg
        height, //ffmpeg
        duration, //ffmpeg
        categories: {
          connect: chips
        },
        slug: `${title.split(" ").join("-")}-${nanoid()}`,
        views: {
          create: {
            count: 0,
          },
        },
        timeStamp: {
          create: {
            time: `${Date.now() + timeStampDuration}`
          }
        },
      }
    });
    
    return NextResponse.json({ status: "success" })
  
  }

  catch {

    return NextResponse.json({ status: "error", banner: {} })

  }
}



