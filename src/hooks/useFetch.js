import axios from "axios";
import { useEffect, useState } from "react";

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4/",
});

export default (url) => {
    const [response, setResponse] = useState([]);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        api.get(url)
            .then((res) => {
                setResponse(res.data.data);
            })
            .finally(() => {
                setIsFetching(false);
            });
    }, [url]);

    return { response, isFetching };
};
