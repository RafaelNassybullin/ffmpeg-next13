import { writeFile } from 'fs/promises'
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server'
import path from "path";
import { prisma } from "@/_base"

//upload banner route
export async function POST(request: NextRequest) {

  try {
    const data = await request.formData()
    const name = data.get("name") as string;
    const url = data.get("url") as string;

    const file: File | null = data.get('file') as unknown as File
    if (!file) {
      return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const img = `banner-${nanoid()}-${file.name}`

    const rootDir = path.join(
      process.env.ROOT_DIR || process.cwd(),
      `/public/uploads/banner-image/${img}`
    )

    await writeFile(rootDir, buffer)

    const banner = await prisma.banner.create({
      data: {
        name,
        img,
        url
      },
      select: {
        id: true,
        name: true,
        img: true,
        url: true
      }
    })

    return NextResponse.json({ status: "success", banner })
  }

  catch {

    return NextResponse.json({ status: "error", banner: {} })

  }
}