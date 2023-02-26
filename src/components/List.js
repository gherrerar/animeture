import "../assets/main.css";
import { AnimatePresence, motion } from "framer-motion";

import search from "../assets/images/search.svg";
import filtered from "../assets/images/filter.svg";
import filteredActive from "../assets/images/filterActive.svg";
import studio from "../assets/images/studio.svg";
import tag from "../assets/images/tag.svg";
import year from "../assets/images/calendar.svg";
import anime from "../assets/images/type.svg";
import useFetch from "../hooks/useFetch";
import Tag from "./Tag";
import { useEffect, useRef, useState } from "react";
import AnimeList from "./AnimeList";

export default () => {
    // Search
    const [input, setInput] = useState("");
    const [submit, setSubmit] = useState("");

    // Filter
    const initialFilter = { studios: "", year: "", genres: [] };
    const [filter, setFilter] = useState(initialFilter);
    const initialPlaceholder = "Pesquise por um Anime, p. ex. Naruto";
    const [placeholder, setPlaceholder] = useState(initialPlaceholder);
    const [visible, setVisible] = useState(false);
    const [bookmark, setBookmark] = useState("anime");
    const map = {
        studios: ["Estúdio", "um Estúdio"],
        year: ["Ano", "um Ano de lançamento"],
        genres: ["Gêneros", "Gêneros"],
        anime: ["Anime", "um Anime, p. ex. Naruto"],
    };
    const { response: genres } =
        useFetch("genres/anime");

    // Animes fetch
    const { response: animes, isFetching: animesLoading } =
        submit === "" ? useFetch("top/anime") : useFetch(`anime?q=${submit}`);
    animes.sort((a, b) => {
        return b.score - a.score;
    });

    let groupedGenres = [];
    let filteredAnimes = animes;
    filteredAnimes = filteredAnimes.filter(
        ({ genres, themes, demographics, studios, aired }, index) => {
            groupedGenres = [
                ...groupedGenres,
                [...genres, ...themes, ...demographics].map(
                    ({ name }) => {
                        return name;
                    }
                ),
            ];
            return (
                filter.genres.every(
                    (r) => groupedGenres[index].indexOf(r) >= 0
                ) &&
                (studios[0] !== undefined) && studios[0].name.toLowerCase() ===
                    (filter.studios === ""
                        ? studios[0].name.toLowerCase()
                        : filter.studios.toLowerCase()) 
                &&
                aired.prop.from.year.toString() + "" ===
                    (filter.year === ""
                        ? aired.prop.from.year.toString()
                        : filter.year)
            );
        }
    );


    // Handlers
    function handleChange(e) {
        setInput(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();

        bookmark !== "" && bookmark !== "genres" && bookmark !== "anime"
            ? setFilter((prev) => ({ ...prev, [bookmark]: input }))
            : bookmark === "genres"
            ? setFilter((prev) => ({
                  ...prev,
                  [bookmark]: [...prev.genres, input],
              }))
            : setSubmit(input);
        setInput("");
    }
    function handleFilter(type) {
        setBookmark(type);
        setPlaceholder("Pesquise por " + map[type][1]);
    }
    function removeFilter(id, index) {
        id === "genres"
            ? setFilter((prev) => ({
                  ...prev,
                  genres: prev.genres.filter(
                      (item) => item !== prev.genres[index]
                  ),
              }))
            : id === "anime"
            ? setSubmit("")
            : setFilter((prev) => ({ ...prev, [id]: "" }))
    }

    // function reset(e) {
    //     // e.target.value === "" && setSubmit("");
    //     console.log(submit)
    // }
    
    return (
        <div className="container list" id="list">
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search-bar--input">
                        <img src={search} alt="" />
                        {bookmark !== "" && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {map[bookmark][0]}
                            </motion.span>
                        )}
                        <motion.input
                            layout
                            type={bookmark === "year" ? "number" : "text"}
                            inputMode={bookmark === "year" ? "numeric" : "text"}
                            list={
                                bookmark === "genres" ? "possible-genres" : ""
                            }
                            value={input}
                            onChange={handleChange}
                            // onKeyUp={reset}
                            placeholder={placeholder}
                            title={placeholder}
                        />
                        <button
                            type="button"
                            title="Filtro"
                            onClick={() => setVisible(!visible)}
                        >
                            <img
                                src={visible ? filteredActive : filtered}
                                alt=""
                            />
                        </button>
                    </div>
                    <button className="search-bar--button" type="submit">
                        OK
                    </button>

                    <datalist id="possible-genres">
                        {genres.map((gnr) => {
                            return <option key={gnr.mal_id} value={gnr.name} />;
                        })}
                    </datalist>
                </form>

                <AnimatePresence>
                    {visible && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "fit-content", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ ease: "easeInOut" }}
                            className="search-bar--expandable"
                        >
                            <div className="search-bar--bookmarks">
                                <button
                                    onClick={() => handleFilter("studios")}
                                    title="Estúdio"
                                >
                                    <img src={studio} alt="" />
                                    <span>Estúdio</span>
                                </button>
                                <button
                                    onClick={() => handleFilter("year")}
                                    title="Ano"
                                >
                                    <img src={year} alt="" />
                                    <span>Ano</span>
                                </button>
                                <button
                                    onClick={() => handleFilter("genres")}
                                    title="Gêneros"
                                >
                                    <img src={tag} alt="" />
                                    <span>Gêneros</span>
                                </button>
                                <button
                                    onClick={() => handleFilter("anime")}
                                    title="Anime"
                                >
                                    <img src={anime} alt="" />
                                    <span>Anime</span>
                                </button>
                            </div>
                            <div className="search-bar--tags">
                                {submit !== "" && (
                                    <Tag
                                        removeBtn
                                        type={"anime"}
                                        onRemove={removeFilter}
                                    >
                                        {submit}
                                    </Tag>
                                )}
                                {filter.studios !== "" && (
                                    <Tag
                                        removeBtn
                                        type={"studios"}
                                        onRemove={removeFilter}
                                    >
                                        <span>Estúdio</span>
                                        {filter.studios}
                                    </Tag>
                                )}
                                {filter.year !== "" && (
                                    <Tag
                                        removeBtn
                                        type={"year"}
                                        onRemove={removeFilter}
                                    >
                                        <span>Ano</span>
                                        {filter.year}
                                    </Tag>
                                )}
                                {filter.genres.map((gnr, index) => {
                                    return (
                                        <Tag
                                            key={gnr}
                                            index={index}
                                            removeBtn
                                            type={"genres"}
                                            onRemove={removeFilter}
                                        >
                                            {gnr}
                                        </Tag>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimeList
                loading={animesLoading}
                input={input}
                animes={filteredAnimes}
            />
        </div>
    );
};
