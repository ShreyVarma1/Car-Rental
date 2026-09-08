# Car Rental Backend

NestJS REST API for the Car Rental Booking System.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | NestJS 11 |
| Database | PostgreSQL via Prisma 7 |
| Auth | JWT (access token) + Refresh token (HttpOnly cookie) |
| Validation | class-validator + class-transformer + Joi |
| API Docs | Swagger at `/api/docs` |

---

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ running locally or remote
- npm

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and fill in your values
cp .env.example .env

# 3. Generate Prisma client
npx prisma generate

# 4. Run database migrations
npx prisma migrate deploy

# 5. Start in development mode
npm run start:dev
```

The server starts on **http://localhost:4000**

---

## Environment Variables

Copy `.env.example` to `.env` and set these values:

| Variable | Description | Example |
|---|---|---|
| `PORT` | Server port | `4000` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:3000` |
| `JWT_SECRET` | Secret for signing JWTs (min 16 chars) | `your-secret-key` |
| `JWT_EXPIRES_IN` | Access token lifetime | `15m` |
| `REFRESH_TOKEN_EXPIRES_DAYS` | Refresh token lifetime in days | `7` |
| `MAX_RENTAL_DAYS` | Maximum allowed booking duration | `30` |
| `CANCELLATION_WINDOW_HOURS` | Hours before pickup a booking can be cancelled | `24` |
| `TAX_RATE` | Tax multiplier applied to bookings (0–1) | `0.18` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/car_rental` |

---

## Scripts

```bash
npm run start:dev     # Development with hot reload
npm run start:prod    # Production (requires build first)
npm run build         # Compile to dist/
npm run lint          # Run ESLint
npm run test          # Unit tests
npm run test:cov      # Test coverage
```

---

## API Documentation

Swagger UI is available at:

```
http://localhost:4000/api/docs
```

All endpoints are documented with request/response schemas, authentication requirements, and example payloads.

---

## API Overview

All routes are prefixed with `/api`.

| Group | Base Path | Auth |
|---|---|---|
| Auth | `/api/auth` | Public / Bearer |
| Cars (public) | `/api/cars` | Public |
| Cars (owner) | `/api/cars/owner` | Bearer + OWNER |
| Bookings | `/api/bookings` | Bearer + RENTER |
| Owner Bookings | `/api/owner/bookings` | Bearer + OWNER |
| Reviews | `/api/reviews` | Public / Bearer + RENTER |
| Notifications | `/api/notifications` | Bearer |
| Activities | `/api/activities` | Bearer |
| Add-ons | `/api/addons` | Public / Bearer + ADMIN |
| Admin — Users | `/api/admin/users` | Bearer + ADMIN |
| Admin — Cars | `/api/admin/cars` | Bearer + ADMIN |
| Admin — Bookings | `/api/admin/bookings` | Bearer + ADMIN |
| Admin — Dashboard | `/api/admin/dashboard` | Bearer + ADMIN |
| Health | `/api/health` | Public |

## Scheduled Jobs

| Job | Schedule | Purpose |
|---|---|---|
| Booking completion | Every minute (`@nestjs/schedule`) | Transitions any `CONFIRMED` booking whose `dropOffAt` has passed into `COMPLETED`. This is what unlocks reviews (only allowed on completed bookings) and feeds completed-booking metrics on the admin dashboard. Implemented in `src/booking/booking-completion.service.ts`. |

---

## User Roles

| Role | Capabilities |
|---|---|
| `RENTER` | Search cars, create/view/cancel bookings, write reviews |
| `OWNER` | List own cars, view bookings on own cars |
| `ADMIN` | Approve/reject cars, manage users, view all bookings, manage add-ons |

---

## Database

Prisma is used for schema management and queries.

```bash
# View current schema
cat prisma/schema.prisma

# Open Prisma Studio (GUI)
npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name <migration-name>
```

---

## Project Structure

```
src/
├── auth/           JWT auth, refresh sessions, admin user management
├── car/            Car listings (owner CRUD + public search + admin approval)
├── booking/        Booking lifecycle (create, view, cancel)
├── add-on/         Rental add-ons (GPS, child seat, etc.)
├── admin/          Admin dashboard statistics
├── engagement/
│   ├── review/     Car reviews (post-completed booking)
│   ├── notification/ In-app notifications
│   └── activity/   Audit/activity logs
├── health/         API + DB health check
├── prisma/         PrismaService
└── common/         Shared filters, constants, interfaces
```
