import LottieIcon from "./LottieIcon";
import Anime from "./Anime";

export default ({ loading, animes, input }) => {
    return (
        <div className="list-view">
            {loading && (
                <LottieIcon
                    id="loading"
                    src="https://assets7.lottiefiles.com/packages/lf20_k3icijdh.json"
                    background="transparent"
                    speed="1"
                    loop
                    autoplay
                />
            )}
            {!loading && animes.length === 0 && (
                <LottieIcon
                    id="not-found"
                    src="https://assets4.lottiefiles.com/packages/lf20_9mxblvp9.json"
                    background="transparent"
                    speed="0.7"
                    autoplay
                />
            )}
            {animes.map((item) => {
                return (
                    <Anime
                        key={item.mal_id}
                        cellId={item.mal_id}
                        title={item.title}
                        type={item.type}
                        srcImg={item.images.webp.large_image_url}
                        score={item.score}
                        synop={item.synopsis ?? "Nenhuma sinopse disponível."}
                        year={item.aired.prop.from.year}
                        studios={
                            item.studios.length !== 0 && item.studios[0].name
                        }
                        numbEps={item.episodes}
                        genres={[
                            ...item.genres,
                            ...item.themes,
                            ...item.demographics,
                        ]}
                        link={item.url}
                    />
                );
            })}
        </div>
    );
};