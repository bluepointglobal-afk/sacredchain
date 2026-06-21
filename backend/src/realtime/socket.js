import { Server } from 'socket.io';
import { verifyAccess } from '../utils/tokens.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import logger from '../utils/logger.js';
import env from '../config/env.js';

// In-memory room chat history (ephemeral). For durable history, persist to Mongo.
const history = new Map(); // room -> [{ who, me?, text, time }]
const MAX = 100;

export function attachSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: env.clientOrigin.split(','), credentials: true },
    path: '/socket.io',
  });

  // authenticate every connection with the access token
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication required'));
      const payload = verifyAccess(token);
      const user = await User.findById(payload.sub).select('name role teacherProfile');
      if (!user) return next(new Error('Invalid token'));
      socket.data.user = { id: user._id.toString(), name: user.name, role: user.role, teacherProfile: user.teacherProfile?.toString() };
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('session:join', async ({ bookingId }) => {
      const booking = await Booking.findById(bookingId).select('user teacher roomName');
      if (!booking) return socket.emit('session:error', 'Booking not found');
      const u = socket.data.user;
      const allowed =
        booking.user.toString() === u.id ||
        (u.teacherProfile && booking.teacher.toString() === u.teacherProfile) ||
        u.role === 'admin';
      if (!allowed) return socket.emit('session:error', 'Not your session');

      const room = booking.roomName || `booking-${bookingId}`;
      socket.join(room);
      socket.data.room = room;
      socket.emit('session:history', history.get(room) || []);
      socket.to(room).emit('session:presence', { name: u.name, joined: true });
    });

    socket.on('session:message', ({ text }) => {
      const room = socket.data.room;
      const u = socket.data.user;
      if (!room || !text || !text.trim()) return;
      const msg = { who: u.name, userId: u.id, text: String(text).slice(0, 2000), time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) };
      const arr = history.get(room) || [];
      arr.push(msg);
      if (arr.length > MAX) arr.shift();
      history.set(room, arr);
      io.to(room).emit('session:message', msg);
    });

    socket.on('disconnect', () => {
      const room = socket.data.room;
      if (room) socket.to(room).emit('session:presence', { name: socket.data.user?.name, joined: false });
    });
  });

  logger.info('[socket] realtime session chat ready');
  return io;
}
