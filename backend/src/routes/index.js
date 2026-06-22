import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import * as auth from '../controllers/authController.js';
import * as teachers from '../controllers/teacherController.js';
import * as bundles from '../controllers/bundleController.js';
import * as sc from '../controllers/sacredchainController.js';
import * as bookings from '../controllers/bookingController.js';
import * as journal from '../controllers/journalController.js';
import * as dash from '../controllers/dashboardController.js';
import * as ai from '../controllers/aiController.js';
import * as applications from '../controllers/applicationController.js';
import * as payments from '../controllers/paymentController.js';
import * as admin from '../controllers/adminController.js';
import * as uploads from '../controllers/uploadController.js';
import * as gdpr from '../controllers/gdprController.js';
import { subjectsData, testimonialsData, onbConfigs } from '../seed/data.js';
import {
  registerSchema, loginSchema, forgotSchema, resetSchema, bookingSchema,
  journalSchema, teacherApplicationSchema, briefSchema, presignSchema, teacherUpdateSchema,
} from '../validation/schemas.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, service: 'sacred-knowledge-api' }));

// ---- Auth ----
router.post('/auth/register', validate(registerSchema), auth.register);
router.post('/auth/login', validate(loginSchema), auth.login);
router.post('/auth/refresh', auth.refresh);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAuth, auth.me);
router.post('/auth/verify-email', auth.verifyEmail);
router.post('/auth/forgot-password', validate(forgotSchema), auth.forgotPassword);
router.post('/auth/reset-password', validate(resetSchema), auth.resetPassword);
router.put('/auth/onboarding', requireAuth, auth.updateOnboarding);
router.post('/auth/favourites', requireAuth, auth.toggleFavourite);
router.get('/auth/favourites', requireAuth, auth.listFavourites);

// ---- Catalog (public) ----
router.get('/teachers', teachers.listTeachers);
router.get('/teachers/:slug', teachers.getTeacher);
router.get('/bundles', bundles.listBundles);
router.get('/bundles/:slug', bundles.getBundle);

// ---- Landing / onboarding meta (public) ----
router.get('/meta/subjects', (req, res) => res.json({ subjects: subjectsData }));
router.get('/meta/testimonials', (req, res) => res.json({ testimonials: testimonialsData }));
router.get('/meta/onboarding', (req, res) => res.json({ configs: onbConfigs }));

// ---- SacredChain ----
router.get('/sacredchain/services', sc.listServices);
router.get('/sacredchain/services/:slug', sc.getService);
router.get('/sacredchain/providers', sc.listProviders);
router.post('/sacredchain/briefs', validate(briefSchema), sc.postBrief);

// ---- Become a teacher (public application) ----
router.post('/applications/teacher', validate(teacherApplicationSchema), applications.applyTeacher);

// ---- Payments ----
router.get('/payments/config', payments.config);
router.post('/payments/intent', requireAuth, payments.createIntent);
// (webhook is mounted in app.js with a raw body parser)

// ---- Authenticated learner area ----
router.get('/dashboard', requireAuth, dash.getDashboard);
router.get('/progress', requireAuth, dash.getProgress);
router.get('/ai/content', requireAuth, dash.getAiContent);
router.post('/ai/chat', requireAuth, ai.chat);

router.post('/bookings', requireAuth, validate(bookingSchema), bookings.createBooking);
router.get('/bookings', requireAuth, bookings.listMyBookings);
router.get('/bookings/:id/room', requireAuth, bookings.getRoom);
router.get('/enrollments', requireAuth, bookings.listEnrollments);

router.get('/journal', requireAuth, journal.listEntries);
router.post('/journal', requireAuth, validate(journalSchema), journal.createEntry);
router.delete('/journal/:id', requireAuth, journal.deleteEntry);

router.post('/uploads/presign', requireAuth, validate(presignSchema), uploads.presign);

// ---- Account / GDPR ----
router.get('/account/export', requireAuth, gdpr.exportData);
router.delete('/account', requireAuth, gdpr.deleteAccount);

// ---- Teacher self-service (role: teacher) ----
router.get('/teacher/me', requireAuth, requireRole('teacher', 'admin'), teachers.myTeacherProfile);
router.put('/teacher/me', requireAuth, requireRole('teacher', 'admin'), validate(teacherUpdateSchema), teachers.updateMyProfile);
router.get('/teacher/bookings', requireAuth, requireRole('teacher', 'admin'), teachers.myTeacherBookings);

// ---- Admin ----
router.get('/admin/stats', requireAuth, requireRole('admin'), admin.stats);
router.get('/admin/applications', requireAuth, requireRole('admin'), admin.listApplications);
router.post('/admin/applications/:id/approve', requireAuth, requireRole('admin'), admin.approveApplication);
router.post('/admin/applications/:id/reject', requireAuth, requireRole('admin'), admin.rejectApplication);

export default router;
