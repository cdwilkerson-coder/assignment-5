import {
    stripHtml,
    formatDate,
    displayValue,
    formatGenres
} from '../utils';
import { useEffect, useState } from 'react';
import CastList from './CastList';
import { Link } from 'react-router';

function ShowCard({ show }) {

    const [cast, setCast] = useState([]);
    const [castStatus, setCastStatus] = useState('loading');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchCast() {
            setCastStatus('loading');
            setCast([]);

            try {
                const response = await fetch(
                    `https://api.tvmaze.com/shows/${show.id}/cast`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error('Unable to retrieve cast.');
                }

                const data = await response.json();

                setCast(data);
                setCastStatus('success');

            } catch (error) {
                if (error.name !== 'AbortError') {
                    setCastStatus('error');
                }
            }
        }

        fetchCast();

        return () => controller.abort();
    }, [show.id]);

    const summary = stripHtml(show.summary);
    const premiered = displayValue(show.premiered);
    const updated = formatDate(show.updated);
    const genres = formatGenres(show.genres);
    const rating = displayValue(show.rating?.average);
    
    return (
        <article className="show-card">
            {show.image?.medium && (
                <img
                    src={show.image.medium}
                    alt={`Poster for ${show.name}`}
                    className="show-poster"
                />
            )}

            <div className="show-information">
                <h3>
                    <Link to={`/shows/${show.id}`}>
                        {show.name}
                    </Link>
                </h3>

                <p>{summary}</p>

                <p>
                    <strong>Premiere Date:</strong> {premiered}
                </p>

                <p>
                    <strong>Last Updated:</strong> {updated}
                </p>

                <p>
                    <strong>Genres:</strong> {genres}
                </p>

                <p>
                    <strong>Average Rating:</strong> {rating}
                </p>

                {castStatus === 'loading' && (
                    <p>Loading cast...</p>
                )}

                {castStatus === 'error' && (
                    <p>Cast information could not be loaded.</p>
                )}

                {castStatus === 'success' && (
                    <CastList cast={cast} />
                )}

                <a
                    href={show.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View on TVmaze
                </a>
            </div>
        </article>
    );
}

export default ShowCard;