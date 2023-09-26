"use client";
import { FC } from "react";
import { VideoProgress as Video } from "react-video-progress";
import { useState } from "react";
import CardInfo from "./card-info";

//component
interface IPreview {
  width: number;
  height: number;
  image: string;
  preview: string;
  title: string;
  views?: number;
  duration: string;
  size:string;
}

const Preview: FC<IPreview> = ({
  width,
  height,
  image,
  preview,
  title,
  views,
  duration,
  size
}) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div
      onMouseOverCapture={() => setToggle(false)}
      onMouseOutCapture={() => setToggle(true)}
      className={`relative ${size} w-full`}
    >

      {toggle ? (
        <img
          className={`h-full w-full rounded-t-[10px] bg-black ${
            width <= height || width < 640 ? "object-contain" : "object-cover"
          }`}
          src={`/uploads/card-image/${image}`}
          alt={title}
        />
      ) : (
        <Video
          progressStart="TopLeft"
          className={`h-full w-full rounded-t-[10px] bg-black ${
            width <= height || width < 640 ? "object-contain" : "object-cover"
          }`}
          wrapperStyle={{ width: "100%", height: "100%" }}
          pathColor="#fdba75"
          pathWidth="2px"
          pathBorderRadius="0px"
          src={`/uploads/card-preview/${preview}`}
          autoPlay
          loop
          muted
        />
      )}

      <CardInfo views={views} duration={duration} />
    </div>
  );
};

export default Preview;
