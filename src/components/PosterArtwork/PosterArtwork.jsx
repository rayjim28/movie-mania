import { useState } from 'react';
import Icon from '../Icons';

// OMDb sometimes returns Poster: "N/A" and some image hosts reject requests.
// Show a designed movie-title card instead of a broken-image icon.
export default function PosterArtwork({ src, title = 'Untitled film', year, className = '', loading = 'lazy' }) {
  const [failedUrl, setFailedUrl] = useState(null);
  const imageUrl = typeof src === 'string' ? src.trim() : '';
  const hasPoster = imageUrl && imageUrl !== 'N/A' && failedUrl !== imageUrl;
  const variant = [...title].reduce((total, character) => total + character.charCodeAt(0), 0) % 4;

  return hasPoster ? (
    <img className={className} src={imageUrl} alt={`${title} poster`} loading={loading} onError={() => setFailedUrl(imageUrl)} />
  ) : (
    <div className={`poster-artwork poster-artwork--${variant} ${className}`} role="img" aria-label={`Poster unavailable for ${title}`}>
      <div className="poster-artwork__top"><Icon name="film" size={23}/><span>MOVIEMANIA</span></div>
      <div className="poster-artwork__title"><strong>{title}</strong><span>{year || 'FEATURED FILM'}</span></div>
      <span className="poster-artwork__foot">POSTER UNAVAILABLE</span>
    </div>
  );
}
