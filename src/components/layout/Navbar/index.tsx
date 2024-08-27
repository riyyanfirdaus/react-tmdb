import { Cross1Icon, ExitIcon, HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, NavLink } from "react-router-dom";
import { SearchModal } from "../../common";
import style from "./Navbar.module.css";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [externalPopup, setExternalPopup] = useState<{ proccess: boolean; extWindow: Window | null }>({ proccess: false, extWindow: null });
  const [reqToken, setReqToken] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const connectClick = (request_token: string) => {
    const width = 500;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const url = `https://www.themoviedb.org/auth/access?request_token=${request_token}`;
    const popup = window.open(url, "", `toolbar=0,scrollbars=1,status=1,resizable=0,location=1,menuBar=0,width=${width},height=${height},top=${top},left=${left},popup`);

    if (popup) {
      setExternalPopup({ proccess: true, extWindow: popup });
      setReqToken(request_token);
    } else {
      console.error("Popup blocked or failed to open");
    }
  };

  useEffect(() => {
    if (externalPopup.extWindow) {
      setTimeout(() => {
        createAccessToken(reqToken);
        setExternalPopup({ proccess: false, extWindow: null });
        externalPopup.extWindow?.close();
      }, 10000);
    }
  }, [externalPopup.proccess]);

  const loginAction = async () => {
    try {
      const res = await fetch("https://api.themoviedb.org/4/auth/request_token", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
      });

      const data = await res.json();
      connectClick(data?.request_token);
    } catch (err) {
      console.error(err);
    }
  };

  const createAccessToken = async (request_token: string) => {
    try {
      const res = await fetch("https://api.themoviedb.org/4/auth/access_token", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ request_token: request_token }),
      });

      const data = await res.json();
      setCookie("user", data);
    } catch (err) {
      console.error(err);
    }
  };

  const logoutAction = async () => {
    try {
      const res = await fetch("https://api.themoviedb.org/4/auth/access_token", {
        method: "DELETE",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ access_token: cookies?.user?.access_token }),
      });

      const data = await res.json();
      console.log(data);
      removeCookie("user");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <header className={style.container}>
        <nav className={style.navbar}>
          <Link to={"/"} className={style["brand-logo"]}>
            CINEMA
          </Link>
          <button className={style["mobile-search"]} onClick={() => setIsOpen(true)}>
            <MagnifyingGlassIcon width={20} height={20} /> Search
          </button>
          <div className={style["navbar-list"]}>
            <button className={style.search} onClick={() => setIsOpen(true)}>
              <MagnifyingGlassIcon width={20} height={20} /> Search
            </button>

            {cookies?.user?.access_token ? (
              <NavLink to={"/favorite"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
                Favorite
              </NavLink>
            ) : (
              <button className={style["unauthorized-link"]}>Favorite</button>
            )}
            {cookies?.user?.access_token ? (
              <NavLink to={"/watchlist"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
                Watchlist
              </NavLink>
            ) : (
              <button className={style["unauthorized-link"]}>Watchlist</button>
            )}

            {cookies?.user?.access_token ? (
              <button className={style.logout} onClick={() => logoutAction()}>
                <ExitIcon color="white" /> Logout
              </button>
            ) : (
              <button className={style.login} onClick={() => loginAction()}>
                Login
              </button>
            )}
          </div>
          <button className={style["btn-menu"]} onClick={() => setShow((prev) => !prev)}>
            {show ? <Cross1Icon width={20} height={20} /> : <HamburgerMenuIcon width={20} height={20} />}
          </button>
        </nav>
        <div className={`${style["mobile-navbar-list"]} ${show ? style.show : ""}`}>
          {cookies?.user?.access_token ? (
            <NavLink to={"/favorite"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
              Favorite
            </NavLink>
          ) : (
            <button className={style["unauthorized-link"]}>Favorite</button>
          )}
          {cookies?.user?.access_token ? (
            <NavLink to={"/watchlist"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
              Watchlist
            </NavLink>
          ) : (
            <button className={style["unauthorized-link"]}>Watchlist</button>
          )}

          {cookies?.user?.access_token ? (
            <button className={style.logout} onClick={() => logoutAction()}>
              <ExitIcon color="white" /> Logout
            </button>
          ) : (
            <button className={style.login}>Login</button>
          )}
        </div>
      </header>
      {isOpen && <SearchModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default Navbar;
