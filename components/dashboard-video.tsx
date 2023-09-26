import { FC } from "react";
import Preview from "./preview";
import Link from "next/link";
import { TrashIcon, PlayPauseIcon } from "@heroicons/react/24/solid";
import { CardType } from "@/types";

//component
interface IDashBoardVideo {
  video: CardType[];
  getOneVideo: (item: CardType) => void;
}

const DashBoardVideo: FC<IDashBoardVideo> = ({ video, getOneVideo }) => {
  return (
    <div className="mx-auto w-full grid grid-cols-1 gap-4 2xl:container lg:grid-cols-3">
      {video.length ? (
        <>
          {video.map((item: CardType) => (
            <div
              key={item.id}
              className="relative w-full cursor-pointer overflow-hidden rounded-[10px] border-[2px] border-dashed border-transparent bg-[color:var(--color-card)] hover:border-[color:var(--color-orange)]"
            >
              <Preview
                width={item.width}
                height={item.height}
                image={item.image}
                preview={item.preview}
                title={item.title}
                views={item?.views?.count}
                duration={item.duration}
                size={"h-[180px]"}
              />

              <div className="py-2 px-3 text-xl">
                <p className="text-[color:var(--color-orange)]">
                  {item.title}
                </p>
              </div>

              <div className="absolute flex top-[3px] right-[3px]">
                <Link
                  href={`/video/${item.slug}`}
                  className="mr-[5px] bg-green-500 p-[4px] rounded-[5px] "
                >
                  <PlayPauseIcon className="h-6 w-6 cursor-pointer text-white" />
                </Link>
                <button
                  onClick={() => getOneVideo(item)}
                  className="bg-red-500 p-[4px] rounded-[5px] "
                >
                  <TrashIcon className="h-6 w-6 cursor-pointer text-white" />
                </button>
              </div>
            </div>
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashBoardVideo;

// <>
//   {j.map(() => (
//     <div className="relative h-[210px] bg-black w-full cursor-pointer overflow-hidden rounded-[10px] border-[2px] border-dashed border-transparent bg-[color:var(--color-card)] hover:border-[color:var(--color-orange)]">
//       <div className="absolute pl-[10px] flex-col justify-center flex bottom-0 left-0 w-full h-[40px] bg-[#292524]">
//         <div className="w-[200px] h-[19px] rounded-[20px] bg-[#FDAB5F]"></div>
//       </div>
//     </div>
//   ))}
// </>
