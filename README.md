# The Sharp Blade – Barbershop Website

Modern Next.js 14 barbershop website with online booking, gallery, and admin panel.

## Quick Start

```bash
npm install
# Edit .env.local with your SMTP and admin credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
  page.tsx              → Home page (Hero, Services, Gallery, Contact)
  booking/page.tsx      → 4-step online booking flow
  admin/                → Admin panel (login-protected)
    appointments/       → View & manage bookings
    services/           → Add / edit / delete services
    gallery/            → Add / remove gallery images
    settings/           → Shop info & business hours
  api/
    booking/            → POST new appointment + GET available slots
    contact/            → Contact form email
    admin/              → Admin CRUD APIs
data/
  services.json         → Service list (editable via admin)
  gallery.json          → Gallery images (editable via admin)
  settings.json         → Shop info & hours (editable via admin)
  appointments.json     → Bookings database (auto-managed)
lib/
  types.ts              → TypeScript interfaces
  utils.ts              → Helpers (formatPrice, generateId, time slots)
  email.ts              → Nodemailer booking confirmation
  appointments.ts       → File-based appointment store
```

---

## Environment Variables (`.env.local`)

| Variable | Description |
|---|---|
| `SMTP_HOST` | SMTP server (e.g. smtp.gmail.com) |
| `SMTP_PORT` | SMTP port (587) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (not your login password) |
| `EMAIL_FROM` | Sender email address |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `NEXT_PUBLIC_MAPS_EMBED_URL` | Google Maps embed URL for contact section |

---

## Admin Panel Guide

1. Go to `/admin` and sign in with your credentials from `.env.local`
2. **Appointments** — See all bookings, confirm or cancel them
3. **Services** — Add, edit, or remove services and pricing
4. **Gallery** — Add images by URL or remove existing ones
5. **Settings** — Update shop name, phone, address, and business hours

> Changes to services, gallery, and settings are saved immediately to the JSON files.

---

## Image Guidelines (for client)

| Usage | Recommended Size | Format |
|---|---|---|
| Hero background | 1600×900px | JPG (80% quality) |
| Gallery images | 600×600px (square) | JPG (80% quality) |
| Logo | 200×60px | SVG or PNG (transparent) |

Keep images under **200KB** each for fast loading. Use [Squoosh](https://squoosh.app) to compress.

---

## SEO

- Page titles and meta descriptions are auto-generated from `data/settings.json`
- All images use descriptive `alt` text
- Semantic HTML5 structure (`<header>`, `<main>`, `<section>`, `<footer>`)
- Google Fonts loaded via CSS `@import` with `display=swap`

---

## Deployment

```bash
npm run build
npm start
```

Or deploy to **Vercel** (recommended — free tier available):
1. Push to GitHub
2. Import repo at vercel.com
3. Add environment variables in Vercel dashboard
4. Deploy — done!
