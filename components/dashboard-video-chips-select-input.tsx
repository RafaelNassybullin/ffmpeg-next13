import { Category } from "@prisma/client";
import { FC } from "react";

//component
interface IDashBoardVideoChipsSelect {
  toggleSelect: boolean;
  setToggleSelect: () => void;
  pushChips: (item: Category) => void;
  notSelectedCategories: Category[];
}

const DashBoardVideoChipsSelect: FC<IDashBoardVideoChipsSelect> = ({
  toggleSelect,
  setToggleSelect,
  pushChips,
  notSelectedCategories,
}) => {
  return (
    <div className="absolute top-0 right-0">
      <div
        onClick={setToggleSelect}
        className={`relative flex h-[48px] w-[200px] cursor-pointer items-center rounded-[10px] border-[2px] border-dashed ${
          toggleSelect
            ? "border-[color:var(--color-orange)]"
            : "border-[color:var(--color-gray)]"
        } bg-[color:var(--color-dark-middle)] px-[10px] pl-[15px]`}
      >
        <h3 className="text-2xl text-[color:var(--color-gray)] ">
          Select:
        </h3>

        {toggleSelect ? (
          <ul
            className={`absolute top-[46px] ${
              toggleSelect
                ? "border-[2px] border-t-[0px] border-dashed border-[color:var(--color-orange)]"
                : ""
            } left-0 h-fit max-h-[150px] w-full overflow-x-scroll rounded-b-[10px] bg-[color:var(--color-dark-middle)] scrollbar-hide`}
          >
            <>
              {notSelectedCategories.map((item: Category) => (
                <li
                  key={item.id}
                  onClick={() => pushChips(item)}
                  className="select-none lowercase py-[5px] text-center text-[20px] hover:bg-[color:var(--color-orange)]"
                >
                  {item.name}
                </li>
              ))}
            </>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashBoardVideoChipsSelect;
