import { FC } from "react";
import DashboardCategoryItems from "./dashboard-category-item";
import { Category } from "@prisma/client";

//component
interface IDashboardCategoryItems {
  getOneCategory: ({ id, name }: { id: number; name: string }) => void;
  categories: Category[];
}

const DashboardCategory: FC<IDashboardCategoryItems> = ({
  getOneCategory,
  categories,
}) => {
  return (
    <div className="flex w-full flex-wrap px-20">
      {categories ? (
        <>
          {categories.map((item: Category) => (
            <DashboardCategoryItems
              key={item.id}
              name={item.name}
              deleteItem={() => getOneCategory(item)}
            />
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default DashboardCategory;
