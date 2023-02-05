import { motion } from "framer-motion";

export default ({ onClick, children }) => {
    return (
        <motion.div
            className="backdrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 ,ease: "easeInOut" }}
        >
            {children}
        </motion.div>
    );
};
