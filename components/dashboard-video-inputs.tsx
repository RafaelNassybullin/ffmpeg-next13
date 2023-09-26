import { FC, useState } from "react";
import Input from "./input";
import Button from "./button";
import TextArea from "./dashboard-text-area";
import { CategoryChips } from "./dashboard-video-categorychips";
import DashboardFileInput from "./dashboard-file-input";
import DashBoardFrameSelector from "./dashboard-video-frame-selector";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import UploadProgress from "./dashboard-upload-progress";

//component
interface IVideoUploadInputs {
  refetch: () => void;
}

const VideoUploadInputs: FC<IVideoUploadInputs> = ({ refetch }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [chips, setChips] = useState<{ id: number }[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageSeconds, setImageSeconds] = useState(0);
  const [previewSeconds, setPreviewSeconds] = useState([] as number[]);
  const [progress, setProgress] = useState(0);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return alert("file is required!");
    }
    if (!title) {
      return alert("title is required!");
    }
    if (!description) {
      return alert("description is required!");
    }
    try {
      const data = new FormData();
      data.set("file", file);
      data.set("title", title);
      data.set("description", description);
      data.set("chips", JSON.stringify(chips));
      data.set("imageSeconds", JSON.stringify(Math.round(imageSeconds)));
      data.set("previewSeconds", JSON.stringify(previewSeconds));

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
        .post("/api/upload-video", data, options)
        .then(() => refetch());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className="flex flex-col" onSubmit={onSubmit}>
      <Input
        name={"video-name"}
        value={title}
        onChange={(event) => setTitle((event.target as HTMLInputElement).value)}
        type={"text"}
        placeholder={"Type Video Title..."}
      />

      <div className="flex justify-between">
        <TextArea
          value={description}
          onChange={(event) =>
            setDescription((event.target as HTMLInputElement).value)
          }
        />

        <DashboardFileInput
          previewUrl={previewUrl}
          previewDelete={() => setPreviewUrl("")}
          accept={"video/mp4"}
          className={"h-[290px] w-[53%] mt-[15px] rounded-[5px]"}
          setFile={(event) => {
            setFile((event.target as HTMLInputElement).files?.[0]);
            setPreviewUrl(
              URL.createObjectURL(
                (event.target as HTMLInputElement).files?.[0] as Blob
              )
            );
          }}
        >
          <DashBoardFrameSelector
            pushImageSeconds={(seconds: number) => setImageSeconds(seconds)}
            pushPreviewSeconds={(array: number[]) => setPreviewSeconds(array)}
            previewUrl={previewUrl}
          />
        </DashboardFileInput>
      </div>

      <div className="grid mt-[15px] h-[48px]  w-full place-items-center rounded-[5px] bg-[#373332] text-white">
        <CategoryChips readyToCategoryMutate={(data) => setChips(data)} />
      </div>

      <UploadProgress progress={progress}>
        <Button>Submit</Button>
      </UploadProgress>
    </form>
  );
};

export default VideoUploadInputs;
