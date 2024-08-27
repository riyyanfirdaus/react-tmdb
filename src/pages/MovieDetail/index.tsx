import { BookmarkFilledIcon, BookmarkIcon, DotFilledIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CircleBar } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import useFetch from "../../hooks/useFetch";
import { Genres, MovieDetailType, MovieResult, RecommendationMovie } from "../../types/movie";
import style from "./MovieDetail.module.css";
import { formatDate, formatDuration } from "../../utils/datetime";
import { useCookies } from "react-cookie";
import { ShowContext } from "../../contexts/showContext";

const MovieDetail = () => {
  const [bookmark, setBookmark] = useState<boolean>(false);
  const [loved, setLoved] = useState<boolean>(false);

  const [cookies] = useCookies(["user"]);

  const showContext = useContext(ShowContext);

  if (!showContext) {
    throw new Error("useContext(ShowContext) must be used within an AuthProvider");
  }

  const { handleShow } = showContext;

  const { id } = useParams<{ id: string }>();
  const { data: mvDetail } = useFetch<MovieDetailType>(`https://api.themoviedb.org/3/movie/${id}`);
  const { data: genresData } = useFetch<{ genres: Genres[] }>("https://api.themoviedb.org/3/genre/movie/list", true, "genres");
  const { data: recomData } = useFetch<RecommendationMovie>(`https://api.themoviedb.org/3/movie/${id}/recommendations`);

  const filteredGenre = genresData?.genres.filter((genre) => {
    return mvDetail?.genres.some((mvGenre) => {
      return mvGenre.id === genre.id;
    });
  });

  const genreName = filteredGenre?.map((genre) => genre.name);

  const watchlistCache = JSON.parse(localStorage.getItem("watchlist") || "{}");
  const favoritesCache = JSON.parse(localStorage.getItem("favorites") || "{}");

  const isBookmark = watchlistCache?.data?.results?.find((res: MovieResult) => res.id === Number(id));
  const isLoved = favoritesCache?.data?.results?.find((res: MovieResult) => res.id === Number(id));

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

      if (data.success) setLoved(true);
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

      if (data.success) setBookmark(true);
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

      if (data.success) setLoved(false);
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

      if (data.success) setBookmark(false);

      console.log(data);
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
    <PageWrapper>
      <section className={style.banner}>
        <img src={`${import.meta.env.VITE_BASE_IMAGE + mvDetail?.backdrop_path || "https://placehold.co/600x400"}`} className={style["bg-thumb"]} alt="" />
        <div className={style.content}>
          <img src={`${import.meta.env.VITE_BASE_IMAGE + mvDetail?.poster_path || "https://placehold.co/600x400"}`} className={style["img-thumb"]} alt="" />
          <div className={style["movie-detail"]}>
            <h2 className={style.title}>{`${mvDetail?.original_title} (${new Date().getFullYear()})`}</h2>
            <p className={style.info}>
              {formatDate(mvDetail?.release_date || "")} <DotFilledIcon /> {genreName?.join(", ")} <DotFilledIcon /> {formatDuration(mvDetail?.runtime || 0)}
            </p>
            <div className={style.action}>
              <div className={style["user-score"]}>
                <CircleBar percentage={mvDetail?.vote_average || 0} colour="white" />{" "}
                <p className={style["user-score-text"]}>
                  User
                  <br />
                  Score
                </p>
              </div>
              {isBookmark || bookmark ? (
                <BookmarkFilledIcon className={style.bookmark} color="white" width={24} height={24} onClick={() => handleRemoveBookmark()} />
              ) : (
                <BookmarkIcon className={style.bookmark} color="white" width={24} height={24} onClick={() => handleBookmark()} />
              )}
              {isLoved || loved ? (
                <HeartFilledIcon className={style.love} color="white" width={24} height={24} onClick={() => handleRemoveLoved()} />
              ) : (
                <HeartIcon className={style.love} color="white" width={24} height={24} onClick={() => handleLoved()} />
              )}
            </div>
            <p className={style.tagline}>{mvDetail?.tagline}</p>
            <div className={style.overview}>
              <p className={style["overview-title"]}>Overview</p>
              <p className={style.caption}>{mvDetail?.overview}</p>
            </div>
          </div>
        </div>
      </section>
      <section className={style.recommendation}>
        <div className={style["wrapper"]}>
          <h2 className={style.title}>Recommendations</h2>
          <div className={style["card-container"]}>
            {recomData?.results.map((data) => (
              <Card key={data.id} {...data} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default MovieDetail;
