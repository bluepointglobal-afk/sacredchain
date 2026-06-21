import { jest } from '@jest/globals';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import { createApp } from '../app.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';
import { teachers } from '../seed/data.js';

let mongod;
let app;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create({ binary: { version: process.env.MONGOMS_VERSION || '7.0.14' } });
  await mongoose.connect(mongod.getUri());
  app = createApp();
  await Teacher.insertMany(teachers.slice(0, 3));
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongod) await mongod.stop();
});

describe('health', () => {
  it('reports ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

describe('auth', () => {
  it('rejects weak/invalid registration', async () => {
    const res = await request(app).post('/api/auth/register').send({ name: 'x', email: 'bad', password: '123' });
    expect(res.status).toBe(400);
  });

  it('registers, logs in, and reads /me', async () => {
    const reg = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Test User', email: 'test@example.com', password: 'password123' });
    expect(reg.status).toBe(201);
    expect(reg.body.token).toBeTruthy();

    const login = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
    expect(login.status).toBe(200);
    const token = login.body.token;

    const me = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`);
    expect(me.status).toBe(200);
    expect(me.body.user.email).toBe('test@example.com');
  });

  it('blocks /me without a token', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.status).toBe(401);
  });
});

describe('catalog', () => {
  it('lists teachers and filters by subject', async () => {
    const all = await request(app).get('/api/teachers');
    expect(all.status).toBe(200);
    expect(all.body.teachers.length).toBeGreaterThan(0);

    const quran = await request(app).get('/api/teachers?subject=Quran');
    expect(quran.status).toBe(200);
    quran.body.teachers.forEach((t) => expect(t.subjects).toContain('Quran'));
  });
});

describe('bookings', () => {
  it('creates a trial booking for an authed user', async () => {
    const login = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
    const token = login.body.token;
    const teacher = await Teacher.findOne();

    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({ teacherSlug: teacher.slug, day: 'Mon, Jan 1', time: '7:00 PM', sessionType: 'video', isTrial: true });
    expect(res.status).toBe(201);
    expect(res.body.booking.price).toBe(0);
    expect(res.body.booking.roomName).toBeTruthy();
  });
});

describe('rbac', () => {
  it('forbids non-admin from admin routes', async () => {
    const login = await request(app).post('/api/auth/login').send({ email: 'test@example.com', password: 'password123' });
    const res = await request(app).get('/api/admin/stats').set('Authorization', `Bearer ${login.body.token}`);
    expect(res.status).toBe(403);
  });
});
