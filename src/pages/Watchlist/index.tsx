import { useCookies } from "react-cookie";
import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import useFetch from "../../hooks/useFetch";
import { WatchlistMovie } from "../../types/movie";
import style from "./Watchlist.module.css";

const Watchlist = () => {
  const [cookies] = useCookies(["user"]);
  const { data } = useFetch<WatchlistMovie>(`https://api.themoviedb.org/4/account/${cookies?.user?.account_id}/movie/watchlist`, true, "watchlist");

  return (
    <PageWrapper container>
      <section className={style["container"]}>
        <h2 className={style.title}>Your Watchlist</h2>
        <div className={style["card-container"]}>
          {data?.results.map((result) => (
            <Card key={result.id} {...result} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Watchlist;
