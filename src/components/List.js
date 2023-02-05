import "../assets/main.css";
import icon from "../assets/images/search.svg"
import useFetch from "../hooks/useFetch";
import Anime from "./Anime";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import { useState } from "react";

export default () => {
    const [input, setInput] = useState("");
    const [submit, setSubmit] = useState("");
    const { response: animes, isFetching } =
        (submit === "") ? useFetch("top/anime") : useFetch(`anime?q=${submit}`);
    animes.sort((a, b) => {
        return b.score - a.score
    })

    function handleChange(e) {
        setInput(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(input);
    }
    function reset(e) {
        (e.target.value == '') && setSubmit('')
    }

    return (
        <div className="container list" id="list">
            <div className="search-bar">
                <form onSubmit={handleSubmit}>
                    <div className="search-bar--input">
                        <img src={icon} />
                        <input
                            value={input}
                            onChange={handleChange}
                            onKeyUp={reset}
                            placeholder="Pesquise por um Anime, p. ex. Naruto"
                        />
                    </div>
                    <button type="submit">OK</button>
                </form>
            </div>

            <div className="list-view">
                {isFetching && (
                    <lottie-player
                        id="loading"
                        src="https://assets7.lottiefiles.com/packages/lf20_k3icijdh.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    ></lottie-player>
                )}
                {input !== "" && animes.length === 0 && (
                    <lottie-player
                        id="not-found"
                        src="https://assets4.lottiefiles.com/packages/lf20_9mxblvp9.json"
                        background="transparent"
                        speed="0.7"
                        autoplay
                    ></lottie-player>
                )}
                {animes.map((item) => {
                    return (
                        <Anime
                            key={item.mal_id}
                            cellId={item.mal_id}
                            title={item.title}
                            type={item.type}
                            srcImg={item.images.jpg.large_image_url}
                            score={item.score}
                            synop={item.synopsis ?? 'Nenhuma sinopse disponível.'}
                            year={item.aired.prop.from.year}
                            studios={item.studios.length !== 0 && item.studios[0].name}
                            numbEps={item.episodes}
                            genres={[
                                ...item.genres,
                                ...item.themes,
                                ...item.demographics,
                            ]}
                            link={item.url}
                        />
                    );
                })}
            </div>
        </div>
    );
};
