import { nameLogo } from "@/lib";
import Link from "next/link";
import { FC } from "react";

//component
interface ILogo {}

const Logo: FC<ILogo> = () => {
  return (
    <Link href={"/"}>
      <div className="grid place-items-center w-full"></div>
      <div className="grid h-[45px] w-[230px] cursor-pointer place-items-center rounded-[10px] bg-[var(--color-orange)] text-white">
        <h1 className="text-[37px] leading-3">{nameLogo}</h1>
      </div>
    </Link>
  );
};

export default Logo;
