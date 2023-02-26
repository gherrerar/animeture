import { useEffect, useState } from "react";

export default (ref) => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0, top: 0, left: 0 });

    const getDimensions = () => ({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
        top: ref.current.offsetTop,
        left: ref.current.offsetLeft,
    });

    useEffect(() => {
        function handleResize() {
            setDimensions(getDimensions());
        }

        if (ref.current) {
            setDimensions(getDimensions());
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [ref]);

    return dimensions;
};
