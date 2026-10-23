import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from '../AuthPage/AuthPage';
import RentalHistoryPage from '../RentalHistoryPage/RentalHistoryPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import MoviesPage from '../MoviesPage/MoviesPage';
import HomePage from '../HomePage/HomePage';
import './App.css';
export default function App(){
 const [user,setUser] = useState(getUser());
 return <div className="app-shell"><NavBar user={user} setUser={setUser}/><main id="main-content"><Routes>
  <Route path="/" element={<HomePage user={user}/>}/>
  <Route path="/login" element={user ? <Navigate to="/movies" replace/> : <AuthPage setUser={setUser}/>}/>
  <Route path="/movies" element={<MoviesPage user={user}/>}/>
  <Route path="/orders" element={user ? <RentalHistoryPage/> : <Navigate to="/login" replace/>}/>
  <Route path="*" element={<Navigate to="/" replace/>}/>
 </Routes></main><footer className="site-footer"><span className="footer-brand">moviemania<span>.</span></span><span>A movie discovery & rental demo · Built with React, Express and MongoDB.</span><a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer">Movie data from TMDB / OMDb</a></footer></div>;
}
