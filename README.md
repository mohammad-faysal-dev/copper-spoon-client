<div align="center">

# 🥄 Copper Spoon

### A full-stack food ordering platform where providers run their business and customers place orders, all in one seamless experience.

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Better Auth](https://img.shields.io/badge/Better_Auth-Session_Based-7C3AED?style=for-the-badge)](https://better-auth.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](./LICENSE)

<br/>

[Live Demo](#live-demo) •
[Overview](#overview) •
[Features](#features) •
[Tech Stack](#tech-stack) •
[Demo Credentials](#demo-credentials) •
[Run Locally](#run-locally) •
[Docker](#run-with-docker) •
[Roadmap](#roadmap)

</div>

---

## Live Demo

| Resource | Link |
| :-- | :-- |
| Frontend Application | [copper-spoon-client.vercel.app](https://copper-spoon-client.vercel.app) |
| Backend API | [copper-spoon-server.vercel.app](https://copper-spoon-server.vercel.app) |

---

## Overview

**Copper Spoon** is a role-based food ordering web application built for real-world use. It serves three types of users, and each one gets a dedicated dashboard designed around what they actually need to do.

| Role | What they can do |
| :-- | :-- |
| **Customer** | Browse the menu, add items to the cart, place orders and track order status in real time. |
| **Provider** | Manage the restaurant profile, then monitor and update incoming orders. |
| **Admin** | Oversee platform data and manage food categories. |

---

## Features

| Feature | Description |
| :-- | :-- |
| **Role-Based Access Control** | Admin, provider and customer each have their own protected dashboard, powered by Next.js parallel routes and Better Auth middleware. |
| **Live Order Tracking** | Customers watch their order move through `Pending → Processing → Delivered` as it happens. |
| **Smooth Checkout Flow** | Add to cart, review the order and confirm, in a clean and distraction-free flow. |
| **Provider Profile Management** | Providers update their restaurant name, address, phone number and description directly from the dashboard. |
| **Premium UI/UX** | Glassmorphism-inspired design with gradient backgrounds, subtle micro-animations and a fully responsive layout. |

---

## Tech Stack

| Layer | Technology | Purpose |
| :-- | :-- | :-- |
| Framework | [Next.js 16](https://nextjs.org/) | App Router, server-side rendering and parallel routes |
| Language | TypeScript 5 | Type-safe, maintainable code |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) | Consistent, responsive, accessible interface |
| Authentication | [Better Auth](https://better-auth.com/) | Session-based sign-in with role-gated access |
| Forms and Validation | [Zod v4](https://zod.dev/) + TanStack Form | Type-safe forms with end-to-end validation |
| Notifications | Sonner | Unobtrusive toast messages |
| Icons | Lucide React | Clean, consistent icon set |

---

## Architecture

```text
copper-spoon-client/
├── src/
│   ├── app/
│   │   ├── (commonLayout)/        # Public pages: Home, Menu, Login, Register
│   │   └── (dashboardLayout)/     # Protected dashboards (role-gated)
│   │       ├── @admin/            # Admin: category and platform management
│   │       ├── @customer/         # Customer: orders, cart, profile
│   │       └── @provider/         # Provider: orders, restaurant profile
│   ├── components/                # Reusable UI components
│   ├── services/                  # API layer (menu, orders, auth, etc.)
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Auth client and utility functions
│   └── types/                     # TypeScript interfaces and Zod schemas
└── public/                        # Static assets
```

---

## Demo Credentials

Want to explore the platform right now? Use these pre-seeded test accounts. No sign-up needed.

| Role | Email | Password |
| :-- | :-- | :-- |
| Admin | `admin@gmail.com` | `12345678` |
| Provider | `rahim@gmail.com` | `12345678` |
| Customer | `foysal@gmail.com` | `12345678` |

Go to [/login](https://copper-spoon-client.vercel.app/login), enter the credentials and you will be redirected to the matching dashboard automatically.

---

## Run Locally

**Requirements:** Node.js v20 or higher, and the Copper Spoon backend running on port `5000`.

### 1. Install

```bash
git clone https://github.com/mohammad-faysal-dev/copper-spoon-client.git
cd copper-spoon-client
npm install
```

### 2. Configure

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
API_URL=http://localhost:5000
APP_URL=http://localhost:3000
AUTH_URL=http://localhost:5000/api/auth
AUTH_SECRET=your_secret_here   # generate with: openssl rand -base64 32
```

| Variable | Description |
| :-- | :-- |
| `NEXT_PUBLIC_API_URL` | Backend origin used by the browser. |
| `API_URL` | Backend origin used for server-side requests. |
| `APP_URL` | Origin of this frontend application. |
| `AUTH_URL` | Authentication endpoint of the backend. |
| `AUTH_SECRET` | Secret key used to secure sessions. |

### 3. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Run with Docker

**Requirements:** [Docker](https://www.docker.com/) installed, and the Copper Spoon backend running and reachable.

```bash
# Build the image
docker build -t copper-spoon-client .

# Run the container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://your-backend-url:5000 \
  -e API_URL=http://your-backend-url:5000 \
  -e APP_URL=http://localhost:3000 \
  -e AUTH_URL=http://your-backend-url:5000/api/auth \
  -e AUTH_SECRET=your_secret_here \
  copper-spoon-client
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
| :-- | :-- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Builds the application for production. |
| `npm run start` | Starts the production server. |
| `npm run lint` | Runs ESLint. |

---

## Troubleshooting

| Problem | Solution |
| :-- | :-- |
| Sessions not loading after login | Clear browser cookies, restart the dev server and verify that `AUTH_SECRET` and `AUTH_URL` are set correctly. |
| 401 errors or orders not loading | Make sure `API_URL` is set correctly. Server-side requests use `API_URL`, not `NEXT_PUBLIC_API_URL`. |
| Profile page validation errors | Confirm the backend returns data in the exact shape the frontend expects, and check `NEXT_PUBLIC_API_URL`. |

---

## Roadmap

- [ ] Stripe payment integration
- [ ] Dark mode across all dashboards
- [ ] Sales analytics charts for providers
- [ ] Multi-language support (i18n)

---

## Author

**Mohammad Faysal** — Full Stack Developer

| Platform | Link |
| :-- | :-- |
| GitHub | [@mohammad-faysal-dev](https://github.com/mohammad-faysal-dev) |
| LinkedIn | [mohammad-foysal-dev](https://www.linkedin.com/in/mohammad-foysal-dev/) |
| Portfolio | [mohammad-faysal-dev.netlify.app](https://mohammad-faysal-dev.netlify.app/) |

---

## License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">
  <sub>Built with Next.js, shadcn/ui and Better Auth.</sub>
</div>