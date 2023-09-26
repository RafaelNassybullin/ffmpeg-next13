import { FC } from "react";

//component
interface IDashboardBannerItem {
  image: string;
  deleteItem: () => void;
}

const DashboardBannerItem: FC<IDashboardBannerItem> = ({
  image,
  deleteItem,
}) => {
  return (
    <>
      <div className="relative mb-4 h-[110px] w-full overflow-hidden rounded-[15px] border-[2px] border-dashed border-orange-300 backdrop-blur">
        <img
          src={`/uploads/banner-image/${image}`}
          className="h-full w-full object-cover"
          alt=""
        />
        <div
          onClick={() => deleteItem()}
          className="absolute top-[5px] right-[5px] cursor-pointer rounded bg-red-500 p-1 text-white"
        >
          Delete
        </div>
      </div>
    </>
  );
};

export default DashboardBannerItem;
