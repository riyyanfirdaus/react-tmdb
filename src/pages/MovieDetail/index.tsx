import { BookmarkFilledIcon, BookmarkIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import style from "./MovieDetail.module.css";
import { useState } from "react";

const MovieDetail = () => {
  const [bookmark, setBookmark] = useState<boolean>(true);
  const [loved, setLoved] = useState<boolean>(false);

  return (
    <PageWrapper>
      <section className={style.banner}>
        <img src="https://images.unsplash.com/photo-1702471896913-97a7e7f59745?q=80&w=1632" className={style["bg-thumb"]} alt="" />
        <div className={style.content}>
          <img src="https://images.unsplash.com/photo-1693056598023-91041109861c?q=80&w=1374" className={style["img-thumb"]} alt="" />
          <div className={style["movie-detail"]}>
            <h2 className={style.title}>Deadpool & Wolverine (2024)</h2>
            <p className={style.info}>27/07/2024 . Comedy, Action . 1h 58m</p>
            <div className={style.action}>
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
            <p className={style.tagline}>The world forever change.</p>
            <div className={style.overview}>
              <p className={style["overview-title"]}>Overview</p>
              <p className={style.caption}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae minima officiis, quidem, culpa molestias nisi reprehenderit obcaecati ad vero quas est consectetur aut, fugit inventore ea possimus? Harum, quo aliquid!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={style.recommendation}>
        <div className={style["wrapper"]}>
          <h2 className={style.title}>Recommendations</h2>
          <div className={style["card-container"]}>
            {Array.from({ length: 10 }).map((_, idx) => (
              <Card key={idx} />
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default MovieDetail;
