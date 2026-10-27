import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import './App.css';
import ShowCard from './components/ShowCard';
import { Routes, Route } from 'react-router';
import ShowDetail from './pages/ShowDetail';


function App() {
  const [query, setQuery] = useState('Breaking Bad');
  const [searchTerm, setSearchTerm] = useState('Breaking Bad');
  const [shows, setShows] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  function handleSearch() {
    const trimmedQuery = query.trim();

    if (trimmedQuery === '') {
      setStatus('empty');
      setShows([]);
      setSearchTerm('');
      return;
    }

    setSearchTerm(trimmedQuery);
  }

  useEffect(() => {
    if (!searchTerm) {
      return;
    }

    const controller = new AbortController();

    async function fetchShows() {
      setStatus('loading');
      setError('');

      try {
        const url =
          `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchTerm)}`;

        const response = await fetch(url, {
          signal: controller.signal
        });

        if (response.status === 429) {
          throw new Error(
            'Too many requests. Please wait and try again.'
          );
        }

        if (!response.ok) {
          throw new Error('Unable to retrieve TV shows.');
        }

        const data = await response.json();

        setShows(data.slice(0, 10).map((result) => result.show));
        setStatus(data.length === 0 ? 'no-results' : 'success');

      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setShows([]);
          setStatus('error');
        }
      }
    }

    fetchShows();

    return () => controller.abort();

  }, [searchTerm]);

  return (
    <div className="app">
      <header>
        <h1>TV Show Explorer</h1>
        <p>Search for your favorite television shows.</p>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchForm
                  query={query}
                  onQueryChange={setQuery}
                  onSearch={handleSearch}
                />
                <h2>TV Show Results</h2>

                <p>Current search: {searchTerm || 'None'}</p>

                {status === 'loading' && (
                  <p>Loading TV shows...</p>
                )}

                {status === 'empty' && (
                  <p>Please enter a TV show name.</p>
                )}

                {status === 'no-results' && (
                  <p>No matching television shows were found.</p>
                )}

                {status === 'error' && (
                  <p role="alert">Error: {error}</p>
                )}

                {status === 'success' && (
                  <div>
                    <p>{shows.length} results found.</p>

                    <div className="show-gallery">
                      {shows.map((show) => (
                        <ShowCard
                          key={show.id}
                          show={show}
                        />
                      ))}
                    </div>
                  </div>
                )}

              </>
            }
          />

          <Route
            path="/shows/:id"
            element={<ShowDetail />}
          />
        </Routes>

      </main>

      <footer>
        <p>
          Data provided by{' '}
          <a
            href="https://www.tvmaze.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TVmaze
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;