# Monochrome Web Solutions - Frontend

Next.js 14 web application with monochrome design theme.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://project-monochrome-server.vercel.app
```

## Features

- Homepage with hero slider (5 slides)
- Services listing and detail pages
- Booking system with modal form
- User Dashboard (Stats, Orders, Payments)
- Login/Register pages
- Dark/Light theme toggle
- Fully responsive design
- Monochrome theme (black & white)

## Pages

- `/` - Homepage
- `/services` - Services list
- `/services/[slug]` - Service detail
- `/dashboard` - User dashboard
- `/dashboard/stats` - Statistics & analytics
- `/dashboard/orders` - Order management
- `/dashboard/payments` - Payment history
- `/login` - Login
- `/register` - Register
- `/contact` - Contact
- `/about` - About
- `/profile` - Profile

## Deploy to Vercel

```bash
git push origin main
```

Set `NEXT_PUBLIC_API_URL` in Vercel dashboard.
