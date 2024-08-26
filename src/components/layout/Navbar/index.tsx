import { Cross1Icon, ExitIcon, HamburgerMenuIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Link, NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <header className={style.container}>
      <nav className={style.navbar}>
        <Link to={"/"} className={style["brand-logo"]}>
          CINEMA
        </Link>
        <div className={style["search-bar"]}>
          <input className={style["input-bar"]} placeholder="search movie here" />
          <button className={style["btn-search"]}>
            <MagnifyingGlassIcon />
          </button>
        </div>
        <div className={style["navbar-list"]}>
          <NavLink to={"/favorite"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
            Favorite
          </NavLink>
          <NavLink to={"/watchlist"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
            Watchlist
          </NavLink>
          <button className={style.logout}>
            <ExitIcon color="white" /> Logout
          </button>
        </div>
        <button className={style["btn-menu"]} onClick={() => setShow((prev) => !prev)}>
          {show ? <Cross1Icon width={20} height={20} /> : <HamburgerMenuIcon width={20} height={20} />}
        </button>
      </nav>
      <div className={`${style["mobile-navbar-list"]} ${show ? style.show : ""}`}>
        <NavLink to={"/favorite"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
          Favorite
        </NavLink>
        <NavLink to={"/watchlist"} className={({ isActive }) => [isActive ? style.active : "", style["navbar-item"]].join(" ")}>
          Watchlist
        </NavLink>
        <button className={style.logout}>
          <ExitIcon color="white" /> Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
