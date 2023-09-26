import { ChangeEvent, FC, useRef, useState } from "react";

//component
interface IDashBoardFrameSelector {
  previewUrl: string;
  pushImageSeconds: (seconds: number) => void;
  pushPreviewSeconds: (arrayOfSeconds: number[]) => void;
}

const DashBoardFrameSelector: FC<IDashBoardFrameSelector> = ({
  previewUrl,
  pushImageSeconds,
  pushPreviewSeconds,
}) => {
  const videoReference = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState(0);
  const [previewSeconds, setPreviewSeconds] = useState([
    { value: 0 + 8, name: "up" },
    { value: 0 + 14, name: "middle" },
    { value: 0 + 18, name: "down" },
  ]);

  function getCurrentDuration() {
    if (videoReference.current) {
      const current: number = videoReference.current.currentTime;
      const duration: number = videoReference.current.duration;
      pushImageSeconds(current);
      setDuration(duration);
    }
  }

  function changeFrameInputs(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.name === "up") {
      setPreviewSeconds([
        { value: Number(event.target.value), name: "up" },
        { value: previewSeconds[1].value, name: "middle" },
        { value: previewSeconds[2].value, name: "down" },
      ]);
    }
    if (event.target.name === "middle") {
      setPreviewSeconds([
        { value: previewSeconds[0].value, name: "up" },
        { value: Number(event.target.value), name: "middle" },
        { value: previewSeconds[2].value, name: "down" },
      ]);
    }
    if (event.target.name === "down") {
      setPreviewSeconds([
        { value: previewSeconds[0].value, name: "up" },
        { value: previewSeconds[1].value, name: "middle" },
        { value: Number(event.target.value), name: "down" },
      ]);
    }
    pushPreviewSeconds(
      [
        previewSeconds[0].value,
        previewSeconds[1].value,
        previewSeconds[2].value,
      ].sort((a, b) => a - b)
    );
  }

  return (
    <>
      <div className="w-full h-full ">
        <video
          ref={videoReference}
          onTimeUpdate={getCurrentDuration}
          onCanPlay={getCurrentDuration}
          controls
          className="w-full bg-black h-[218px] object-contain"
          src={previewUrl}
        ></video>
        <div className="w-full mt-[5px] h-[78px] ">
          {previewSeconds.map((item) => (
            <div key={item.name} className="mt-[-7px] px-[11px]">
              <input
                name={item.name}
                type="range"
                min="0"
                className="w-[99%] cursor-pointer"
                max={duration}
                onChange={changeFrameInputs}
                style={{
                  backgroundSize: `${(item.value * 100) / duration}% 100%`,
                }}
                value={item.value}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DashBoardFrameSelector;
