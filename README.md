# Copper Spoon — Online Food Ordering Platform

> A full-stack food ordering platform where restaurant providers manage their business and customers place orders — all in one seamless experience.

**Live Demo:** [copper-spoon-client.vercel.app](https://copper-spoon-client.vercel.app) &nbsp;·&nbsp; **Backend API:** [copper-spoon-server.vercel.app](https://copper-spoon-server.vercel.app)

---

## What Is This?

**Copper Spoon** is a role-based food ordering web application built for real-world use. It supports three types of users — each with their own dedicated dashboard and tailored experience.

| Role | Capabilities |
|---|---|
| **Customer** | Browse the menu, add items to cart, place orders, track order status in real time |
| **Provider** | Manage restaurant profile, monitor and update incoming orders |
| **Admin** | Oversee platform data, manage food categories |

---

## Tech Stack

Built with a modern, production-ready stack:

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) — App Router, SSR, Parallel Routes |
| Language | TypeScript 5 |
| Styling | [TailwindCSS v4](https://tailwindcss.com/) + [Shadcn/ui](https://ui.shadcn.com/) |
| Auth | [Better Auth](https://better-auth.com/) — session-based, role-gated access |
| Forms & Validation | [Zod v4](https://zod.dev/) + TanStack Form |
| Notifications | Sonner |
| Icons | Lucide React |

---

## Key Features

- **Role-Based Access Control** — Each role (admin, provider, customer) has its own protected dashboard powered by Next.js parallel routes and Better Auth middleware.
- **Live Order Tracking** — Customers see their order progress update in real time: `Pending → Processing → Delivered`.
- **Smooth Checkout Flow** — Add to cart, review order, confirm — clean and distraction-free.
- **Provider Profile Management** — Providers can update their restaurant name, address, phone, and description from the dashboard.
- **Premium UI/UX** — Glassmorphism-inspired design with gradient backgrounds, smooth micro-animations, and a fully responsive layout.

---

## Project Structure

```
copper-spoon-client/
├── src/
│   ├── app/
│   │   ├── (commonLayout)/        # Public pages: Home, Menu, Login, Register
│   │   └── (dashboardLayout)/     # Protected dashboards (role-gated)
│   │       ├── @admin/            # Admin: category & platform management
│   │       ├── @customer/         # Customer: orders, cart, profile
│   │       └── @provider/         # Provider: orders, restaurant profile
│   ├── components/                # Reusable UI components
│   ├── services/                  # API layer (menu, orders, auth, etc.)
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Auth client, utility functions
│   └── types/                     # TypeScript interfaces & Zod schemas
└── public/                        # Static assets
```

---

## Demo Credentials

Want to explore the platform right now? Use these pre-seeded test accounts — no sign-up needed:

**Admin**
```
Email:    admin@gmail.com
Password: 12345678
```

**Provider**
```
Email:    rahim@gmail.com
Password: 12345678
```

**Customer**
```
Email:    foysal@gmail.com
Password: 12345678
```

> Go to [/login](https://copper-spoon-client.vercel.app/login), enter the credentials, and you'll be redirected to the appropriate dashboard automatically.

---

## Run Locally

### Prerequisites
- Node.js v20+
- Copper Spoon Backend running on port `5000`

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/mohammad-faysal-dev/copper-spoon-client.git
cd copper-spoon-client

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Create a `.env.local` file in the root before running:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
API_URL=http://localhost:5000
APP_URL=http://localhost:3000
AUTH_URL=http://localhost:5000/api/auth
AUTH_SECRET=your_secret_here   # generate: openssl rand -base64 32
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Common Issues

**Sessions not loading after login**
→ Clear browser cookies, restart the dev server, and verify `AUTH_SECRET` and `AUTH_URL` are correctly set.

**401 errors / orders not fetching**
→ Make sure `API_URL` is set correctly. Server-side fetches use `API_URL`, not `NEXT_PUBLIC_API_URL`.

**Profile page validation errors**
→ Ensure the backend is returning data in the exact shape the frontend expects. Check `NEXT_PUBLIC_API_URL`.

---

## Roadmap

- [ ] Stripe payment integration
- [ ] Dark mode across all dashboards
- [ ] Sales analytics charts for providers
- [ ] Multi-language support (i18n)

---

## Author

**Mohammad Faysal** — Full Stack Developer

- GitHub: [@mohammad-faysal-dev](https://github.com/mohammad-faysal-dev)
- LinkedIn: [mohammad-foysal-dev](https://www.linkedin.com/in/mohammad-foysal-dev/)
- Portfolio: [mohammad-faysal-dev.netlify.app](https://mohammad-faysal-dev.netlify.app/)

---

## License

This project is licensed under the [MIT License](./LICENSE).