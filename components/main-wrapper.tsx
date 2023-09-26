import { FC } from "react";
import NavBar from "./navbar";
import Banner from "./banner";
import Footer from "./footer";

//component
interface IWrapper {
  children: React.ReactNode;
}

const Wrapper: FC<IWrapper> = ({ children }) => (
  <div className="min-h-full flex flex-col">
    <NavBar />
    <Banner />
    <main className="flex-auto ">{children}</main>
    <Footer />
  </div>
);

export default Wrapper;
