import Player from "@/components/player";
import getVideo from "@/function/api-call";
import Card from "@/components/card";
import Wrapper from "@/components/main-wrapper";
import Description from "@/components/description";
import { CardType } from "@/types";

//video player page
export default async function VideoPage({
  params,
}: {
  params: { name: string };
}) {
  const { video } = await getVideo(`/api/one-video?slug=${params.name}`);
  const { randomCards } = await getVideo(`/api/random?slug=${params.name}`);
  await getVideo(
    `/api/views-increment?id=${video.id}&value=${Number(video.views.count) + 1}`
  );

  const date = new Date(video.createdAt).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Wrapper>
      <div className="2xl:container mx-auto p-4">
      
        <Player name={video.name} image={video.image} />

        <h2 className="mx-4 my-5 text-[65px] capitalize text-white">
          {video.title}
        </h2>

        <Description
          views={video?.views?.count + 1}
          date={date}
          description={video?.description}
          categories={video?.categories}
        />

        {randomCards ? (
          <div className="2xl:container mx-auto grid grid-cols-3 gap-4">
            {randomCards.map((card: CardType) => (
              <Card
                key={card.id}
                title={card.title}
                preview={card.preview}
                image={card.image}
                views={card?.count}
                slug={card.slug}
                duration={card.duration}
                width={card.width}
                height={card.height}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </Wrapper>
  );
}
