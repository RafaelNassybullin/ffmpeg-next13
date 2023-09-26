import { FC } from "react";
import Logo from "./logo";

//component
interface IFooter {}

const Footer: FC<IFooter> = () => {
  return (
    <div
      className="row mt-[90px] flex h-[180px] w-full justify-center backdrop-blur-sm p-[40px] border-t-[2px] border-dashed border-[color:var(--color-orange)]"
    >
      <Logo />
    </div>
  );
};

export default Footer;
