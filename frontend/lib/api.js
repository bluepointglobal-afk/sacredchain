const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const TOKEN_KEY = 'sk_token';

export function getToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  if (typeof window === 'undefined') return;
  if (token) window.localStorage.setItem(TOKEN_KEY, token);
  else window.localStorage.removeItem(TOKEN_KEY);
}

export async function api(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// Convenience wrappers
export const Api = {
  // auth
  register: (payload) => api('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => api('/auth/login', { method: 'POST', body: payload }),
  me: () => api('/auth/me', { auth: true }),
  saveOnboarding: (payload) => api('/auth/onboarding', { method: 'PUT', body: payload, auth: true }),
  // catalog
  teachers: (qs = '') => api(`/teachers${qs}`),
  teacher: (slug) => api(`/teachers/${slug}`),
  bundles: (qs = '') => api(`/bundles${qs}`),
  bundle: (slug) => api(`/bundles/${slug}`),
  subjects: () => api('/meta/subjects'),
  testimonials: () => api('/meta/testimonials'),
  onboardingConfig: () => api('/meta/onboarding'),
  // sacredchain
  services: () => api('/sacredchain/services'),
  service: (slug) => api(`/sacredchain/services/${slug}`),
  providers: () => api('/sacredchain/providers'),
  postBrief: (payload) => api('/sacredchain/briefs', { method: 'POST', body: payload }),
  // learner area
  dashboard: () => api('/dashboard', { auth: true }),
  progress: () => api('/progress', { auth: true }),
  aiContent: () => api('/ai/content', { auth: true }),
  aiChat: (messages) => api('/ai/chat', { method: 'POST', body: { messages }, auth: true }),
  createBooking: (payload) => api('/bookings', { method: 'POST', body: payload, auth: true }),
  myBookings: () => api('/bookings', { auth: true }),
  journal: () => api('/journal', { auth: true }),
  addJournal: (payload) => api('/journal', { method: 'POST', body: payload, auth: true }),
  applyTeacher: (payload) => api('/applications/teacher', { method: 'POST', body: payload }),
};
