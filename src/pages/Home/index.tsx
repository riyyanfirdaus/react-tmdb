import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import style from "./Home.module.css";

const Home = () => {
  return (
    <PageWrapper container>
      <section className={style["now-playing"]}>
        <h2 className={style.title}>Now Playing</h2>
        <div className={style["card-container"]}>
          {Array.from({ length: 10 }).map((_, idx) => (
            <Card key={idx} />
          ))}
        </div>
      </section>
      <section className={style["top-rated"]}>
        <h2 className={style.title}>Top Rated</h2>
        <div className={style["card-container"]}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Card key={idx} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
