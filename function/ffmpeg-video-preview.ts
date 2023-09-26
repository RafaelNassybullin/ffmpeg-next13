import { nanoid } from "nanoid";
import { spawnSync } from "child_process";
import { publicUploadsDir } from "@/lib";

export async function getPreview(videoName: string, secondParts: string[]) {
  const id = nanoid();
  const previewName = `preview-${id}.mp4`;
  const videoPath = publicUploadsDir("one-video", videoName);
  const previewPath = publicUploadsDir("card-preview", previewName);
  spawnSync('ffmpeg',
    ["-i",
      videoPath,
      "-s",
      "640x360",
      "-vf",
      `select='between(t,${Number(secondParts[0])},${Number(secondParts[0]) + 2})+between(t,${Number(secondParts[1])},${Number(secondParts[1]) + 2})+between(t,${Number(secondParts[2])},${Number(secondParts[2]) + 3})',setpts=N/FRAME_RATE/TB`,
      "-af",
      `aselect='between(t,${Number(secondParts[0])},${Number(secondParts[0]) + 2})+between(t,${Number(secondParts[1])},${Number(secondParts[1]) + 2})+between(t,${Number(secondParts[2])},${Number(secondParts[2]) + 3})',asetpts=N/SR/TB`,
      "-an",
      previewPath
    ]);
  return {
    preview: `${previewName}`,
  };
}