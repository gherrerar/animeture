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

    function handleChange(e) {
        setInput(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(input);
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
                {animes.map((item) => {
                    return (
                        <Anime
                            key={item.mal_id}
                            title={item.title}
                            srcImg={item.images.jpg.large_image_url}
                            score={item.score}
                        />
                    );
                })}
            </div>
        </div>
    );
};
