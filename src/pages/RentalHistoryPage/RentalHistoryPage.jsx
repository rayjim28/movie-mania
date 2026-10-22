import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../utilities/rentals-api';
import Icon from '../../components/Icons';
import PosterArtwork from '../../components/PosterArtwork/PosterArtwork';
export default function RentalHistoryPage(){
 const [orders,setOrders]=useState([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{let active=true;api.getRentalHistory().then(data=>{if(active)setOrders(Array.isArray(data)?data:[]);}).catch(err=>{if(active)setError(err.message || 'Unable to load rentals.');}).finally(()=>{if(active)setLoading(false);});return()=>{active=false;};},[]);
 return <div className="history-page content-width"><div className="browse-top"><div><div className="eyebrow red">YOUR COLLECTION</div><h1>Rental <em>history.</em></h1><p>Your confirmed demo rentals, all in one place.</p></div><Link to="/movies" className="button-outline">Explore more <Icon name="arrow" size={18}/></Link></div>
 {loading?<div className="notice-card">Loading your rental history…</div>:error?<div className="notice-card form-error">{error}</div>:!orders.length?<div className="notice-card history-empty"><Icon name="ticket" size={35}/><h2>No rentals yet.</h2><p>When you confirm a rental, it will show up here.</p><Link to="/movies" className="button-primary">Find a movie <Icon name="arrow" size={17}/></Link></div>:
 <div className="history-grid">{orders.map(order=><article className="history-card" key={order._id}><div className="history-head"><span>ORDER #{String(order._id || '').slice(-8).toUpperCase()}</span><span><Icon name="check" size={13}/> CONFIRMED</span></div><div className="history-posters">{(order.movies||[]).slice(0,4).map(movie=><PosterArtwork key={movie._id || movie.imdbID} className="history-poster-fallback" src={movie.poster} title={movie.title} />)}</div><div className="history-bottom"><div><h3>{(order.movies||[]).length} movie{order.movies?.length===1?'':'s'} rented</h3><p><Icon name="clock" size={15}/> {order.rentalDate ? new Date(order.rentalDate).toLocaleDateString(): 'Date unavailable'}</p></div><strong>${Number(order.orderTotal ?? (order.movies||[]).reduce((sum,movie)=>sum+(Number(movie.price)||0),0)).toFixed(2)}</strong></div><div className="history-titles">{(order.movies||[]).map(movie=>movie.title).join(' · ')}</div></article>)}</div>}
 </div>;
}
