import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login,signUp } from '../../utilities/users-service';
import Icon from '../../components/Icons';
export default function AuthPage({setUser}) {
 const [mode,setMode] = useState('login');
 const [form,setForm] = useState({name:'',email:'',password:'',confirm:''});
 const [pending,setPending] = useState(false);
 const [error,setError] = useState('');
 const navigate = useNavigate();
 function change(event){setForm(f=>({...f,[event.target.name]:event.target.value}));setError('')}
 async function submit(event){
  event.preventDefault();setError('');
  if(mode==='signup' && form.password!==form.confirm){setError('Passwords do not match.');return;}
  if(mode==='signup' && form.password.length < 6){setError('Please use a password with at least 6 characters.');return;}
  setPending(true);
  try{const user = mode==='signup'?await signUp({name:form.name.trim(),email:form.email.trim(),password:form.password}):await login({email:form.email.trim(),password:form.password});setUser(user);navigate('/movies',{replace:true});}
  catch(err){setError(err.message || 'Something went wrong. Please try again.');}
  finally{setPending(false);}
 }
 return <div className="auth-page content-width"><div className="auth-visual"><div className="eyebrow light">WELCOME TO MOVIE MANIA</div><h1>Good stories<br/>are better<br/><em>together.</em></h1><p>One place to discover movies, save your favorites for movie night, and keep track of your rental history.</p><div className="auth-graphic"><Icon name="film" size={120}/><span>THE MOVIES AWAIT.</span></div></div>
 <div className="auth-form-side"><div className="auth-card"><div className="eyebrow red">YOUR ACCOUNT</div><h2>{mode==='signup'?'Create your account':'Welcome back.'}</h2><p>{mode==='signup'?'Join to build your rental list and discover more movies.':'Sign in to manage your rentals and continue exploring.'}</p>
 <div className="auth-tabs" role="tablist" aria-label="Account action"><button type="button" role="tab" aria-selected={mode==='login'} className={mode==='login'?'active':''} onClick={()=>{setMode('login');setError('')}}>Sign in</button><button type="button" role="tab" aria-selected={mode==='signup'} className={mode==='signup'?'active':''} onClick={()=>{setMode('signup');setError('')}}>Create account</button></div>
 <form onSubmit={submit} className="auth-form">{mode==='signup' && <label>Full name<input value={form.name} name="name" autoComplete="name" onChange={change} placeholder="Your full name" required/></label>}
 <label>Email address<input type="email" name="email" autoComplete="email" value={form.email} onChange={change} placeholder="you@example.com" required/></label>
 <label>Password<input type="password" name="password" autoComplete={mode==='login'?'current-password':'new-password'} value={form.password} onChange={change} placeholder="Enter your password" required/></label>
 {mode==='signup'&&<label>Confirm password<input type="password" name="confirm" autoComplete="new-password" value={form.confirm} onChange={change} placeholder="Repeat your password" required/></label>}
 {error&&<div className="form-error" role="alert">{error}</div>}
 <button type="submit" disabled={pending} className="button-primary auth-submit">{pending?'Please wait…':mode==='signup'?'Create my account':'Sign in'} <Icon name="arrow" size={18}/></button>
 </form><p className="auth-footer-prompt">{mode==='signup'?'Already have an account?':'New to Movie Mania?'} <button onClick={()=>{setMode(mode==='signup'?'login':'signup');setError('')}} type="button">{mode==='signup'?'Sign in':'Create an account'}</button></p></div></div></div>;
}
