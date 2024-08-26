import { Card } from "../../components/common";
import { PageWrapper } from "../../components/layout";
import style from "./Watchlist.module.css";

const Watchlist = () => {
  return (
    <PageWrapper container>
      <section className={style["container"]}>
        <h2 className={style.title}>Your Watchlist</h2>
        <div className={style["card-container"]}>
          {Array.from({ length: 12 }).map((_, idx) => (
            <Card key={idx} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Watchlist;
