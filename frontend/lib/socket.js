import { io } from 'socket.io-client';
import { getToken, API_URL } from './api';

// Socket server is the API origin without the trailing /api path.
function socketOrigin() {
  try {
    const u = new URL(API_URL);
    return `${u.protocol}//${u.host}`;
  } catch {
    return 'http://localhost:5000';
  }
}

export function connectSocket() {
  return io(socketOrigin(), {
    path: '/socket.io',
    transports: ['websocket'],
    auth: { token: getToken() },
    autoConnect: true,
  });
}
