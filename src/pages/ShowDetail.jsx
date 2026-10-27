import {
    stripHtml,
    formatDate,
    displayValue,
    formatGenres
} from '../utils';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import CastList from '../components/CastList';

function ShowDetail() {
    const { id } = useParams();

    const [show, setShow] = useState(null);
    const [cast, setCast] = useState([]);
    const [status, setStatus] = useState('loading');
    const [castStatus, setCastStatus] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        async function fetchDetails() {
            setStatus('loading');
            setCastStatus('loading');
            setShow(null);
            setCast([]);
            setError('');

            if (!/^\d+$/.test(id)) {
                setError('Invalid show ID.');
                setStatus('error');
                return;
            }

            try {
                const response = await fetch(
                    `https://api.tvmaze.com/shows/${id}`,
                    { signal: controller.signal }
                );

                if (response.status === 404) {
                    throw new Error('This television show could not be found.');
                }

                if (response.status === 429) {
                    throw new Error(
                        'Too many requests. Please wait and try again.'
                    );
                }

                if (!response.ok) {
                    throw new Error('Unable to load show details.');
                }

                const data = await response.json();

                setShow(data);
                setStatus('success');

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message);
                    setStatus('error');
                }
            }
        }

        async function fetchCast() {
            if (!/^\d+$/.test(id)) {
                return;
            }

            try {
                const response = await fetch(
                    `https://api.tvmaze.com/shows/${id}/cast`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error('Unable to load cast.');
                }

                const data = await response.json();

                setCast(data);
                setCastStatus('success');

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setCastStatus('error');
                }
            }
        }

        fetchDetails();
        fetchCast();

        return () => controller.abort();
    }, [id]);

    return (
        <section className="show-detail">
            <Link to="/">← Back to Gallery</Link>

            {status === 'loading' && (
                <p>Loading show details...</p>
            )}

            {status === 'error' && (
                <p role="alert">{error}</p>
            )}

            {status === 'success' && show && (
                <article>
                    <h2>{show.name}</h2>

                    {show.image?.medium && (
                        <img
                            src={show.image.medium}
                            alt={`Poster for ${show.name}`}
                        />
                    )}

                    <p>
                        {stripHtml(show.summary)}
                    </p>

                    <p>
                        <strong>Premiere Date:</strong>{' '}
                        {displayValue(show.premiered)}
                    </p>

                    <p>
                        <strong>Last Updated:</strong>{' '}
                        {formatDate(show.updated)}
                    </p>

                    <p>
                        <strong>Genres:</strong>{' '}
                        {formatGenres(show.genres)}
                    </p>

                    <p>
                        <strong>Average Rating:</strong>{' '}
                        {displayValue(show.rating?.average)}
                    </p>

                    <p>
                        <strong>Status:</strong>{' '}
                        {displayValue(show.status)}
                    </p>

                    <p>
                        <strong>Network or Streaming Channel:</strong>{' '}
                        {displayValue(show.network?.name ||
                            show.webChannel?.name ||
                            'Not available')}
                    </p>

                    <h3>Full Cast</h3>

                    {castStatus === 'loading' && (
                        <p>Loading cast...</p>
                    )}

                    {castStatus === 'error' && (
                        <p>Cast information could not be loaded.</p>
                    )}

                    {castStatus === 'success' && (
                        <CastList cast={cast} limit={15} />
                    )}

                    {show.url && (
                        <p>
                            <a
                                href={show.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View on TVmaze
                            </a>
                        </p>
                    )}
                </article>
            )}
        </section>
    );
}

export default ShowDetail;