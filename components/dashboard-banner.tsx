import { FC } from "react";
import DashboardBannerItem from "./dashboard-banner-item";
import { Banner } from "@prisma/client";

//component
interface IDashboardBanner {
  getOneBanner: (item: Banner) => void;
  banner: Banner[];
}

const DashboardBanner: FC<IDashboardBanner> = ({ banner, getOneBanner }) => {
  return (
    <>
      {banner.map((item: Banner) => (
        <DashboardBannerItem
          key={item.id}
          image={item.img}
          deleteItem={() => getOneBanner(item)}
        />
      ))}
    </>
  );
};

export default DashboardBanner;
