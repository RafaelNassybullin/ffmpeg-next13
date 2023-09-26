import { nanoid } from "nanoid";
import prettyMilliseconds from "pretty-ms";
import { publicUploadsDir } from "@/lib";
import { spawnSync } from "child_process";

export async function getImage(videoFile: string, seconds: number) {
  const imageFileName = `image-${nanoid()}.jpg`
  const toMilliseconds = prettyMilliseconds(Math.round(seconds) * 1000, {
    colonNotation: true,
  });
  const video = publicUploadsDir("one-video", videoFile);
  const image = publicUploadsDir("card-image", imageFileName);
  spawnSync('ffmpeg',
    ["-i",
      `${video}`,
      "-ss",
      `${toMilliseconds}`,
      "-frames:v",
      "1",
      `${image}`
    ]);
  return imageFileName
}