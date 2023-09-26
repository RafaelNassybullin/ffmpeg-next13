import { FC, useState } from "react";
import Input from "./input";
import Button from "./button";
import DashboardFileInput from "./dashboard-file-input";
import DashboardBannerUploadPreview from "./dashboard-banner-upload-preview";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import UploadProgress from "./dashboard-upload-progress";
import { Banner } from "@prisma/client";

//component
interface IDashboardBannerInputs {
  pushNewBanner: (banner: Banner) => void;
}

const DashboardBannerInputs: FC<IDashboardBannerInputs> = ({
  pushNewBanner,
}) => {
  const [file, setFile] = useState<File | null>();
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return alert("file is required!");
    }
    if (!name) {
      return alert("name is required!");
    }
    if (!url) {
      return alert("url is required!");
    }
    try {
      const data = new FormData();

      data.set("file", file);
      data.set("name", name);
      data.set("url", url);

      const options: AxiosRequestConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { loaded, total } = progressEvent;
          if (total === undefined) {
            return;
          }
          const percentage = (loaded * 100) / total;
          setProgress(+percentage.toFixed(2));
        },
      };

      await axios
        .post("/api/banner-upload", data, options)
        .then((createdBanner) => pushNewBanner(createdBanner.data.banner));
        
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col">
          <Input
            name={"banner-name"}
            value={name}
            className={"w-[600px]"}
            onChange={(event) =>
              setName((event.target as HTMLInputElement).value)
            }
            type={"text"}
            placeholder={"Type Name Of Banner..."}
          />
          <Input
            name={"banner-url"}
            value={url}
            className={"w-[600px]"}
            onChange={(event) =>
              setUrl((event.target as HTMLInputElement).value)
            }
            type={"text"}
            placeholder={"Paste Url..."}
          />
        </div>
        <div className="mt-[15px] w-[600px] flex flex-col">
          <DashboardFileInput
            accept={"image/*"}
            className={"h-[100px] w-full rounded-[5px]"}
            previewUrl={previewUrl}
            previewDelete={() => setPreviewUrl("")}
            setFile={(event) => {
              setFile((event.target as HTMLInputElement).files?.[0]);
              setPreviewUrl(
                URL.createObjectURL(
                  (event.target as HTMLInputElement).files?.[0] as Blob
                )
              );
            }}
          >
            <DashboardBannerUploadPreview previewUrl={previewUrl} />
          </DashboardFileInput>

          <UploadProgress progress={progress}>
            <Button>Submit</Button>
          </UploadProgress>
        </div>
      </form>
    </>
  );
};

export default DashboardBannerInputs;
