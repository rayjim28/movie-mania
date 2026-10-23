import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Icon from '../Icons';
import * as userService from '../../utilities/users-service';
export default function NavBar({ user, setUser }) {
 const [query, setQuery] = useState('');
 const [open, setOpen] = useState(false);
 const navigate = useNavigate();
 function submit(e) { e.preventDefault(); if(query.trim()) { navigate(`/movies?q=${encodeURIComponent(query.trim())}`); setOpen(false); } }
 function logout() { userService.logOut(); setUser(null); setOpen(false); navigate('/'); }
 return <header className="site-header"><div className="header-inner">
  <Link className="brand" to="/" aria-label="Movie Mania home" onClick={() => setOpen(false)}><span className="brand-icon"><Icon name="film" size={22}/></span><span>movie<span className="brand-highlight">mania</span><i>.</i></span></Link>
  <nav aria-label="Primary navigation" className={`header-nav ${open?'is-open':''}`}>
   <NavLink end to="/" onClick={() => setOpen(false)}>Discover</NavLink><NavLink to="/movies" onClick={() => setOpen(false)}>Explore movies</NavLink>{user && <NavLink to="/orders" onClick={() => setOpen(false)}>My rentals</NavLink>}
  </nav>
  <div className="header-actions"><form className="header-search" role="search" onSubmit={submit}><Icon name="search" size={17}/><input aria-label="Search movies" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies..."/><kbd>↵</kbd></form>
   {user ? <><span className="header-greeting">Hi, {user.name?.split(' ')[0] || 'there'}</span><button className="header-signin" onClick={logout} type="button">Log out <Icon name="arrow" size={15}/></button></> : <Link className="header-signin" to="/login">Sign in <Icon name="arrow" size={15}/></Link>}
   <button type="button" className="mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'}/></button>
  </div>
 </div></header>;
}
