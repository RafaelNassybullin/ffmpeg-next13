import { FC } from "react";
import Logo from "./logo";
import Search from "./search";
import NavBarSlider from "./navbar-slider";
import getCategoryNames from "../function/api-call";

//component
interface INavBar {}

const NavBar: FC<INavBar> = async () => {
  const { category } = await getCategoryNames("/api/name-category");

  return (
    <>
      <div className="w-full">
        <div className="row mx-auto flex h-[70px] w-full items-center justify-between border-b-[1px] border-b-[color:var(--color-dark-middle)] bg-[color:var(--color-dark-hard)] p-4">
          <Logo />
          <Search />
        </div>
      </div>
      <NavBarSlider data={category} />
    </>
  );
};

export default NavBar;
