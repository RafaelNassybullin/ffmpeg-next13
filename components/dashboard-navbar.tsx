import Link from "next/link";
import { FC } from "react";
import Logo from "./logo";
import axios from "axios";
import { useRouter } from "next/navigation";
import { APIKEY } from "@/lib";

//component
interface IDashBoardNavBar {
  checked?: string;
}

const DashBoardNavBar: FC<IDashBoardNavBar> = ({ checked }) => {
  const router = useRouter();

  function logOut() {
    axios
      .get("/api/admin-logout", {
        headers: {
          "api-key": APIKEY,
        },
      })
      .then(() => {
        router.push("/admin");
      });
  }

  return (
    <div className="fixed top-0 left-0">
      <div className="relative flex h-[100vh] w-[260px] min-w-[260px] flex-col items-center bg-black py-[25px]">
        <div className="mb-[80px]">
          <Logo />
        </div>

        {["video", "category", "banner"].map((item) => (
          <Link key={item} href={`/dashboard/${item}`} className="mb-[15px]">
            <div
              className={`mr-3 grid cursor-pointer place-items-center rounded-[10px] border-[1px] text-white border-[color:var(--color-dark-middle)] px-2 text-[20px] capitalize text-[color:var(--color-gray)] backdrop-blur-sm hover:border-[var(--color-orange)]  min-w-fit h-[40px] w-[170px] ${
                checked === item
                  ? "border-none bg-[color:var(--color-orange)] text-white hover:text-white"
                  : ""
              } px-5 text-2xl`}
            >
              {item}
            </div>
          </Link>
        ))}

        <div
          onClick={() => logOut()}
          className="absolute bottom-[15px] left-[50%] translate-x-[-50%] cursor-pointer rounded-[10px] bg-red-500 px-4 py-1 text-2xl text-white hover:bg-opacity-80"
        >
          LogOut
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavBar;
