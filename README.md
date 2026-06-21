# Sacred Knowledge — Islamic Learning Marketplace + SacredChain

A Preply-style marketplace connecting learners (and parents) with vetted teachers of Quran,
Hadith, Arabic and the Islamic sciences — plus **SacredChain**, a separate B2B portal where
organisations hire verified scholars for halal certification, zakat advisory, inheritance
(faraid), wills and Islamic-finance compliance.

Built with the **NoorStudio stack**:

| Layer | Tech |
|---|---|
| Frontend | **Next.js 14** (App Router, JavaScript) + Tailwind CSS |
| Backend | **Node.js + Express** (REST API) |
| Database | **MongoDB Atlas** (Mongoose) |
| Auth | **JWT** (bcrypt password hashing) |
| AI companion | Anthropic **Claude** API (optional; graceful fallback) |

---

## Repository layout

```
sacredchain/
├── backend/      Express + MongoDB + JWT REST API
│   └── src/
│       ├── config/        Mongo connection
│       ├── middleware/     auth (JWT) + error handling
│       ├── models/         User, Teacher, Bundle, Service, Provider, Booking, JournalEntry, Application
│       ├── controllers/    route handlers
│       ├── routes/         /api router
│       ├── seed/           data.js (all catalog data) + seed.js
│       └── utils/          ai.js (Claude integration)
└── frontend/     Next.js App Router
    ├── app/        one route per screen (landing, onboarding, explore, teachers/[slug],
    │               booking, bundles, dashboard, session, progress, journal, ai,
    │               become-teacher, sacredchain, sacredchain/[slug], login, signup)
    ├── components/ chrome (headers/footers), cards, icons, toast, auth guards
    └── lib/        api client + auth context
```

---

## Getting started

### 1. Backend

```bash
cd backend
cp .env.example .env          # then fill in MONGODB_URI + JWT_SECRET
npm install
npm run seed                  # loads teachers, bundles, services, providers + demo user
npm run dev                   # http://localhost:5000
```

Required env vars (`backend/.env`):

- `MONGODB_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `ANTHROPIC_API_KEY` — *(optional)* enables the live AI Scholar Companion. Without it, the
  `/api/ai/chat` endpoint returns a graceful on-brand fallback so the UI still works.

### 2. Frontend

```bash
cd frontend
cp .env.local.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:5000/api
npm install
npm run dev                        # http://localhost:3000
```

### Demo login

After seeding, log in with:

```
email:    amina@example.com
password: password123
```

(The login form is pre-filled with these.)

---

## API overview

Base URL: `/api`

**Auth**
- `POST /auth/register` · `POST /auth/login` · `GET /auth/me`
- `PUT /auth/onboarding` · `POST /auth/favourites`

**Catalog (public)**
- `GET /teachers` (filters: `q, subject, gender, language, track, weekend, featured`)
- `GET /teachers/:slug`
- `GET /bundles` (filters: `subject, level, price`) · `GET /bundles/:slug`
- `GET /meta/subjects` · `GET /meta/testimonials` · `GET /meta/onboarding`

**SacredChain (public)**
- `GET /sacredchain/services` · `GET /sacredchain/services/:slug` · `GET /sacredchain/providers`
- `POST /sacredchain/briefs`

**Learner area (JWT required)**
- `GET /dashboard` · `GET /progress` · `GET /ai/content`
- `POST /ai/chat`
- `GET/POST /bookings`
- `GET/POST/DELETE /journal`

**Become a teacher (public)**
- `POST /applications/teacher`

---

## Design system

The UI is a high-fidelity recreation of the `design_handoff_sacred_knowledge` prototype.
Design tokens live in `frontend/tailwind.config.js`:

- **Consumer brand** green `#0F5C46` (+ deep/bright/tint variants)
- **SacredChain** indigo `#2547D8` (deliberately distinct B2B identity)
- Typography: Plus Jakarta Sans (UI) + Amiri (Arabic du'a / verses)

> Female teacher avatars are intentionally rendered as inline SVG monograms (green tile +
> initials) rather than stock photography. Replace male portrait Unsplash URLs and the hero
> image with your own vetted, role-appropriate photography before production.

---

## Notes & next steps

- This is the **full foundation + core learner journey**. Live session, progress, journal and
  AI companion screens are functional against the API. Payments are simulated (trial = free).
- Hook up a real payment provider in the booking flow and a video SDK in the live session.
- Swap placeholder imagery for vetted photography.
