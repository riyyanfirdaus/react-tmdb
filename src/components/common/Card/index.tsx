import { BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MovieResult } from "../../../types/movie";

const Card = ({ id, poster_path, original_title, release_date }: MovieResult) => {
  const [bookmark, setBookmark] = useState<boolean>(true);
  const [loved, setLoved] = useState<boolean>(false);

  return (
    <div className={style.container}>
      <div className={style["image-container"]}>
        <Link to={`/movie/${id}`}>
          <img src={`${import.meta.env.VITE_BASE_IMAGE + poster_path || "https://placehold.co/600x400"}`} className={style["img-thumb"]} alt={original_title} />
        </Link>
        <div className={style["img-detail"]}>
          {bookmark ? <BookmarkFilledIcon color="white" width={20} height={20} onClick={() => setBookmark((prev) => !prev)} /> : <BookmarkIcon color="white" width={20} height={20} onClick={() => setBookmark((prev) => !prev)} />}
          {loved ? <HeartFilledIcon color="white" width={20} height={20} onClick={() => setLoved((prev) => !prev)} /> : <HeartIcon color="white" width={20} height={20} onClick={() => setLoved((prev) => !prev)} />}
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
