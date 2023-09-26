import prettyMilliseconds from "pretty-ms";
import { publicUploadsDir } from "@/lib";
import { spawnSync } from "child_process";

export async function getVideoInfo(videoFile: string) {
  const path = publicUploadsDir("one-video", videoFile)
  const ffprobe = spawnSync('ffprobe',
    ["-v",
      "error",
      "-select_streams",
      "v:0",
      "-show_entries",
      "stream=width,height,duration",
      "-of",
      "json",
      path],
    { shell: true, encoding: "utf8" }
  );
  const terminalData = JSON.parse(ffprobe.output[1] as string).streams[0];
  const { width, height, duration } = terminalData;
  const toMilliseconds = prettyMilliseconds(Math.round(+duration) * 1000, {
    colonNotation: true,
  });
  return {
    duration: toMilliseconds,
    width,
    height
  }
}