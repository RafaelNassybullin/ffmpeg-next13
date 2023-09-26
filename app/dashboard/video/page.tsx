"use client";
import DashboardVideo from "@/components/dashboard-video";
import VideoUploadInputs from "@/components/dashboard-video-inputs";
import Wrapper from "@/components/dashboard-wrapper";
import Pagination from "@/components/pagination";
import { APIKEY } from "@/lib";
import { CardType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

// dashboard video page
export default function VideoDashboardPage() {
  const [video, setVideo] = useState({} as CardType);
  const [videoData, setVideoData] = useState([] as CardType[]);
  const [cardCount, setCardCount] = useState<number>(0);

  function getVideos() {
    axios
      .get(`/api/all-card?take=${6}&skip=${0}`, {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then((item) => {
        setVideoData(item.data.cards);
        setCardCount(item.data.count);
      });
  }

  function deleteVideo() {
    axios
      .get(`/api/delete-video?id=${video.id}`, {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        getVideos();
        setVideo({} as CardType);
      });
  }

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <>
      <Wrapper
        deleteModalID={video.id}
        confirmDeleteHandler={deleteVideo}
        closeDeleteModal={() => setVideo({} as CardType)}
        checked={"video"}
        deleteName={video.title}
        inputs={
          <VideoUploadInputs
            refetch={() => {
              getVideos();
            }}
          />
        }
      >
        <DashboardVideo
          video={videoData}
          getOneVideo={(video: CardType) => setVideo(video)}
        />
        <div
          className={`row absolute bottom-0 right-0 mt-[10px] flex w-full justify-center gap-4 py-[20px]`}
        >
          <Pagination
            firstPage="dashboard/video"
            itemsPerPage={6}
            link="dashboard/video/"
            currentPage={1}
            totalItems={cardCount ? cardCount : 0}
          />
        </div>
      </Wrapper>
    </>
  );
}
