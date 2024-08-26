import Navbar from "../Navbar";
import style from "./PageWrapper.module.css";

const PageWrapper = ({ container = false, children }: { container?: boolean; children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className={container ? style.container : ""}>{children}</main>
    </>
  );
};

export default PageWrapper;
