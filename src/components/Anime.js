import { useRef, useState } from "react";
import icon from "../assets/images/star.svg";
import useDimensions from "../hooks/useDimensions";

export default ({ title, srcImg, score }) => {
    const componentRef = useRef();
    const { width: titleWdth, height } = useDimensions(componentRef);
    const [translate, setTranslate] = useState(0);

    function animateText(e) {
        let parentWdth;
        if (e.target.className == "anime-cell--image") {
            parentWdth = e.target.offsetWidth;
        }
        setTranslate(titleWdth > parentWdth ? titleWdth - parentWdth : 0);
    }
    function returnText() {
        setTranslate(0);
    }

    return (
        <div
            className="anime-cell"
            onMouseOver={animateText}
            onMouseOut={returnText}
        >
            <img className="anime-shadow" src={srcImg} alt="" />
            <img
                className="anime-cell--image"
                src={srcImg}
                loading="lazy"
                alt={title}
            />
            {score != null && (
                <div className="anime-cell--score">
                    <img src={icon} />
                    <span>{score}</span>
                </div>
            )}
            <div className="anime-cell--title">
                <p
                    className="anime-cell--text"
                    ref={componentRef}
                    style={{ right: `${translate}px` }}
                >
                    {title}
                </p>
            </div>
        </div>
    );
};
