function SearchForm({ query, onQueryChange, onSearch }) {
    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
    }

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <label htmlFor="search-input">Search TV Shows</label>

            <input
                id="search-input"
                type="text"
                placeholder="Enter a TV show name"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
            />

            <button type="submit">Search</button>
        </form>
    );
}

export default SearchForm;