

export default ({  }) => {
    <div className="search-bar">
        <form onSubmit={handleSubmit}>
            <div className="search-bar--input">
                <img src={search} alt="" />
                {bookmark !== "" && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {map[bookmark][0]}
                    </motion.span>
                )}
                <motion.input
                    layout
                    type={bookmark === "year" ? "number" : "text"}
                    inputMode={bookmark === "year" ? "numeric" : "text"}
                    list={bookmark === "genres" ? "possible-genres" : ""}
                    value={input}
                    onChange={handleChange}
                    onKeyUp={reset}
                    placeholder={placeholder}
                    title={placeholder}
                />
                <button title="Filtro" onClick={() => setVisible(!visible)}>
                    <img src={visible ? filteredActive : filtered} alt="" />
                </button>
            </div>
            <button className="search-bar--button" type="submit">
                OK
            </button>

            <datalist id="possible-genres">
                {genres.map((gnr) => {
                    return <option key={gnr.mal_id} value={gnr.name} />;
                })}
            </datalist>
        </form>

        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "fit-content", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ ease: "easeInOut" }}
                    className="search-bar--expandable"
                >
                    <div className="search-bar--bookmarks">
                        <button onClick={() => handleFilter("studios")}>
                            <img src={studio} alt="" />
                            <span>Estúdio</span>
                        </button>
                        <button onClick={() => handleFilter("year")}>
                            <img src={calendar} alt="" />
                            <span>Ano</span>
                        </button>
                        <button onClick={() => handleFilter("genres")}>
                            <img src={tag} alt="" />
                            <span>Gêneros</span>
                        </button>
                    </div>
                    <div className="search-bar--tags">
                        {filter.studios !== "" && (
                            <Tag removeBtn>
                                <span>Estúdio</span>
                                {filter.studios}
                            </Tag>
                        )}
                        {filter.year !== "" && (
                            <Tag removeBtn>
                                <span>Ano</span>
                                {filter.year}
                            </Tag>
                        )}
                        {filter.genres.map((gnr) => {
                            return (
                                <Tag key={gnr} removeBtn>
                                    {gnr}
                                </Tag>
                            );
                        })}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>;
}