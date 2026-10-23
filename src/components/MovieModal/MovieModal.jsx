import { useEffect, useState } from 'react';
import Icon from '../Icons';
import apiUrl from '../../utilities/api-url';
import PosterArtwork from '../PosterArtwork/PosterArtwork';

const valuePresent = value => value && value !== 'N/A';
export default function MovieModal({ movie, onClose, onRent, actionLabel, isInCart }) {
 const [detail, setDetail] = useState(null);
 const [error, setError] = useState('');
 const [loading, setLoading] = useState(false);
 const imdbID = movie?.imdbID || (String(movie?.id || '').startsWith('tt') ? movie.id : null);
 useEffect(() => {
   if (!movie) return;
   const previous = document.body.style.overflow;
   const esc = event => {if (event.key === 'Escape') onClose();};
   document.addEventListener('keydown', esc);
   document.body.style.overflow = 'hidden';
   return () => {document.removeEventListener('keydown', esc);document.body.style.overflow = previous;};
 }, [movie, onClose]);
 useEffect(() => {
   setDetail(null); setError(''); setLoading(Boolean(imdbID));
   if (!movie || !imdbID) return;
   const controller = new AbortController();
   fetch(apiUrl(`/api/movies/detail?id=${encodeURIComponent(imdbID)}`), {signal: controller.signal})
    .then(async res => {if (!res.ok) throw new Error('Details unavailable');return res.json();})
    .then(data => {setDetail(data);setLoading(false);})
    .catch(err => {if(err.name !== 'AbortError'){setError('Additional movie details are unavailable.');setLoading(false);}});
   return () => controller.abort();
 }, [movie, imdbID]);
 if (!movie) return null;
 const title = detail?.Title || movie.Title || movie.title || 'Untitled film';
 const poster = valuePresent(detail?.Poster) ? detail.Poster : (movie.Poster || movie.poster);
 const year = detail?.Year || movie.Year || movie.year;
 const genre = detail?.Genre || movie.genre;
 return <div className="modal-overlay" onMouseDown={event => {if (event.target === event.currentTarget) onClose();}}>
  <section className="movie-modal" role="dialog" aria-modal="true" aria-label={`Details for ${title}`}>
   <button type="button" className="modal-close" aria-label="Close details" onClick={onClose}><Icon name="close"/></button>
   <div className="modal-poster"><PosterArtwork key={`${imdbID}:${poster}`} src={poster} title={title} year={year} loading="eager" /></div>
   <div className="modal-copy"><span className="eyebrow">MOVIE SPOTLIGHT</span><h2>{title}</h2>
    <div className="detail-tags"><span>{year || 'Film'}</span>{valuePresent(detail?.Rated) && <span>{detail.Rated}</span>}{valuePresent(detail?.Runtime) && <span>{detail.Runtime}</span>}{valuePresent(detail?.imdbRating) && <span><Icon name="star" size={14}/> {detail.imdbRating} IMDb</span>}</div>
    <p>{valuePresent(detail?.Plot) ? detail.Plot : movie.overview || movie.Plot || 'Explore this movie and add it to your rental list.'}</p>
    {valuePresent(genre) && <p className="modal-sub"><b>Genre</b> {genre}</p>}
    {valuePresent(detail?.Director || movie.Director) && <p className="modal-sub"><b>Director</b> {detail?.Director || movie.Director}</p>}
    {valuePresent(detail?.Actors) && <p className="modal-sub"><b>Cast</b> {detail.Actors}</p>}
    {loading && <p className="small-muted" role="status">Loading movie details…</p>}
    {error && <p className="small-muted">{error}</p>}
    {onRent && <button className="button-primary" type="button" disabled={isInCart} onClick={() => onRent(movie)}><Icon name={isInCart ? 'check' : 'plus'} size={17}/>{isInCart ? 'Already in your list' : actionLabel || 'Add to rentals'}</button>}
   </div>
  </section>
 </div>;
}
