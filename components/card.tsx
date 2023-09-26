import Link from "next/link";
import { FC } from "react";
import Preview from "./preview";

//component
interface ICard {
  title: string;
  preview: string;
  image: string;
  views?: number;
  slug: string;
  duration: string;
  width: number;
  height: number;
}

const Card: FC<ICard> = ({
  title,
  preview,
  image,
  views,
  slug,
  duration,
  width,
  height,
}) => {
  return (
    <Link
      className="card w-full cursor-pointer overflow-hidden rounded-[10px] border-[2px] border-dashed border-transparent bg-[color:var(--color-card)] hover:border-[color:var(--color-orange)]"
      href={`/video/${slug}`}
    >
      <Preview
        width={width}
        height={height}
        image={image}
        preview={preview}
        title={title}
        views={views}
        duration={duration}
        size="h-[250px]"
      />
      <div className="py-2 px-3 text-xl">
        <p className="text-[color:var(--color-orange)]">{title}</p>
      </div>
    </Link>
  );
};

export default Card;
