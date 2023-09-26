import { FC } from "react";

//component
interface IDescription {
  views: number;
  date: string;
  description: string;
  categories: { id: number; name: string }[];
}

const Description: FC<IDescription> = ({
  views,
  date,
  description,
  categories,
}) => {
  return (
    <div className="w-full mb-[40px] cursor-pointer overflow-hidden min-h-[230px] p-[20px] bg-black rounded-[15px]">
      <div className="flex justify-between">
        <div className="flex">
          {categories?.length ? (
            <>
              {categories.map((item) => (
                <div
                  key={item.id}
                  className="mr-[10px] rounded-[7px] bg-zinc-700 px-[15px] py-[3px]"
                >
                  {item.name}
                </div>
              ))}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="text-[20px]">
          Created: <span className="text-orange-300 ml-[5px]">{date}</span>
        </div>
      </div>
      <div className="text-[35px] mt-[10px]">
        <span className="text-orange-300 ">
          {views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
        </span>{" "}
        viewers.
      </div>
      <div className="mt-[30px] text-[27px]">{description}</div>
    </div>
  );
};

export default Description;
