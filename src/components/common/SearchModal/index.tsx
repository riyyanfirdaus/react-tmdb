import { Cross1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import useDebounce from "../../../hooks/useDebounce";
import useFetch from "../../../hooks/useFetch";
import { SearchMovie } from "../../../types/movie";
import Card from "../Card";
import style from "./SearchModal.module.css";

const SearchModal = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const [search, setSearch] = useState<string>("");
  const searchDeabounce = useDebounce<string>(search || "", 500);
  const { data, loading } = useFetch<SearchMovie>(`https://api.themoviedb.org/3/search/movie?query=${searchDeabounce}`);

  return (
    <>
      <div className={style.darkBG} onClick={() => setIsOpen(false)} />
      <div className={style.centered}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <h5 className={style.heading}>Search Movie</h5>
          </div>
          <button className={style.closeBtn} onClick={() => setIsOpen(false)}>
            <Cross1Icon />
          </button>
          <div className={style.modalContent}>
            <input className={style["input-bar"]} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search movie here" />
            <div className={style.result}>
              {!loading && data?.results ? data.results.map((result) => <Card key={result.id} {...result} />) : null}
              {loading && <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;
