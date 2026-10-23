import { useEffect, useState, useCallback, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/Icons';
import apiUrl from '../../utilities/api-url';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieModal from '../../components/MovieModal/MovieModal';
import PosterArtwork from '../../components/PosterArtwork/PosterArtwork';
import { addToCart, checkout, getCart, removeFromCart } from '../../utilities/rentals-api';

const GENRES = ['All films', 'Action', 'Sci-Fi', 'Drama', 'Crime', 'Adventure', 'Animation'];
const PER_PAGE = 10; // OMDb returns ten films at a time.

export default function MoviesPage({ user }) {
 const [params, setParams] = useSearchParams();
 const navigate = useNavigate();
 const query = (params.get('q') || '').trim();
 const activeGenre = GENRES.includes(params.get('genre')) ? params.get('genre') : 'All films';
 const page = Math.max(1, Math.min(100, Number.parseInt(params.get('page'), 10) || 1));
 const [input, setInput] = useState(query);
 const [movies, setMovies] = useState([]);
 const [total, setTotal] = useState(0);
 const [loading, setLoading] = useState(false);
 const [searchError, setSearchError] = useState('');
 const [selected, setSelected] = useState(null);
 const [rentals, setRentals] = useState([]);
 const [cartLoading, setCartLoading] = useState(false);
 const [cartError, setCartError] = useState('');
 const [notice, setNotice] = useState('');
 const [curatedMovies, setCuratedMovies] = useState([]);
 const [providerNote, setProviderNote] = useState('');
 const resultsTop = useRef(null);

 useEffect(() => { setInput(query); }, [query]);
 useEffect(() => {
   const controller = new AbortController();
   fetch(apiUrl('/api/movies/curated'), { signal: controller.signal })
    .then(response => response.ok ? response.json() : Promise.reject(new Error('Collection unavailable')))
    .then(data => setCuratedMovies(data.movies || []))
    .catch(() => {});
   return () => controller.abort();
 }, []);
 useEffect(() => {
   if (query.length < 2) {setMovies([]);setTotal(0);setSearchError('');setProviderNote('');setLoading(false);return;}
   const controller = new AbortController();
   setLoading(true);setSearchError('');setProviderNote('');
   fetch(apiUrl(`/api/movies/search?q=${encodeURIComponent(query)}&page=${page}`), {signal:controller.signal})
    .then(async response => {const data=await response.json();if(!response.ok) throw new Error(data.error || 'Movie search failed');return data;})
    .then(data => {
       setMovies(data.movies || []);setTotal(data.total || 0);
       setSearchError(data.movies?.length ? '' : (data.message || 'No matches found.'));
       setProviderNote(data.source==='curated' ? (data.message || 'Showing starter collection matches.') : '');
       setLoading(false);
    })
    .catch(error => {if(error.name !== 'AbortError'){setMovies([]);setSearchError(error.message);setLoading(false);}});
   return () => controller.abort();
 }, [query,page]);

 const refreshCart = useCallback(async () => {
   if (!user) return;
   try {const cart=await getCart();setRentals(cart.movies || []);setCartError('');}
   catch(error){setCartError(error.message || 'Unable to load your rental list.');}
 },[user]);
 useEffect(() => {refreshCart();}, [refreshCart]);

 function submitSearch(event) {
   event.preventDefault();
   const term=input.trim();
   setParams(term ? {q:term} : {});
 }
 function setGenre(genre) {setInput('');setParams(genre==='All films' ? {} : {genre});}
 function goToPage(next) {
   setParams({q:query,page:String(next)});
   resultsTop.current?.scrollIntoView({behavior:'smooth',block:'start'});
 }
 async function handleRent(movie) {
   if(!user) {navigate('/login');return;}
   const id = movie.imdbID || movie.id;
   if (rentals.some(r => r.imdbID === id)) {setNotice('Already in your rental list.');return;}
   if(!id || !String(id).startsWith('tt')) {setNotice('Find this movie in search before adding it.');return;}
   setCartLoading(true);setNotice('');setCartError('');
   try {
     const now=new Date();const due=new Date(now);due.setDate(due.getDate()+7);
     await addToCart({movie:{imdbID:id,title:movie.Title || movie.title,poster:(movie.Poster || movie.poster) && (movie.Poster || movie.poster)!=='N/A'?(movie.Poster || movie.poster):'/poster-placeholder.svg'},rentalDate:now.toISOString(),returnDate:due.toISOString()});
     await refreshCart();setNotice(`${movie.Title || movie.title} added to your list.`);setSelected(null);
   } catch(error){setCartError(error.message || 'Could not add movie.');}
   finally {setCartLoading(false);}
 }
 async function remove(movie) {setNotice('');setCartLoading(true);setCartError('');try{await removeFromCart(movie.imdbID);await refreshCart();}catch(error){setCartError(error.message || 'Could not remove movie.');}finally{setCartLoading(false);}}
 async function finish(){if(!rentals.length)return;setCartLoading(true);setCartError('');try{await checkout(rentals);setRentals([]);setNotice('Rental confirmed! View your rental history for details.');}catch(error){setCartError(error.message || 'Unable to confirm rental.');}finally{setCartLoading(false);}}

 const cartIds = new Set(rentals.map(movie => movie.imdbID));
 const totalPrice = rentals.reduce((sum,item)=>sum+(Number(item.price)||0),0);
 const visibleCollection = activeGenre === 'All films' ? curatedMovies : curatedMovies.filter(movie => String(movie.genre || movie.Genre || '').toLowerCase().split(',').some(g => g.trim()===activeGenre.toLowerCase() || (activeGenre==='Sci-Fi' && g.trim()==='science fiction')));
 const lastPage = Math.max(1,Math.min(100,Math.ceil(total/PER_PAGE)));
 const firstResult = (page-1)*PER_PAGE+1;
 const lastResult = Math.min(total,page*PER_PAGE);
 return <div className="browse-page content-width">
   <div className="browse-top"><div><div className="eyebrow red">EXPLORE THE COLLECTION</div><h1>Find something <em>worth watching.</em></h1><p>Explore great films, see the details that matter, and plan your next movie night.</p></div><span className="browse-decoration" aria-hidden="true">M<span>✳</span>M</span></div>
   <form className="main-search" onSubmit={submitSearch} role="search"><Icon name="search" size={23}/><input aria-label="Search movie titles" value={input} onChange={event => setInput(event.target.value)} placeholder="Search movie titles, e.g. The Dark Knight"/><button className="button-primary" type="submit">Search <Icon name="arrow" size={18}/></button></form>
   <div className="browse-layout"><section className="browse-results" aria-live="polite" ref={resultsTop}>
     <div className="browse-results-head"><h2>{query ? `Results for “${query}”` : activeGenre === 'All films' ? 'Handpicked films' : `${activeGenre} picks`}</h2><span>{loading?'SEARCHING…': query ? `${total.toLocaleString()} RESULTS` : `${visibleCollection.length} FILMS`}</span></div>
     <div className="genre-section" aria-label="Starter collection genres">
       <div className="genre-label"><span>EXPLORE BY GENRE</span><small>Handpicked collection</small></div>
       <div className="genre-filters">{GENRES.map(genre => <button key={genre} type="button" aria-pressed={!query && activeGenre===genre} className={!query && activeGenre===genre ? 'genre-chip active':'genre-chip'} onClick={() => setGenre(genre)}>{genre}</button>)}</div>
     </div>
     {!query && <><div className="collection-intro"><span>{activeGenre === 'All films' ? 'THE EDITOR’S SELECTION' : `${activeGenre.toUpperCase()} COLLECTION`}</span><p>These featured picks are grouped by genre. Use the search above to discover more titles from OMDb.</p></div><div className="results-grid">{visibleCollection.map((movie,index)=><MovieCard key={movie.imdbID || movie.id} index={index} movie={movie} onDetails={setSelected} onRent={user ? handleRent : undefined} actionLabel={cartIds.has(movie.imdbID || movie.id)?'In rental list':'Add to rentals'} disabled={cartLoading || cartIds.has(movie.imdbID || movie.id)}/>)}</div>{visibleCollection.length===0 && <div className="notice-card"><h3>No films in this collection yet</h3><p>Try another genre or search for a movie title.</p></div>}</>}
     {providerNote && query && !loading && <div className="provider-note" role="status">{providerNote}</div>}
     {query && (loading ? <div className="results-grid">{Array.from({length:8}).map((_,i)=><div className="poster-skeleton" key={i}/>)}</div> : searchError && movies.length===0 ? <div className="notice-card"><h3>No movies to show</h3><p>{searchError}</p><p>Try a shorter title or a different spelling.</p></div> : <><p className="result-range">{total>0 ? `Showing ${firstResult}–${lastResult} of ${total.toLocaleString()} movies` : ''}</p><div className="results-grid">{movies.map((movie,index)=><MovieCard index={index} key={movie.imdbID || movie.id} movie={movie} onDetails={setSelected} onRent={user ? handleRent : undefined} actionLabel={cartIds.has(movie.imdbID || movie.id)?'In rental list':'Add to rentals'} disabled={cartLoading || cartIds.has(movie.imdbID || movie.id)}/>)}</div>{total>PER_PAGE && <nav className="pagination pagination-v3" aria-label="Movie search pages"><button type="button" disabled={page<=1 || loading} onClick={()=>goToPage(page-1)}>← Previous</button><span>Page <strong>{page}</strong> of {lastPage}</span><button type="button" disabled={page>=lastPage || loading} onClick={()=>goToPage(page+1)}>Next →</button></nav>}{total>1000 && <p className="pagination-note">OMDb makes up to 100 search pages available. Narrow your search to find more specific titles.</p>}</>)}
   </section>
   <aside className="cart-panel"><div className="cart-head"><span className="cart-icon"><Icon name="ticket" size={22}/></span><div><span className="eyebrow">YOUR MOVIE NIGHT</span><h2>Rental list <span>{rentals.length}</span></h2></div></div>
     {user ? <><div className="cart-items">{rentals.length===0 ? <div className="empty-cart"><Icon name="film" size={36}/><strong>Nothing here yet.</strong><p>Explore the collection and add movies to get started.</p></div> : rentals.map(movie=><div className="cart-item" key={movie.imdbID}><PosterArtwork className="rental-poster" src={movie.poster} title={movie.title}/><div><strong>{movie.title}</strong><span>Rental · ${Number(movie.price||0).toFixed(2)}</span></div><button type="button" title={`Remove ${movie.title}`} aria-label={`Remove ${movie.title}`} onClick={()=>remove(movie)} disabled={cartLoading}><Icon name="close" size={17}/></button></div>)}</div>
      {cartError && <div className="form-error" role="alert">{cartError}</div>}{notice && <div className="form-success" role="status">{notice}</div>}
      <div className="cart-summary"><div><span>Subtotal</span><strong>${totalPrice.toFixed(2)}</strong></div><p>Demo rental only. No payment is collected.</p><button className="button-primary" disabled={!rentals.length || cartLoading} type="button" onClick={finish}>{cartLoading?'Working…':'Confirm rentals'} <Icon name="arrow" size={18}/></button>{rentals.length>0 && <Link to="/orders" className="cart-history-link">View rental history <Icon name="north" size={14}/></Link>}</div></> :
      <div className="guest-cart"><p>Sign in to save movies and manage your rentals in one place.</p><Link className="button-primary" to="/login">Sign in / Sign up <Icon name="arrow" size={18}/></Link></div>}
   </aside></div>
   <MovieModal movie={selected} onClose={()=>setSelected(null)} onRent={selected ? handleRent : undefined} actionLabel={!user?'Sign in to rent':'Add to rentals'} isInCart={cartLoading || cartIds.has(selected?.imdbID || selected?.id)}/>
 </div>;
}
