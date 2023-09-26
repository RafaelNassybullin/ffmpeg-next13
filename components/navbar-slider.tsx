"use client";
import Link from "next/link";
import { FC } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Category } from "@prisma/client";

//component
interface INavBarSlider {
  data: Category[];
}

const NavBarSlider: FC<INavBarSlider> = ({ data }) => {
  const left = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft - 300;
  };

  const right = () => {
    const slider = document.getElementById("slider");
    slider!.scrollLeft = slider!.scrollLeft + 300;
  };

  return (
    <div className="w-full border-b-[1px] relative overflow-hidden border-b-[color:var(--color-dark-middle)]">
      <div className="w-[94%] h-[45px] flex items-center mx-auto backdrop-blur-sm">
        <div
          onClick={left}
          className="w-[40px] h-full absolute top-0 left-[-40px] grid place-items-center cursor-pointer bg-gradient-to-l from-[color:var(--color-card)] backdrop-blur z-10"
        >
          <ChevronLeftIcon className="w-7 h-7 text-white cursor-pointer hover:text-[var(--color-orange)]" />
        </div>

        <div
          id="slider"
          className="row scroll flex place-items-center overflow-x-scroll scroll-smooth scrollbar-hide first:[&>.category]:ml-[40px]"
        >
          {data.map((item: Category) => (
            <Link
              key={item.id}
              href={`/category/${item.name}`}
              className="mr-3 grid h-[32px] cursor-pointer place-items-center rounded-[10px] border-[1px] border-[color:var(--color-dark-middle)] px-2 text-[20px] capitalize text-[color:var(--color-gray)] backdrop-blur-sm hover:border-[var(--color-orange)] hover:text-[var(--color-orange)] min-w-fit"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div
          onClick={right}
          className="w-[40px] h-full absolute right-[-40px] top-0 grid place-items-center cursor-pointer bg-gradient-to-r from-[color:var(--color-card)] backdrop-blur z-10"
        >
          <ChevronRightIcon className="w-7 h-7 cursor-pointer text-white hover:text-[var(--color-orange)]" />
        </div>
      </div>
    </div>
  );
};

export default NavBarSlider;
