"use client";
import DashboardBanner from "@/components/dashboard-banner";
import DashboardBannerInputs from "@/components/dashboard-banner-inputs";
import Wrapper from "@/components/dashboard-wrapper";
import { APIKEY } from "@/lib";
import axios from "axios";
import { useEffect, useState } from "react";
import { Banner } from "@prisma/client";

//page
export default function BannerDashboardPage() {
  const [banner, setBanner] = useState({} as Banner);
  const [bannerData, setBannerData] = useState([] as Banner[]);

  function getBanners() {
    axios
      .get("/api/banner-get-all", {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then((item) => setBannerData(item.data.banner));
  }

  function deleteBanner() {
    axios
      .get(`/api/delete-banner?id=${banner.id}`, {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        setBannerData(
          bannerData.filter((item: Banner) => item.id !== banner.id)
        );
        setBanner({} as Banner);
      });
  }

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <>
      <Wrapper
        deleteModalID={banner.id}
        confirmDeleteHandler={deleteBanner}
        closeDeleteModal={() => setBanner({} as Banner)}
        checked={"banner"}
        deleteName={banner.name}
        inputs={
          <DashboardBannerInputs
            pushNewBanner={(banner: Banner) => {
              setBannerData([banner, ...bannerData]);
            }}
          />
        }
      >
        <DashboardBanner
          banner={bannerData}
          getOneBanner={(banner: Banner) => setBanner(banner)}
        />
      </Wrapper>
    </>
  );
}
