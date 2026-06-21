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

// Exchange the httpOnly refresh cookie for a fresh access token.
async function tryRefresh() {
  try {
    const res = await fetch(`${API_URL}/auth/refresh`, { method: 'POST', credentials: 'include' });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.token) setToken(data.token);
    return data.token || null;
  } catch {
    return null;
  }
}

export async function api(path, { method = 'GET', body, auth = false, _retry = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache: 'no-store',
  });

  // Auto-refresh once on auth failure for protected calls.
  if (res.status === 401 && auth && !_retry) {
    const fresh = await tryRefresh();
    if (fresh) return api(path, { method, body, auth, _retry: true });
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.error || `Request failed (${res.status})`);
    err.status = res.status;
    err.issues = data.issues;
    throw err;
  }
  return data;
}

export const Api = {
  // auth
  register: (payload) => api('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => api('/auth/login', { method: 'POST', body: payload }),
  refresh: () => api('/auth/refresh', { method: 'POST' }),
  logout: () => api('/auth/logout', { method: 'POST' }),
  me: () => api('/auth/me', { auth: true }),
  verifyEmail: (payload) => api('/auth/verify-email', { method: 'POST', body: payload }),
  forgotPassword: (email) => api('/auth/forgot-password', { method: 'POST', body: { email } }),
  resetPassword: (payload) => api('/auth/reset-password', { method: 'POST', body: payload }),
  saveOnboarding: (payload) => api('/auth/onboarding', { method: 'PUT', body: payload, auth: true }),
  toggleFavourite: (teacherId) => api('/auth/favourites', { method: 'POST', body: { teacherId }, auth: true }),
  favourites: () => api('/auth/favourites', { auth: true }),

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
  bookingRoom: (id) => api(`/bookings/${id}/room`, { auth: true }),
  enrollments: () => api('/enrollments', { auth: true }),
  journal: () => api('/journal', { auth: true }),
  addJournal: (payload) => api('/journal', { method: 'POST', body: payload, auth: true }),
  applyTeacher: (payload) => api('/applications/teacher', { method: 'POST', body: payload }),

  // payments
  paymentConfig: () => api('/payments/config'),
  paymentIntent: (payload) => api('/payments/intent', { method: 'POST', body: payload, auth: true }),

  // uploads
  presignUpload: (payload) => api('/uploads/presign', { method: 'POST', body: payload, auth: true }),

  // account / gdpr
  exportData: () => api('/account/export', { auth: true }),
  deleteAccount: () => api('/account', { method: 'DELETE', auth: true }),

  // teacher
  teacherMe: () => api('/teacher/me', { auth: true }),
  updateTeacherMe: (payload) => api('/teacher/me', { method: 'PUT', body: payload, auth: true }),
  teacherBookings: () => api('/teacher/bookings', { auth: true }),

  // admin
  adminStats: () => api('/admin/stats', { auth: true }),
  adminApplications: (qs = '') => api(`/admin/applications${qs}`, { auth: true }),
  approveApplication: (id) => api(`/admin/applications/${id}/approve`, { method: 'POST', auth: true }),
  rejectApplication: (id) => api(`/admin/applications/${id}/reject`, { method: 'POST', auth: true }),
};

export { API_URL };
