import Icon from '../Icons';
import PosterArtwork from '../PosterArtwork/PosterArtwork';

export default function MovieCard({ movie, onDetails, onRent, actionLabel='Add to rentals', disabled=false, index=0 }) {
 const title = movie.Title || movie.title || 'Untitled film';
 const poster = movie.Poster || movie.poster;
 const year = movie.Year || movie.year || '';
 return <article className="movie-card" style={{'--delay': `${Math.min(index, 9)*45}ms`}}>
   <button className="poster-button" type="button" onClick={() => onDetails?.(movie)} aria-label={`View details for ${title}`}>
     <PosterArtwork key={`${movie.imdbID || movie.id || title}:${poster}`} src={poster} title={title} year={year} />
     <span className="poster-shade"/><span className="poster-view">View details <Icon name="north" size={15}/></span>
   </button>
   <div className="movie-card-meta"><div className="movie-card-title" title={title}>{title}</div><span>{String(year).slice(0,4) || 'Movie'}</span></div>
   {onRent && <button className="card-add" onClick={() => onRent(movie)} disabled={disabled} type="button"><Icon name="plus" size={16}/>{actionLabel}</button>}
 </article>;
}
