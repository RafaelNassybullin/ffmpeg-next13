import { FC } from "react";
import getBannerFirst from "../function/api-call";

interface IBanner {}

const Banner: FC<IBanner> = async () => {
  
  const { banner } = await getBannerFirst("/api/banner-first");

  return (
    <>
      {banner ? (
        <a href={banner?.url} target="_blank" rel="noreferrer">
          <div className="mx-auto w-full cursor-pointer p-4 2xl:container">
            <div className="h-[150px] w-full overflow-hidden rounded-[15px]">
              <img
                className="h-full w-full object-cover"
                src={`/uploads/banner-image/${banner.img}`}
                alt=""
              />
            </div>
          </div>
        </a>
      ) : (
        ""
      )}
    </>
  );
};

export default Banner;
