# Copper Spoon Client 🍽️

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)

**Copper Spoon** is a modern, dynamic web application designed to streamline the relationship between restaurant providers and their customers. It features a premium, glassmorphism-inspired UI with robust tools for food ordering, expense invoice generation, and provider profile management.

> **Note:** [TODO: Insert a high-quality screenshot or animated GIF of the dashboard here to replace this block]

**Live Demo:** [TODO: Insert link to deployed app] | **Backend Repo API:** [TODO: Insert link to backend repo if separate]

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
Copy the example environment file and fill in your local details.

```bash
cp .env.local.example .env.local
```
**Required Variables:**
*   `NEXT_PUBLIC_API_URL`: URL to your backend server (e.g., `http://localhost:5000/api`)
*   `AUTH_SECRET`: Secret key for better-auth session encryption.

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev` - Runs the app in development mode.
*   `npm run build` - Builds the app for production to the `.next` folder.
*   `npm run start` - Starts the production server.
*   `npm run lint` - Runs ESLint to catch syntax and style issues.

---

## 🗺️ Roadmap (Upcoming Features)

- [ ] Integrate Stripe for real-time payment processing and secure checkouts.
- [ ] Add dark mode toggle across all dashboard components.
- [ ] Implement multi-language support (i18n) for wider accessibility.
- [ ] Comprehensive analytics charts for provider sales tracking.

---

## 🐛 Troubleshooting

**"I'm getting a Zod validation error on the profile page"**
Ensure that your backend is returning the exact schema expected by the frontend. Check that your local `.env.local` is pointing to the correct development database API.

**"better-auth isn't loading sessions"**
Clear your browser cookies and restart the dev server to ensure the session tokens are refreshed. Check that your `AUTH_SECRET` is correctly set.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Mohammad Faysal**
*   **GitHub:** [@mohammad-faysal-dev](https://github.com/mohammad-faysal-dev)
*   **LinkedIn:** [TODO: Insert your LinkedIn URL]
*   **Portfolio:** [TODO: Insert your website URL]

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
