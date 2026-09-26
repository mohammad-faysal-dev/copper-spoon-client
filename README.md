# Copper Spoon — Food Ordering Platform (Next.js 16 · React 19 · TypeScript)

> A full-stack food ordering web app for restaurants and their customers — built with Next.js 16 App Router, Better Auth, TailwindCSS v4, and Shadcn/ui.

**Live Demo:** [TODO: add deployed URL] &nbsp;|&nbsp; **Backend API:** [TODO: add backend repo URL] &nbsp;|&nbsp; **Portfolio:** [TODO: add portfolio URL]

---

## What It Does

Copper Spoon connects restaurant **providers** with **customers** through a role-aware platform:

| Role | What they can do |
|---|---|
| **Customer** | Browse menus, add to cart, place orders, track live order status |
| **Provider** | Manage restaurant profile, view & update incoming orders, export expense invoices as PDF |
| **Admin** | Manage categories and platform-level data |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) — App Router, SSR, Route Groups |
| Language | TypeScript 5 |
| UI | [TailwindCSS v4](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) + Base-UI |
| Auth | [Better Auth](https://better-auth.com/) (session-based, role-gated routes) |
| Validation | [Zod v4](https://zod.dev/) + TanStack Form |
| PDF Export | html2pdf.js (expense invoice generation) |
| Notifications | Sonner (toast system) |
| Icons | Lucide React |

---

## Key Features

- **Role-Based Dashboards** — Three parallel dashboard views (@admin, @customer, @provider) using Next.js parallel routes, each with role-gated access via Better Auth middleware.
- **Live Order Tracking** — Visual progress stepper that reflects real-time order status updates (Pending → Processing → Delivered).
- **Expense Invoice PDF** — Providers can download formatted PDF invoices per expense record directly from the dashboard dropdown.
- **Smooth Checkout Flow** — Cart → Checkout → Order Confirmation with proper back-navigation and order creation via the backend API.
- **Provider Profile Management** — Restaurant providers can update their restaurant name, description, phone, and address through a validated form.
- **Premium UI/UX** — Glassmorphism-inspired design: gradient backgrounds, micro-animations, responsive layouts.

---

## Project Structure

```
copper-spoon-client/
├── src/
│   ├── app/
│   │   ├── (commonLayout)/     # Public pages: home, menu, auth
│   │   └── (dashboardLayout)/  # Protected dashboards per role
│   │       ├── @admin/         # Admin panel (categories, management)
│   │       ├── @customer/      # Customer: orders, cart, profile
│   │       └── @provider/      # Provider: orders, profile, invoices
│   ├── components/             # Reusable UI components (layout, shadcn)
│   ├── services/               # API service layer (menu, order, provider, etc.)
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities, auth client config
│   ├── routes/                 # Route constants and middleware helpers
│   ├── providers/              # React context providers
│   └── types/                  # TypeScript interfaces and Zod schemas
└── public/                     # Static assets
```

---

## Getting Started

### Prerequisites

- **Node.js v20+**
- The **[Copper Spoon Backend API](TODO: backend repo link)** running locally on port `5000`

### 1. Clone & Install

```bash
git clone https://github.com/mohammad-faysal-dev/copper-spoon-client.git
cd copper-spoon-client
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Backend API base URL (no trailing slash)
NEXT_PUBLIC_API_URL=http://localhost:5000

# Internal API URL (used in server-side fetches)
API_URL=http://localhost:5000

# App URL (used by Better Auth for redirects)
APP_URL=http://localhost:3000

# Better Auth session endpoint
AUTH_URL=http://localhost:5000/api/auth

# Better Auth secret — generate with: openssl rand -base64 32
AUTH_SECRET=your_secret_here
```

> ⚠️ There is no `.env.local.example` file in this repo yet. Copy the block above directly.

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## Troubleshooting

**Zod validation error on the profile page**
Ensure your backend returns the exact schema the frontend expects. Double-check `NEXT_PUBLIC_API_URL` points to your running backend instance.

**Better Auth sessions not loading**
Clear browser cookies and restart the dev server. Verify `AUTH_SECRET` is set and `AUTH_URL` matches your backend's auth endpoint.

**Orders not fetching / 401 errors**
Server-side fetches pass cookies manually. Ensure the backend is running and `API_URL` is set correctly (not `NEXT_PUBLIC_API_URL` — these serve different purposes).

---

## Roadmap

- [ ] Stripe integration for real-time payment processing
- [ ] Dark mode toggle across all dashboard components
- [ ] Multi-language support (i18n)
- [ ] Sales analytics charts for provider dashboard

---

## Author

**Mohammad Faysal**
- GitHub: [@mohammad-faysal-dev](https://github.com/mohammad-faysal-dev)
- LinkedIn: [TODO: add LinkedIn URL]
- Portfolio: [TODO: add portfolio URL]

---

## License

This project is licensed under the [MIT License](./LICENSE).