import Pagination from "@/components/pagination";
import Wrapper from "@/components/main-wrapper";
import getCardCategory from "@/function/api-call";
import { cardPerPage } from "@/lib";
import { CardType } from "@/types";
import Card from "@/components/card";

//page
export default async function CategoryPage({
  params,
}: {
  params: { item: string };
}) {
  const { categoryCard, count } = await getCardCategory(
    `/api/card-category?category=${params.item}&take=${cardPerPage}&skip=${0}`
  );

  return (
    <Wrapper>
      {categoryCard ? (
        <div className="mx-auto grid grid-cols-1 gap-4 p-4 2xl:container lg:grid-cols-3">
          {categoryCard.map((card: CardType) => (
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
        firstPage={`category/${params.item as string}/`}
        link={`category/${params.item as string}/`}
        currentPage={1}
        totalItems={count ? count : 0}
      />
    </Wrapper>
  );
}
