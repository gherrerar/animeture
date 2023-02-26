import "../assets/main.css";
import * as LottiePlayer from "@lottiefiles/lottie-player";
import LottieIcon from "./LottieIcon";

export default () => {
    return (
        <>
            <div className="blurry-balls">
                <span style={{ transform: "translate(-80%, -10%)" }} />
                <span style={{ transform: "translate(0, -20%)" }} />
                <span style={{ transform: "translate(80%, -10%)" }} />
            </div>
            <section className="container hero">
                <h1 className="hero--title">Animeture</h1>
                <h2 className="hero--description">
                    Explore os seus animes favoritos em um só lugar
                </h2>
                <a href="#list" id="scroll-down">
                    <LottieIcon
                        src="https://assets10.lottiefiles.com/packages/lf20_zgtlnwqa.json"
                        background="transparent"
                        speed="1"
                        loop
                        autoplay
                    />
                </a>
            </section>
        </>
    );
};
