import { FC } from "react";

interface IDashboardUploadProgress {
  progress: number;
  children: React.ReactNode;
}

const DashboardUploadProgress: FC<IDashboardUploadProgress> = ({
  progress,
  children,
}) => {
  return (
    <>
      {progress > 1 && (
        <div
          style={{ width: `${progress}` }}
          className={`mt-[15px] grid h-16 place-items-center rounded-full ${
            progress > 99
              ? "bg-green-400"
              : "bg-[color:var(--color-orange)]"
          }  text-2xl`}
        >
          {progress > 99 ? "Uploading success!" : <>{progress}%</>}
        </div>
      )}

      {progress < 1 && <>{children}</>}
    </>
  );
};

export default DashboardUploadProgress;
