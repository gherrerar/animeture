import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import close from "../assets/images/close.svg";
import star from "../assets/images/star.svg";
import extLink from "../assets/images/link.svg";
import Tag from "./Tag";

export default ({
    handleClose,
    cellId,
    title,
    type,
    srcImg,
    score,
    synop,
    year,
    studios = "",
    numbEps,
    genres,
    link,
}) => {
    function getAnimeDesc() {
        const map = {
            'Movie': "Filme",
            'Special': "Especial",
        };

        let formatedStudios =
            studios !== "" && studios !== false ? ` • ${studios}` : studios;
        let formatedType = map[type] ?? [(numbEps == null) ? 'Sendo exibido' : `${numbEps} EPS.`];

        let result = year + formatedStudios + ` | ${formatedType}`;
        return result;
    }

    return (
        <Backdrop onClick={handleClose}>
            <motion.div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ ease: "easeInOut" }}
            >
                <motion.img
                    className="modal--image"
                    src={srcImg}
                    loading="lazy"
                    alt={title}
                    layoutId={cellId + "_img"}
                />
                <div className="modal--content">
                    <div className="modal--stats">
                        <h2 className="modal--title">{title}</h2>
                        {score !== null && (
                            <motion.div
                                className="modal--score"
                                layoutId={cellId + "_scr"}
                            >
                                <img src={star} />
                                <span>{score}</span>
                            </motion.div>
                        )}
                    </div>
                    <span className="modal--desc">{getAnimeDesc()}</span>
                    <p>{synop.replace("[Written by MAL Rewrite]", "")}</p>

                    <div className="modal--tags">
                        {genres.map((tag) => {
                            return <Tag key={tag.mal_id}>{tag.name}</Tag>;
                        })}
                    </div>

                    <a className="modal--link" href={link} target="_blank">
                        <img src={extLink} />
                        <div data-text="MyAnimeList">
                            <span>MyAnimeList</span>
                        </div>
                    </a>
                </div>
                <button onClick={handleClose} title={"Fechar"}>
                    <img src={close} />
                </button>
            </motion.div>
        </Backdrop>
    );
};
