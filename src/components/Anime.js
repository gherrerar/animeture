import { AnimatePresence, motion } from "framer-motion";

import { useRef, useState } from "react";
import star from "../assets/images/star.svg";
import useDimensions from "../hooks/useDimensions";
import Modal from "./Modal";

export default ({
    cellId,
    title,
    type,
    srcImg,
    score,
    synop,
    year,
    studios,
    numbEps,
    genres,
    link,
}) => {
    // Text swipe animation
    const componentRef = useRef();
    const { width: titleWdth } = useDimensions(componentRef);
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

    // Modal
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen((prev) => !prev);
    }

    return (
        <>
            <div
                className="anime-cell"
                onMouseOver={animateText}
                onMouseOut={returnText}
                onClick={toggleModal}
            >
                <img className="anime-shadow" src={srcImg} alt="" />
                <motion.img
                    className="anime-cell--image"
                    src={srcImg}
                    loading="lazy"
                    alt={title}
                    layoutId={cellId + "_img"}
                />
                {score !== null && (
                    <motion.div
                        className="anime-cell--score"
                        layoutId={cellId + "_scr"}
                    >
                        <img src={star} />
                        <span>{score}</span>
                    </motion.div>
                )}
                <div className="anime-cell--title">
                    <p
                        className="anime-cell--text"
                        ref={componentRef}
                        style={{
                            transform: `translate3d(-${translate}px, 0px, 0px)`,
                        }}
                    >
                        {title}
                    </p>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <Modal
                        handleClose={toggleModal}
                        cellId={cellId}
                        title={title}
                        type={type}
                        srcImg={srcImg}
                        score={score}
                        synop={synop}
                        year={year}
                        studios={studios}
                        numbEps={numbEps}
                        genres={genres}
                        link={link}
                    />
                )}
            </AnimatePresence>
        </>
    );
};
