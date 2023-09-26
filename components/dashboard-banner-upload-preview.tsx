import { FC } from "react";

//component
interface IDashboardBannerUploadPreview {
  previewUrl: string;
}

const DashboardBannerUploadPreview: FC<IDashboardBannerUploadPreview> = ({
  previewUrl,
}) => {
  return (
    <>
      <img
        className="w-full h-full object-cover"
        src={previewUrl}
        alt="image-preview"
      />
    </>
  );
};

export default DashboardBannerUploadPreview;
