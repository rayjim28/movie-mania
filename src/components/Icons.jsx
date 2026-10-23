import React from 'react';
const paths = {
 search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
 arrow: <><path d="M5 12h14m-6-6 6 6-6 6"/></>,
 north: <><path d="M7 17 17 7M8 7h9v9"/></>,
 play: <path d="m8 5 11 7-11 7V5Z"/>,
 plus: <path d="M12 5v14M5 12h14"/>,
 close: <path d="M18 6 6 18M6 6l12 12"/>,
 check: <path d="m5 12 4 4L19 6"/>,
 ticket: <><path d="M3 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0 0-4V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2Z"/><path d="M13 5v2m0 4v2m0 4v1"/></>,
 menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
 user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
 clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
 star: <path d="m12 2 3.1 6.3 7 .9-5.1 5 .9 7-5.9-3.3-5.9 3.3.9-7-5.1-5 7-.9L12 2Z"/>,
 film: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 3v18m10-18v18M3 8h4m-4 8h4m10-8h4m-4 8h4"/></>,
 trash: <><path d="M4 7h16M10 3h4m-8 4 1 14h10l1-14M10 11v6m4-6v6"/></>,
 chevron: <path d="m9 18 6-6-6-6"/>,
};
export default function Icon({ name, size=20, className='', ...props }) {
 return <svg aria-hidden="true" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name] || paths.film}</svg>;
}
