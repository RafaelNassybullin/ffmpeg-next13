import { FC, SyntheticEvent } from "react";
import { XCircleIcon, ArrowDownTrayIcon } from "@heroicons/react/24/solid";

//component dashboard file input
interface IDashboardFileInput {
  children: React.ReactNode;
  previewUrl: string;
  previewDelete: () => void;
  className: string;
  accept: string;
  setFile: (event: SyntheticEvent) => void;
}

const DashboardFileInput: FC<IDashboardFileInput> = ({
  children,
  previewUrl,
  previewDelete,
  setFile,
  className,
  accept,
}) => {
  return (
    <>
      <div className={className}>
        <div className="flex h-full w-full items-center justify-center">
          <label
            htmlFor="dropzone-file"
            className={`flex h-full overflow-hidden w-full cursor-pointer flex-col rounded-lg border-2 border-dashed text-[color:var(--color-orange)] bg-[#373332] border-[color:var(--color-orange)] `}
          >
            {!previewUrl ? (
              <div className="flex hover:bg-[color:var(--color-dark-hard)] hover:bg-opacity-50 h-full flex-col items-center justify-center overflow-hidden ">
                <>
                  <ArrowDownTrayIcon className="w-8 mb-[10px] h-8 text-[color:var(--color-orange)]" />
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                </>
                <input
                  id="dropzone-file"
                  type="file"
                  accept={accept}
                  className="hidden"
                  onChange={setFile}
                />
              </div>
            ) : (
              <div className="relative w-full h-full">
                <div
                  onClick={previewDelete}
                  className="absolute rounded p-[3px] bg-red-600 bottom-[5px] right-[5px]"
                >
                  <XCircleIcon className="h-5 w-5 cursor-pointer text-white" />
                </div>
                {children}
              </div>
            )}
          </label>
        </div>
      </div>
    </>
  );
};

export default DashboardFileInput;
