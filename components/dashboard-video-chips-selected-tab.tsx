import { Category } from "@prisma/client";
import { FC } from "react";

//component
interface IDashboardVideoChipsSelectedTab {
  selectedChips: Category[];
  deleteChips: (id: number) => void;
}

const DashboardVideoChipsSelectedTab: FC<IDashboardVideoChipsSelectedTab> = ({
  selectedChips,
  deleteChips,
}) => {
  return (
    <div className="flex h-full w-[570px] items-center overflow-scroll rounded-[5px] px-[10px] scrollbar-hide">
      {selectedChips.length !== 0 ? (
        <>
          {selectedChips.map((item: Category) => (
            <div
              key={item.id}
              onClick={() => deleteChips(item.id)}
              className="mx-[5px] min-w-fit cursor-pointer rounded-[25px] bg-[color:var(--color-dark-hard)] px-8 py-1 text-[20px] hover:bg-red-500"
            >
              {item.name}
            </div>
          ))}
        </>
      ) : (
        <h4 className="ml-[15px] text-[20px] text-[color:var(--color-gray)]">
          Please select category. . .
        </h4>
      )}
    </div>
  );
};

export default DashboardVideoChipsSelectedTab;
