import { CookiesProvider } from "react-cookie";
import Navbar from "../Navbar";
import style from "./PageWrapper.module.css";

const PageWrapper = ({ container = false, children }: { container?: boolean; children: React.ReactNode }) => {
  return (
    <CookiesProvider>
      <Navbar />
      <main className={container ? style.container : ""}>{children}</main>
    </CookiesProvider>
  );
};

export default PageWrapper;
