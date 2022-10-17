import { useState } from "react";
import Accordion from "../Acordion/Acordion";
import { useGetSearch } from "../api";
import "./Search.css";

const Search = ({ setResult, fetchKey }) => {
  const [order, setOrder] = useState("");
  const [direction, setDirection] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchResult = useGetSearch(searchInput, order, direction);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(searchResult, fetchKey);
    setSearchInput("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="formSearch">
        <Accordion name="buttonFilter">
          <fieldset className="filter">
            <fieldset>
              <legend>Ordenar por</legend>
              <label>
                Fecha
                <input
                  type="radio"
                  name="order"
                  value="date"
                  onChange={() => setOrder("date")}
                />
              </label>
              <label>
                Título
                <input
                  type="radio"
                  name="order"
                  value="title"
                  onChange={() => setOrder("title")}
                />
              </label>
              <label>
                Valoración
                <input
                  type="radio"
                  name="order"
                  value="valoracion"
                  onChange={() => setOrder("vote")}
                />
              </label>
            </fieldset>
            <fieldset>
              <legend>Ordenar por dirección</legend>
              <label>
                Ascendente
                <input
                  type="radio"
                  name="direction"
                  value="ASC"
                  onChange={() => setDirection("ASC")}
                />
              </label>
              <label>
                Descendente
                <input
                  type="radio"
                  name="direction"
                  value="DESC"
                  onChange={() => setDirection("DESC")}
                />
              </label>
            </fieldset>
            <button>filtrar</button>
          </fieldset>
        </Accordion>
        <label htmlFor="search">
          <input
            className="inputSearch"
            id="search"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            placeholder="Introduce tú búsqueda"
          />
        </label>
        <button className="buttonSearch">🔍</button>
      </form>
    </>
  );
};

export default Search;
