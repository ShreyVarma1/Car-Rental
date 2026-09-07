# Car Rental Frontend

Next.js frontend for the Car Rental Booking System.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | Material UI v9 + Emotion |
| Data Fetching | TanStack React Query v5 |
| Language | TypeScript (strict) |

---

## Prerequisites

- Node.js 20+
- npm
- Backend API running (see `../backend/README.md`)

---

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy env file and set your API URL
cp .env.example .env.local

# 3. Start development server
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:4000/api` |

Create a `.env.local` file in this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

---

## Scripts

```bash
npm run dev      # Development server with hot reload (port 3000)
npm run build    # Production build
npm run start    # Start production server (requires build first)
npm run lint     # Run ESLint
```

---

## Application Routes

| Route | Role | Description |
|---|---|---|
| `/` | All | Redirects to `/login` |
| `/login` | All | Sign in |
| `/register` | All | Create account |
| `/dashboard` | All | Role-aware home with shortcuts |
| `/cars` | All | Browse & search available cars |
| `/cars/[id]` | All | Car details + reviews |
| `/bookings/new?carId=` | RENTER | Book a car with add-ons + price preview |
| `/bookings` | RENTER | My bookings (view, cancel) |
| `/bookings/[id]` | RENTER | Booking detail + leave a review |
| `/notifications` | All (auth) | View & mark notifications read |
| `/owner/cars` | OWNER | Manage car listings (create, edit, delete) |
| `/owner/bookings` | OWNER | Bookings on my cars |
| `/owner/bookings/[id]` | OWNER | Booking detail for a renter |
| `/admin/dashboard` | ADMIN | Platform stats + performance |
| `/admin/cars` | ADMIN | Approve or reject pending car listings |
| `/admin/users` | ADMIN | Manage users + change roles |
| `/admin/bookings` | ADMIN | All platform bookings |
| `/admin/addons` | ADMIN | Manage rental add-ons |
| `/health` | All | Backend + database health status |

---

## Project Structure

```
src/
├── app/              Next.js App Router — thin page.tsx wrappers (5–10 lines each)
├── routes/           Full page implementations
│   ├── auth/         login, register
│   ├── cars/         car list, car details
│   ├── bookings/     new booking, my bookings, booking detail
│   ├── owner/        owner cars, owner bookings
│   ├── admin/        dashboard, cars, users, bookings, addons
│   ├── notifications/
│   └── health/
├── components/
│   ├── auth/         ProtectedRoute HOC (auth + role guard)
│   ├── cars/         CarCard, CarList, CarSearchForm
│   └── layout/       Header with role-based nav + notification bell
├── context/          AuthContext — token storage + refresh rotation
├── hooks/            React Query hooks per domain
├── services/         Fetch wrappers for each API group
├── types/            TypeScript interfaces matching backend response shapes
├── providers/        QueryClient + ThemeProvider + AuthProvider
└── theme/            MUI theme configuration
```

---

## Auth Flow

1. `POST /auth/login` → returns `accessToken` (JWT, 15 min) in body + sets `refresh_token` HttpOnly cookie
2. All authenticated requests send `Authorization: Bearer <accessToken>`
3. On 401, the client automatically calls `POST /auth/refresh` (uses cookie) and retries once
4. Token refresh uses a singleton promise to prevent duplicate refresh calls on concurrent 401s

---

## Role-Based Access

The `ProtectedRoute` component wraps pages that require authentication. Pass `allowedRoles` to restrict to specific roles:

```tsx
<ProtectedRoute allowedRoles={["RENTER"]}>
  ...
</ProtectedRoute>
```

Unauthenticated users are redirected to `/login`. Users with the wrong role are redirected to `/dashboard`.
