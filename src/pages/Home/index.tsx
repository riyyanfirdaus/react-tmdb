import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import useFetch from "../../hooks/useFetch";
import { NowPlaying, TopRated } from "../../types/movie";
import style from "./Home.module.css";

const Home = () => {
  const { data: dataNP } = useFetch<NowPlaying>("https://api.themoviedb.org/3/movie/now_playing", true, "now-playing");
  const { data: dataTR } = useFetch<TopRated>("https://api.themoviedb.org/3/movie/top_rated", true, "top-rated");

  return (
    <PageWrapper container>
      <section className={style["now-playing"]}>
        <h2 className={style.title}>Now Playing</h2>
        <div className={style["card-container"]}>
          {dataNP?.results.map((NP) => (
            <Card key={NP.id} {...NP} />
          ))}
        </div>
      </section>
      <section className={style["top-rated"]}>
        <h2 className={style.title}>Top Rated</h2>
        <div className={style["card-container"]}>
          {dataTR?.results.map((TR, idx) => {
            if (idx >= 18) return;

            return <Card key={TR.id} {...TR} />;
          })}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Home;
