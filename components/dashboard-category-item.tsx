import Link from "next/link";
import { FC, useState } from "react";

//component
interface IDashboardCategoryItem {
  name: string;
  deleteItem: () => void;
}

const DashboardCategoryItem: FC<IDashboardCategoryItem> = ({
  name,
  deleteItem,
}) => {
  const [openCloseX, setOpenCloseX] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setOpenCloseX(true)}
        onMouseLeave={() => setOpenCloseX(false)}
        className="m-[10px] w-fit rounded-[15px] border-[2px] border-dashed border-[color:var(--color-orange)] py-2 px-5 text-3xl capitalize text-white backdrop-blur-sm transition-all "
      >
        <Link href={`/category/${name}`} className="inline cursor-pointer">
          {name}
        </Link>
        <span
          onClick={() => deleteItem()}
          className={`ml-[15px] ${
            openCloseX ? "inline" : "hidden"
          }  cursor-pointer text-red-400`}
        >
          X
        </span>
      </div>
    </>
  );
};

export default DashboardCategoryItem;
