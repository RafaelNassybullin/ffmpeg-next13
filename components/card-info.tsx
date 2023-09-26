import { FC } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

//component
interface ICardInfo {
  views?: number;
  duration: string;
}

const CardInfo: FC<ICardInfo> = ({ views, duration }) => {
  return (
    <>
      <div className="row absolute bottom-4 left-4 flex w-fit items-center gap-2 rounded-[5px] bg-[color:var(--color-card)] bg-opacity-80 px-2 text-lg text-white">
        <EyeIcon className="w-5 h-5" />
        {views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
      </div>

      <div className="absolute bottom-4 right-4 w-fit rounded-[5px] bg-[color:var(--color-card)] bg-opacity-80 px-2 text-lg text-white">
        {duration}
      </div>
    </>
  );
};

export default CardInfo;
