import usePagination, { dotts } from "@/hook/usePagination";
import { cardPerPage } from "@/lib";
import Link from "next/link";
import { FC } from "react";

interface IPagination {
  totalItems: number;
  currentPage: number;
  itemsPerPage?: number;
  link: string;
  firstPage: string;
}

const Pagination: FC<IPagination> = ({
  totalItems,
  currentPage,
  itemsPerPage = cardPerPage,
  link,
  firstPage,
}) => {
  
  const pages: (string | number)[] = usePagination(
    totalItems,
    currentPage,
    itemsPerPage
  );

  return (
    <div className={`row mt-[80px] flex w-full justify-center gap-4`}>
      {pages.length > 1 ? (
        <>
          {pages.map((pageNumber, i) =>
            pageNumber === dotts ? (
              <div
                key={i}
                className={`grid h-[49px] w-[49px] place-items-center rounded-[10px] bg-[var(--color-card)] text-[27px] text-[color:var(--color-orange)]`}
              >
                {pageNumber}
              </div>
            ) : (
              <Link
                key={i}
                href={
                  pageNumber !== 1 ? `/${link}${pageNumber}` : `/${firstPage}`
                }
              >
                <div
                  className={`grid h-[49px] min-w-[49px] px-[15px]  cursor-pointer place-items-center rounded-[10px] border-[1px] border-[color:var(--color-orange)] text-[27px] ${
                    pageNumber !== currentPage
                      ? "bg-[var(--color-card)] text-[color:var(--color-orange)]"
                      : "bg-[var(--color-orange)]"
                  } text-white`}
                >
                  {pageNumber}
                </div>
              </Link>
            )
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Pagination;
