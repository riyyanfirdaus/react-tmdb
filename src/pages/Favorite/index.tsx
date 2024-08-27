import { useCookies } from "react-cookie";
import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import useFetch from "../../hooks/useFetch";
import style from "./Favorite.module.css";
import { FavoritesMovie } from "../../types/movie";

const Favorite = () => {
  const [cookies] = useCookies(["user"]);
  const { data } = useFetch<FavoritesMovie>(`https://api.themoviedb.org/4/account/${cookies?.user?.account_id}/movie/favorites`, true, "favorites");

  return (
    <PageWrapper container>
      <section className={style["container"]}>
        <h2 className={style.title}>Your Favorite Movies</h2>
        <div className={style["card-container"]}>
          {data?.results.map((result) => (
            <Card key={result.id} {...result} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Favorite;
