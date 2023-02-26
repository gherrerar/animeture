import * as LottiePlayer from "@lottiefiles/lottie-player";

export default ({
    id,
    src,
    background = "transparent",
    speed = 1,
    autoplay = false,
    loop = false,
}) => {
    return (
        <lottie-player
            id={id}
            src={src}
            background={background}
            speed={speed}
            autoplay={autoplay && true}
            loop={loop && true}
        ></lottie-player>
    );
};
