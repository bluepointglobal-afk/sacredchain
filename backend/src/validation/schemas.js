import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(200),
  onboarding: z.object({
    pathway: z.enum(['student', 'seeker']).nullish(),
    answers: z.record(z.any()).optional(),
    completed: z.boolean().optional(),
  }).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const forgotSchema = z.object({ email: z.string().email() });

export const resetSchema = z.object({
  id: z.string().min(1),
  token: z.string().min(10),
  password: z.string().min(8).max(200),
});

export const bookingSchema = z.object({
  teacherSlug: z.string().min(1),
  day: z.string().optional(),
  time: z.string().optional(),
  startAt: z.string().datetime().optional(),
  sessionType: z.enum(['video', 'voice']).optional(),
  notes: z.string().max(2000).optional(),
  isTrial: z.boolean().optional(),
  bundleSlug: z.string().optional(),
});

export const journalSchema = z.object({
  body: z.string().min(1).max(8000),
  private: z.boolean().optional(),
  session: z.string().max(300).optional(),
  teacher: z.string().max(200).optional(),
  tags: z.array(z.string().max(40)).max(12).optional(),
});

export const teacherApplicationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().max(40).optional(),
  gender: z.enum(['male', 'female']).optional(),
  bio: z.string().max(4000).optional(),
  specialties: z.array(z.string()).max(20).optional(),
});

export const briefSchema = z.object({
  serviceSlug: z.string().optional(),
  organisation: z.string().max(200).optional(),
  email: z.string().email(),
  details: z.string().max(4000).optional(),
});

export const presignSchema = z.object({
  filename: z.string().min(1).max(200),
  contentType: z.string().min(1).max(120),
  folder: z.enum(['credentials', 'materials', 'avatars']).optional(),
});

export const teacherUpdateSchema = z.object({
  title: z.string().max(200).optional(),
  short: z.string().max(200).optional(),
  bio: z.string().max(4000).optional(),
  price: z.number().min(0).max(1000).optional(),
  languages: z.array(z.string()).max(12).optional(),
  specialties: z.array(z.string()).max(20).optional(),
  slots: z.array(z.object({ dow: z.number().min(0).max(6), start: z.string(), end: z.string() })).max(50).optional(),
});
