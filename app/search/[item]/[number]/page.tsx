import Card from "@/components/card";
import Pagination from "@/components/pagination";
import Wrapper from "@/components/main-wrapper";
import getCardSearch from "@/function/api-call";
import { cardPerPage } from "@/lib";
import { CardType } from "@/types";

//page
export default async function SearchNumberPage({
  params,
}: {
  params: { item: string; number: string };
}) {
  
  const skip: number = Math.abs(((+params.number || 0) - 1) * cardPerPage);

  const { searchCard, count } = await getCardSearch(
    `/api/card-search?search=${params.item}&take=${cardPerPage}&skip=${skip}`
  );

  return (
    <Wrapper>
      {searchCard ? (
        <div className="mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
          {searchCard.map((card: CardType) => (
            <Card
              key={card.id}
              title={card.title}
              preview={card.preview}
              image={card.image}
              views={card.views.count}
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
        firstPage={`search/${params.item as string}/`}
        link={`search/${params.item as string}/`}
        currentPage={+params.number}
        totalItems={count ? count : 0}
      />
    </Wrapper>
  );
}
