import { BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import style from "./Card.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Card = () => {
  const [bookmark, setBookmark] = useState<boolean>(true);
  const [loved, setLoved] = useState<boolean>(false);

  return (
    <div className={style.container}>
      <div className={style["image-container"]}>
        <Link to={"/movie/1"}>
          <img src="https://images.unsplash.com/photo-1693056598023-91041109861c?q=80&w=1374" className={style["img-thumb"]} alt="" />
        </Link>
        <div className={style["img-detail"]}>
          {bookmark ? <BookmarkFilledIcon color="white" width={20} height={20} onClick={() => setBookmark((prev) => !prev)} /> : <BookmarkIcon color="white" width={20} height={20} onClick={() => setBookmark((prev) => !prev)} />}
          {loved ? <HeartFilledIcon color="white" width={20} height={20} onClick={() => setLoved((prev) => !prev)} /> : <HeartIcon color="white" width={20} height={20} onClick={() => setLoved((prev) => !prev)} />}
        </div>
      </div>
      <div className={style["card-desc"]}>
        <Link to={"/movie/1"} className={style["card-title"]}>
          Deadpool & Wolverine
        </Link>
        <p className={style["card-year"]}>2024</p>
      </div>
    </div>
  );
};

export default Card;
