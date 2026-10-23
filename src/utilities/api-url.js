const ROOT = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export default function apiUrl(path) { return `${ROOT}${path}`; }
