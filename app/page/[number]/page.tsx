import Card from "@/components/card";
import Pagination from "@/components/pagination";
import Wrapper from "@/components/main-wrapper";
import getCards from "@/function/api-call";
import { cardPerPage } from "@/lib";
import { CardType } from "@/types";

export default async function Number({
  params,
}: {
  params: { number: string };
}) {
  const skip: number = Math.abs(((+params.number || 0) - 1) * cardPerPage);

  const { cards, count } = await getCards(
    `/api/all-card?take=${cardPerPage}&skip=${skip}`
  );

  return (
    <Wrapper>
      {cards ? (
        <div className="mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
          {cards.map((card: CardType) => (
            <Card
              key={card.id}
              title={card.title}
              preview={card.preview}
              image={card.image}
              views={card?.views?.count}
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
      <Pagination
        firstPage=""
        link="page/"
        currentPage={+params.number}
        totalItems={count ? count : 0}
      />
    </Wrapper>
  );
}
