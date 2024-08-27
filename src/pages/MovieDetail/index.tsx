import { BookmarkFilledIcon, BookmarkIcon, DotFilledIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CircleBar } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import useFetch from "../../hooks/useFetch";
import { Genres, MovieDetailType, RecommendationMovie } from "../../types/movie";
import style from "./MovieDetail.module.css";
import { formatDate, formatDuration } from "../../utils/datetime";

const MovieDetail = () => {
  const [bookmark, setBookmark] = useState<boolean>(true);
  const [loved, setLoved] = useState<boolean>(false);

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
              {bookmark ? (
                <BookmarkFilledIcon className={style.bookmark} color="white" width={24} height={24} onClick={() => setBookmark((prev) => !prev)} />
              ) : (
                <BookmarkIcon className={style.bookmark} color="white" width={24} height={24} onClick={() => setBookmark((prev) => !prev)} />
              )}
              {loved ? (
                <HeartFilledIcon className={style.love} color="white" width={24} height={24} onClick={() => setLoved((prev) => !prev)} />
              ) : (
                <HeartIcon className={style.love} color="white" width={24} height={24} onClick={() => setLoved((prev) => !prev)} />
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
