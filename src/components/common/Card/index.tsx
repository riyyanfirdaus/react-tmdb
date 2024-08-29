import { BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { ShowContext } from "../../../contexts/showContext";
import { MovieResult } from "../../../types/movie";
import style from "./Card.module.css";
import useFetch from "../../../hooks/useFetch";

const Card = ({ id, poster_path, original_title, release_date }: MovieResult) => {
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [loved, setLoved] = useState<boolean>(false);

  const [cookies] = useCookies(["user"]);

  const showContext = useContext(ShowContext);

  if (!showContext) {
    throw new Error("useContext(ShowContext) must be used within an AuthProvider");
  }

  const { handleShow } = showContext;

  const watchlistCache = JSON.parse(localStorage.getItem("watchlist") || "{}");
  const favoritesCache = JSON.parse(localStorage.getItem("favorites") || "{}");

  const isBookmark = watchlistCache?.data?.results?.find((res: MovieResult) => res.id === id);
  const isLoved = favoritesCache?.data?.results?.find((res: MovieResult) => res.id === id);

  const { fetchData: refetchWatchlist } = useFetch(`https://api.themoviedb.org/4/account/${cookies?.user?.account_id}/movie/watchlist`, true, "watchlist");
  const { fetchData: refetchFavorite } = useFetch(`https://api.themoviedb.org/4/account/${cookies?.user?.account_id}/movie/favorites`, true, "favorites");

  const addFavorite = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/account/${cookies?.user?.account_id}/favorite`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ media_type: "movie", media_id: id, favorite: true }),
      });

      const data = await res.json();

      if (data.success) {
        setLoved(true);
        refetchFavorite();
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const addWatchlist = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/account/${cookies?.user?.account_id}/watchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ media_type: "movie", media_id: id, watchlist: true }),
      });

      const data = await res.json();

      if (data.success) {
        setBookmark(true);
        refetchWatchlist();
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const removeFavorite = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/account/${cookies?.user?.account_id}/favorite`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ media_type: "movie", media_id: id, favorite: false }),
      });

      const data = await res.json();

      if (data.success) {
        setLoved(false);
        refetchFavorite();
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const removeWatchlist = async () => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/account/${cookies?.user?.account_id}/watchlist`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ media_type: "movie", media_id: id, watchlist: false }),
      });

      const data = await res.json();

      if (data.success) {
        setBookmark(false);
        refetchWatchlist();
      }
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : "An unknown error occurred");
    }
  };

  const handleBookmark = () => {
    if (cookies?.user?.access_token) {
      addWatchlist();
    }

    handleShow();
  };

  const handleLoved = () => {
    if (cookies?.user?.access_token) {
      addFavorite();
    }

    handleShow();
  };

  const handleRemoveLoved = () => {
    if (!isLoved) return;

    removeFavorite();
  };

  const handleRemoveBookmark = () => {
    if (!isBookmark) return;

    removeWatchlist();
  };

  return (
    <div className={style.container}>
      <div className={style["image-container"]}>
        <Link to={`/movie/${id}`}>
          <img src={`${import.meta.env.VITE_BASE_IMAGE + poster_path || "https://placehold.co/600x400"}`} className={style["img-thumb"]} alt={original_title} />
        </Link>
        <div className={style["img-detail"]}>
          {isBookmark || bookmark ? <BookmarkFilledIcon color="white" width={20} height={20} onClick={() => handleRemoveBookmark()} /> : <BookmarkIcon color="white" width={20} height={20} onClick={() => handleBookmark()} />}
          {isLoved || loved ? <HeartFilledIcon color="white" width={20} height={20} onClick={() => handleRemoveLoved()} /> : <HeartIcon color="white" width={20} height={20} onClick={() => handleLoved()} />}
        </div>
      </div>
      <div className={style["card-desc"]}>
        <Link to={`/movie/${id}`} className={style["card-title"]}>
          {original_title}
        </Link>
        <p className={style["card-year"]}>{new Date(release_date).getFullYear() || new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default Card;
