import { useContext } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { ShowContext } from "../../../contexts/showContext";
import { LoginModal } from "../../common";
import Navbar from "../Navbar";
import style from "./PageWrapper.module.css";

const PageWrapper = ({ container = false, children }: { container?: boolean; children: React.ReactNode }) => {
  const [cookies] = useCookies(["user"]);
  const showContext = useContext(ShowContext);

  if (!showContext) {
    throw new Error("useContext(ShowContext) must be used within an AuthProvider");
  }

  const { isShow, handleShow } = showContext;

  return (
    <CookiesProvider>
      <Navbar />
      <main className={container ? style.container : ""}>{children}</main>
      {!isShow && !cookies?.user?.access_token ? <LoginModal setIsOpen={handleShow} /> : null}
    </CookiesProvider>
  );
};

export default PageWrapper;
