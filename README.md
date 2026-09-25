# Copper Spoon Client 🍽️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)

**Copper Spoon** is a modern, dynamic web application designed to streamline the relationship between restaurant providers and their customers. It features a premium, glassmorphism-inspired UI with robust tools for food ordering, expense invoice generation, and provider profile management.

**Live Demo:** [PASTE_DEPLOYED_APP_URL] &nbsp;|&nbsp; **Backend API Repo:** [PASTE_BACKEND_REPO_URL]

---

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, SSG/SSR)
- **UI & Styling:** [TailwindCSS v4](https://tailwindcss.com/) + Shadcn/ui + Base-UI
- **Validation:** [Zod](https://zod.dev/) + React Form
- **Authentication:** [Better Auth](https://better-auth.com/)
- **Icons & Assets:** Lucide React

## ✨ Key Features

- **Provider Dashboard:** A specialized data-driven interface for restaurant providers to manage profiles, track orders, and generate expense invoices.
- **Dynamic Ordering System:** Real-time customer cart, live tracking stepper, and smooth checkout flow.
- **High-End UI/UX:** Premium aesthetic utilizing modern gradients, micro-animations, and responsive glassmorphism layouts.
- **PDF Generation:** Automated expense invoice downloads directly from the dashboard.
- **Role-Based Access Control:** Secure access differentiating between customers and restaurant providers.

---

## 📂 Project Structure

A quick look at how the core application is organized:

```text
copper-spoon-client/
├── src/
│   ├── app/              # Next.js App Router (Pages, Layouts, API Routes)
│   ├── components/       # Reusable UI components (shadcn, layout, etc.)
│   ├── hooks/            # Custom React hooks for state and data fetching
│   ├── lib/              # Utility functions and API configurations
│   └── types/            # TypeScript interfaces and schema validations
├── public/               # Static assets (images, fonts, templates)
└── [Configuration Files] # tailwind.config, tsconfig, package.json etc.
```

---

## 🛠️ Getting Started

### Prerequisites
Make sure you have **Node.js (v20+)** installed on your machine.

### 1. Clone & Install

```bash
git clone https://github.com/mohammad-faysal-dev/copper-spoon-client.git
cd copper-spoon-client
npm install
```

### 2. Environment Variables

Copy the example environment file and fill in your local details:

```bash
cp .env.local.example .env.local
```

**Required Variables:**

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL to your backend server (e.g., `http://localhost:5000/api`) |
| `AUTH_SECRET` | Secret key for Better Auth session encryption — generate with `openssl rand -base64 32` |

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Runs the app in development mode |
| `npm run build` | Builds the app for production to the `.next` folder |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to catch syntax and style issues |

---

## 🐛 Troubleshooting

**"I'm getting a Zod validation error on the profile page"**
Ensure your backend is returning the exact schema expected by the frontend. Check that `.env.local` is pointing to the correct development database API.

**"Better Auth isn't loading sessions"**
Clear your browser cookies and restart the dev server to refresh session tokens. Check that `AUTH_SECRET` is correctly set.

---

## 🗺️ Roadmap

- [ ] Stripe integration for real-time payment processing
- [ ] Dark mode toggle across dashboard components
- [ ] Multi-language support (i18n)
- [ ] Analytics charts for provider sales tracking

---

## 👨‍💻 Author

**Mohammad Faysal**
- **GitHub:** [@mohammad-faysal-dev](https://github.com/mohammad-faysal-dev)
- **LinkedIn:** [PASTE_LINKEDIN_URL]
- **Portfolio:** [PASTE_PORTFOLIO_URL]

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.