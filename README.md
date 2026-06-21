# Sacred Knowledge — Islamic Learning Marketplace + SacredChain

A Preply-style marketplace connecting learners (and parents) with vetted teachers of Quran,
Hadith, Arabic and the Islamic sciences — plus **SacredChain**, a separate B2B portal where
organisations hire verified scholars for halal certification, zakat advisory, inheritance
(faraid), wills and Islamic-finance compliance.

Built with the **NoorStudio stack**:

| Layer | Tech |
|---|---|
| Frontend | **Next.js 14** (App Router, JavaScript) + Tailwind CSS |
| Backend | **Node.js + Express** (REST + Socket.io) |
| Database | **MongoDB Atlas** (Mongoose) |
| Auth | **JWT access token + httpOnly refresh cookie** (rotation), bcrypt |
| Payments | **Stripe** (PaymentIntents + webhook) |
| Live lessons | **Jitsi** video + **Socket.io** session chat |
| AI companion | Anthropic **Claude** API |
| Email | **Nodemailer** (SMTP) — verification, reset, booking confirmations |
| Files | **AWS S3** presigned uploads |
| Deploy | **AWS EC2** + Docker Compose + nginx |

> Every external integration (Stripe, SMTP, S3, Claude, Sentry) is **optional in dev** and
> degrades gracefully — the app builds and runs without any third-party keys.

---

## Repository layout

```
sacredchain/
├── backend/                 Express + MongoDB + JWT + Socket.io
│   ├── Dockerfile
│   └── src/
│       ├── config/          env + Mongo connection
│       ├── middleware/      auth (JWT), role guard, zod validation, errors
│       ├── models/          User, Teacher, Bundle, Service, Provider, Booking,
│       │                    Enrollment, JournalEntry, Application, AiUsage
│       ├── controllers/     auth, teacher, bundle, sacredchain, booking, journal,
│       │                    dashboard, ai, payments, admin, uploads, gdpr
│       ├── routes/          /api router
│       ├── realtime/        socket.io session chat
│       ├── validation/      zod schemas
│       ├── utils/           tokens, mailer, stripe, s3, ai, sentry, logger
│       ├── seed/            data.js + seed.js
│       └── __tests__/       jest + supertest (unit + integration)
├── frontend/                Next.js App Router (standalone output)
│   ├── Dockerfile
│   ├── app/                 one route per screen (see below)
│   ├── components/          chrome, cards, Stripe, Jitsi, guards, toast
│   └── lib/                 api client (auto-refresh), auth context, socket
├── deploy/                  nginx.conf, EC2-DEPLOY.md, (certbot dirs)
├── docker-compose.yml
└── .github/workflows/ci.yml
```

**Frontend routes:** `/` landing · `/onboarding` · `/login` `/signup` `/forgot-password`
`/reset-password` `/verify-email` · `/explore` · `/teachers/[slug]` · `/booking` · `/checkout`
· `/bundles` `/bundles/[slug]` · `/dashboard` · `/session` (Jitsi) · `/progress` · `/journal`
· `/ai` · `/become-teacher` · `/account` · `/teacher` (studio) · `/admin` (console) ·
`/sacredchain` `/sacredchain/[slug]` · `/legal/terms` `/legal/privacy`.

---

## Quick start (local)

### Backend
```bash
cd backend
cp .env.example .env          # set MONGODB_URI, JWT_SECRET, REFRESH_SECRET (rest optional)
npm install
npm run seed                  # catalog + demo learner + demo admin
npm run dev                   # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev                   # http://localhost:3000
```

### Demo logins (after seeding)
```
Learner: amina@example.com / password123
Admin:   admin@example.com / password123
```

---

## What each phase added

1. **Payments** — Stripe `PaymentIntent` for bundle enrolment (`/checkout`), webhook that
   creates `Enrollment` records on `payment_intent.succeeded`. Mock flow when no Stripe keys.
2. **Live lessons** — Jitsi embed per booking (deterministic room from `/bookings/:id/room`)
   + Socket.io authenticated session chat with presence and history.
3. **Auth hardening** — short-lived access token + rotating **httpOnly refresh cookie**,
   **email verification**, **password reset**, zod validation on every write, `helmet`,
   tighter auth rate-limit, bcrypt(12).
4. **Teacher & admin** — `Application` review in **/admin** (approve → creates a `Teacher`
   + promotes the user to `teacher` role), **/teacher** studio for profile + weekly
   availability, booking **conflict checks** to prevent double-booking.
5. **Loose ends** — favourites wired end-to-end, S3 presigned uploads, AI **per-user daily
   cap**, GDPR **data export** + **account deletion**.
6. **Productionization** — Dockerfiles (multi-stage, Next standalone), `docker-compose.yml`,
   nginx reverse proxy (HTTP/WebSocket/TLS), **GitHub Actions CI** (test + build + docker),
   Sentry + pino logging hooks.
7. **Compliance** — Terms & Privacy pages, transactional email, GDPR endpoints, secure cookies.

---

## API overview (`/api`)

**Auth** `POST /auth/register|login|refresh|logout` · `GET /auth/me` ·
`POST /auth/verify-email|forgot-password|reset-password` · `PUT /auth/onboarding` ·
`GET|POST /auth/favourites`

**Catalog (public)** `GET /teachers[?q,subject,gender,language,track,weekend,featured]` ·
`GET /teachers/:slug` · `GET /bundles[?subject,level,price]` · `GET /bundles/:slug` ·
`GET /meta/{subjects,testimonials,onboarding}`

**SacredChain** `GET /sacredchain/services|services/:slug|providers` · `POST /sacredchain/briefs`

**Payments** `GET /payments/config` · `POST /payments/intent` · `POST /payments/webhook` (raw)

**Learner (JWT)** `GET /dashboard|progress|ai/content` · `POST /ai/chat` ·
`GET|POST /bookings` · `GET /bookings/:id/room` · `GET /enrollments` ·
`GET|POST|DELETE /journal` · `POST /uploads/presign` · `GET /account/export` · `DELETE /account`

**Teacher (role)** `GET|PUT /teacher/me` · `GET /teacher/bookings`

**Admin (role)** `GET /admin/stats` · `GET /admin/applications` ·
`POST /admin/applications/:id/approve|reject`

---

## Tests

```bash
cd backend && npm test
```
Unit tests (tokens, validation) run anywhere. Integration tests (auth, catalog, bookings,
RBAC) use `mongodb-memory-server` and run on CI (GitHub Actions Ubuntu runners).

---

## Deploy to AWS EC2

See **[deploy/EC2-DEPLOY.md](deploy/EC2-DEPLOY.md)** for the full walkthrough
(EC2 + Atlas + Docker Compose + nginx + Let's Encrypt + Stripe webhook). TL;DR:

```bash
cp backend/.env.example backend/.env      # fill in real values
export NEXT_PUBLIC_API_URL=https://your-domain.com/api
docker compose up -d --build
docker compose exec backend npm run seed
```

---

## Environment variables

Backend (`backend/.env`, see `.env.example`): `MONGODB_URI`, `JWT_SECRET`, `REFRESH_SECRET`,
`CLIENT_ORIGIN`, and optional `STRIPE_*`, `SMTP_*`, `AWS_*`/`S3_BUCKET`, `ANTHROPIC_API_KEY`,
`JITSI_DOMAIN`, `SENTRY_DSN`.

Frontend (`frontend/.env.local`): `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_JITSI_DOMAIN`.

---

## Notes

- Female teacher avatars are intentional SVG monograms; male portraits are Unsplash
  placeholders — replace with vetted photography before launch.
- For production video, self-host Jitsi (or use JaaS) instead of public `meet.jit.si`.
- Prefer AWS Secrets Manager / SSM over plaintext `.env` in production.
