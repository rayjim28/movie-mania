import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icons';
import apiUrl from '../../utilities/api-url';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
export default function HomePage({user}) {
 const [movies,setMovies] = useState([]);
 const [status,setStatus] = useState('loading');
 const [message,setMessage] = useState('');
 const [selected,setSelected] = useState(null);
 const [posterFailed,setPosterFailed] = useState(false);
 const [secondaryFailed,setSecondaryFailed] = useState(false);
 const navigate = useNavigate();
 useEffect(() => {
  const controller = new AbortController();
  fetch(apiUrl('/api/movies/featured'), {signal: controller.signal}).then(async r => {const json=await r.json();if(!r.ok) throw new Error(json.error || 'Could not load movies');return json;}).then(data=>{setMovies(data.movies || []);setStatus('ready');}).catch(error=>{if(error.name!=='AbortError'){setMessage(error.message);setStatus('error');}});
  return () => controller.abort();
 }, []);
 const hero = movies[0];
 const heroTitle = hero?.title || hero?.Title || 'Interstellar';
 const heroYear = hero?.year || hero?.Year || '2014';
 return <><section className="discover-hero"><div className="hero-glow"/><div className="hero-content content-width">
  <div className="hero-left"><div className="eyebrow light"><span className="live-dot"/> YOUR NEXT MOVIE STARTS HERE</div><h1>More than a movie.<br/><em>It&apos;s an experience.</em></h1><p>Find your next favorite, discover something unexpected, and build your rental list—all in one place.</p>
  <div className="hero-buttons"><Link className="button-primary" to="/movies"><Icon name="search" size={18}/> Explore movies <Icon name="arrow" size={18}/></Link><a className="button-ghost" href="#featured">Browse the collection <Icon name="arrow" size={18}/></a></div>
  <div className="hero-proof"><span className="proof-line"/>A new way to discover what to watch next</div></div>
  <div className="hero-showcase"><div className="hero-frame-outline" aria-hidden="true"/><span className="showcase-kicker"><span className="live-dot"/> FEATURED FILM</span>
    <div className="hero-poster-main">{hero?.poster && !posterFailed ? <img src={hero.poster} alt={`${heroTitle} movie poster`} onError={() => setPosterFailed(true)}/> : <div className="hero-poster-art"><span>NOW SHOWING</span><strong>{heroTitle}</strong><Icon name="film" size={64}/></div>}</div>
    {movies[1]?.poster && !secondaryFailed && <div className="hero-poster-secondary" aria-hidden="true"><img src={movies[1].poster} alt="" onError={() => setSecondaryFailed(true)}/></div>}
    <div className="hero-feature-info"><span className="feature-overline">EDITOR'S PICK <span>·</span> {heroYear}</span><strong>{heroTitle}</strong><p>{hero?.genre || 'Movie night starts here'}</p><button type="button" onClick={() => hero ? setSelected(hero) : navigate('/movies')}><Icon name="film" size={15}/> See movie details <Icon name="arrow" size={15}/></button></div>
    <span className="hero-orbit" aria-hidden="true"/>
  </div>
 </div><div className="hero-bottom content-width"><span>CURATED FOR MOVIE LOVERS</span><span>SCROLL TO EXPLORE ↓</span></div></section>
 <section className="content-section content-width" id="featured"><div className="section-intro"><div><span className="eyebrow red">01 / THE COLLECTION</span><h2>Find your <em>next favorite.</em></h2><p>Browse what&apos;s making waves, or search for a movie you already have in mind.</p></div><Link to="/movies" className="text-link">Explore all movies <Icon name="north" size={17}/></Link></div>
 {status === 'loading' && <div className="poster-grid">{Array.from({length:6}).map((_,i)=><div className="poster-skeleton" key={i}/>)}</div>}
 {status === 'error' && <div className="notice-card"><h3>We couldn&apos;t load the collection.</h3><p>{message}</p><Link to="/movies" className="button-primary">Search movies <Icon name="arrow" size={17}/></Link></div>}
 {status === 'ready' && (movies.length ? <div className="poster-grid">{movies.slice(0,24).map((movie,i)=><MovieCard key={movie.id} index={i} movie={movie} onDetails={setSelected}/>)}</div> : <div className="notice-card">No featured movies are available right now.</div>)}
 </section>
 <section className="discovery-band content-width"><div><span className="eyebrow">THE GOOD STUFF</span><h2>Search. Discover.<br/><em>Enjoy.</em></h2><p>A simpler way to browse film, explore movie details, and keep track of your rentals.</p><Link className="button-light" to="/movies">Start exploring <Icon name="arrow" size={18}/></Link></div><div className="discovery-band-art"><span>MM</span><Icon name="film" size={88}/></div></section>
 <section className="content-section content-width quick-search"><div className="section-intro"><div><span className="eyebrow red">02 / GET INSPIRED</span><h2>What are you <em>in the mood for?</em></h2></div></div><div className="search-chips">{['Action','Sci-Fi','Drama','Crime','Adventure','Animation'].map(genre => <button key={genre} onClick={() => navigate(`/movies?genre=${encodeURIComponent(genre)}`)}>{genre}<Icon name="north" size={16}/></button>)}</div><p className="small-muted">Browse genre picks from our curated collection, or search the larger OMDb catalog by movie title.</p></section>
 <MovieModal movie={selected} onClose={() => setSelected(null)} onRent={() => {setSelected(null);navigate(user?`/movies?q=${encodeURIComponent(selected?.title || '')}`:'/login');}} actionLabel={user?'Find in movie search':'Sign in to rent'}/></>;
}
