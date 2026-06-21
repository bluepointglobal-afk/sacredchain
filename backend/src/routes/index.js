import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import * as auth from '../controllers/authController.js';
import * as teachers from '../controllers/teacherController.js';
import * as bundles from '../controllers/bundleController.js';
import * as sc from '../controllers/sacredchainController.js';
import * as bookings from '../controllers/bookingController.js';
import * as journal from '../controllers/journalController.js';
import * as dash from '../controllers/dashboardController.js';
import * as ai from '../controllers/aiController.js';
import * as applications from '../controllers/applicationController.js';
import { subjectsData, testimonialsData, onbConfigs } from '../seed/data.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true, service: 'sacred-knowledge-api' }));

// ---- Auth ----
router.post('/auth/register', auth.register);
router.post('/auth/login', auth.login);
router.get('/auth/me', requireAuth, auth.me);
router.put('/auth/onboarding', requireAuth, auth.updateOnboarding);
router.post('/auth/favourites', requireAuth, auth.toggleFavourite);

// ---- Catalog (public) ----
router.get('/teachers', teachers.listTeachers);
router.get('/teachers/:slug', teachers.getTeacher);
router.get('/bundles', bundles.listBundles);
router.get('/bundles/:slug', bundles.getBundle);

// ---- Landing / onboarding meta (public) ----
router.get('/meta/subjects', (req, res) => res.json({ subjects: subjectsData }));
router.get('/meta/testimonials', (req, res) => res.json({ testimonials: testimonialsData }));
router.get('/meta/onboarding', (req, res) => res.json({ configs: onbConfigs }));

// ---- SacredChain (public, brief post open) ----
router.get('/sacredchain/services', sc.listServices);
router.get('/sacredchain/services/:slug', sc.getService);
router.get('/sacredchain/providers', sc.listProviders);
router.post('/sacredchain/briefs', sc.postBrief);

// ---- Become a teacher (public) ----
router.post('/applications/teacher', applications.applyTeacher);

// ---- Authenticated learner area ----
router.get('/dashboard', requireAuth, dash.getDashboard);
router.get('/progress', requireAuth, dash.getProgress);
router.get('/ai/content', requireAuth, dash.getAiContent);
router.post('/ai/chat', requireAuth, ai.chat);

router.post('/bookings', requireAuth, bookings.createBooking);
router.get('/bookings', requireAuth, bookings.listMyBookings);

router.get('/journal', requireAuth, journal.listEntries);
router.post('/journal', requireAuth, journal.createEntry);
router.delete('/journal/:id', requireAuth, journal.deleteEntry);

export default router;
