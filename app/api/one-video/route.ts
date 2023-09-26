import { APIKEY, timeStampDuration } from "@/lib";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import fs from 'fs';
import path from "path";
import { prisma } from "@/_base"

export async function GET(request: NextRequest) {

  const slug = request.nextUrl.searchParams.get('slug');

  const apikey = request.headers.get("api-key") !== APIKEY;

  try {

    if (apikey) {
      throw Error
    }

    const timeStampCheck = await prisma.card.findUnique({
      where: {
        slug: String(slug)
      },
      select: {
        name: true,
        timeStamp: {
          select: {
            time: true,
          }
        }
      }
    })

    if (Date.now() > Number(timeStampCheck?.timeStamp?.time)) {

      const newName = `video-${nanoid()}-${Date.now()}.mp4`

      const rootDir = path.join(
        process.env.ROOT_DIR || process.cwd(),
        `/public/uploads/one-video/`
      )

      await prisma.card.update({
        where: { slug: String(slug) },
        data: {
          name: newName,
          timeStamp: {
            update: {
              time: `${Date.now() + timeStampDuration}`,
            }
          }
        }
      }).then(() => {

        fs.rename(
          `${rootDir}${timeStampCheck?.name}`,
          `${rootDir}${newName}`,
          () => { }
        );

      })

      const video = await prisma.card.findUnique({
        where: {
          slug: String(slug)
        },
        include: {
          categories: true,
          views: {
            select: {
              count: true,
            }
          },
        }
      })

      return NextResponse.json({ status: "success", video });

    } else {

      const video = await prisma.card.findUnique({
        where: {
          slug: String(slug)
        },
        include: {
          categories: true,
          views: {
            select: {
              count: true,
            }
          },
        }
      })

      return NextResponse.json({ status: "success", video });
    }

  } catch {

    return NextResponse.json({
      status: "error",
      message: "something went wrong",
      video: {}
    });
  }
}