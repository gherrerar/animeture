import remove from "../assets/images/deleteButton.svg";
import { AnimatePresence, motion } from "framer-motion";

export default ({ children, index, removeBtn, onRemove, type }) => {
    return (
        <AnimatePresence>
            <motion.span
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="tag"
            >
                {children}
                {removeBtn && (
                    <button onClick={() => onRemove(type, index)}>
                        <img src={remove} alt="" />
                    </button>
                )}
            </motion.span>
        </AnimatePresence>
    );
}