# 🏥 Mero Swasthya - Healthcare Appointments Nepal

A modern healthcare appointment platform for discovering hospitals, clinics, doctors, and services across Nepal.

![React](https://img.shields.io/badge/React-18.3.1-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178c6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%26%20Firestore-ffca28?logo=firebase&logoColor=black)

---

## 📋 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Environment Variables](#environment-variables)
- [Firebase Integration](#firebase-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Team](#team)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

---

## 🎯 About

Mero Swasthya is a React-based healthcare appointment system designed to help people in Nepal discover providers, compare services, and manage appointment workflows in one place.

The app includes:

- hospital, clinic, and doctor listings
- detailed provider profile pages
- patient and provider dashboards
- appointment booking and management flows
- authenticated profile and dependent management
- Firebase Auth and Firestore support for persistent user data

---

## ✨ Key Features

### 🏥 Provider Discovery
- Browse hospitals, clinics, and doctors in one interface
- Open detailed pages for each provider
- Filter and compare listings by category and location

### 📅 Appointment Management
- Book appointments from provider detail pages
- Prevent booking without authentication
- View upcoming and past appointments
- Clear appointment history with single or multi-select actions

### 👤 Account Experience
- Sign up and log in with Firebase Authentication
- Save profile changes to Firestore
- Manage patient and provider profile views
- Store and clean dependent data safely

### 🧭 Navigation and UX
- Responsive navigation for desktop and mobile
- Fast client-side routing with React Router
- Polished homepage, footer, and dashboard layouts
- SPA-friendly deployment for deep links and refreshes

### 🔥 Backend Ready
- Firebase integration for Auth and Firestore
- Environment-based configuration
- Secure foundation for future backend expansion

---

## 🖼️ Screenshots

Add screenshots here when available.

Suggested captures:
- Home page hero and featured listings
- Hospitals, clinics, and doctors pages
- Hospital, clinic, and doctor detail pages
- Patient dashboard and appointment history
- Provider dashboard and schedule pages

---

## 🧱 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- React Router
- TanStack Query

### Styling
- Tailwind CSS
- shadcn/ui
- Radix UI primitives
- Lucide React icons

### State and Data
- React Hook Form
- Zod validation
- localStorage for selected appointment flows
- Firebase Auth and Firestore for persistent user data

### Utilities
- Sonner for toast notifications
- date-fns for date handling
- Embla Carousel for sliders
- Recharts for charts

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:
- Node.js 18 or newer
- npm or Bun installed

### Install Dependencies

Using npm:

```bash
npm install
```

Using Bun:

```bash
bun install
```

### Run the App Locally

Using npm:

```bash
npm run dev
```

Using Bun:

```bash
bun run dev
```

Open the app in your browser at the local Vite URL shown in the terminal.

---

## 📁 Project Structure

```text
Appointment Nepal System/
├── public/
│   ├── favicon.ico
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── ui/
│   │   └── ...shared UI and layout components
│   ├── data/
│   │   ├── appointmentStore.ts
│   │   └── mockData.ts
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   ├── Hospitals.tsx
│   │   ├── Clinics.tsx
│   │   ├── Doctors.tsx
│   │   ├── Departments.tsx
│   │   ├── EmergencyService.tsx
│   │   ├── Diagnostics.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── PatientAppointments.tsx
│   │   ├── ProviderDashboard.tsx
│   │   ├── ProviderAppointments.tsx
│   │   └── ProviderSchedule.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── firebase.json
├── firestore.rules
├── firestore.indexes.json
├── vercel.json
├── vite.config.ts
├── package.json
└── README.md
```

---

## 🧰 Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm run build:dev` | Build using the development mode |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |

---

## 🗺️ Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/login` | Login page |
| `/register` | Registration page |
| `/services` | Services overview |
| `/hospitals` | Hospitals listing |
| `/hospitals/:id` | Hospital details |
| `/clinics` | Clinics listing |
| `/clinics/:id` | Clinic details |
| `/doctors` | Doctors listing |
| `/doctors/:id` | Doctor details |
| `/departments` | Departments page |
| `/emergency` | Emergency service page |
| `/diagnostics` | Diagnostics page |
| `/dashboard` | Patient dashboard |
| `/dashboard/appointments` | Patient appointments page |
| `/dashboard/profile` | Patient profile page |
| `/provider` | Provider dashboard |
| `/provider/appointments` | Provider appointments page |
| `/provider/schedule` | Provider schedule page |
| `/provider/profile` | Provider profile page |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root and set the Firebase values used by the app.

```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

A starter template is available in [.env.example](.env.example).

---

## 🔥 Firebase Integration

Firebase is wired into the app for authentication and Firestore-backed user data.

### What is already configured
- Firebase app initialization in [src/lib/firebase.ts](src/lib/firebase.ts)
- Email/password authentication
- Firestore access for profile and dependent data
- Auth-gated booking flows
- Persistent profile updates

### Notes
- If Firebase environment variables are missing, the app falls back to the configured project values in [src/lib/firebase.ts](src/lib/firebase.ts).
- Add or update Firestore security rules before using the app in production.

---

## 🚢 Deployment

This project is a Vite single-page application and can be deployed to platforms like Vercel, Netlify, Cloudflare Pages, or Firebase Hosting.

### Production Build

```bash
npm run build
```

### Preview Locally

```bash
npm run preview
```

### SPA Routing Notes

If you deploy to a static host, make sure unknown routes redirect to `index.html` so deep links like `/hospitals` and `/doctors/:id` keep working on refresh.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the build and tests
5. Open a pull request

Recommended commit style:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `refactor:` for code cleanup
- `test:` for tests

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

Built with care by the Mero Swasthya team.

---

## 📞 Support

For support, open an issue in the repository or contact the project maintainers.

---

## 🙏 Acknowledgments

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Radix UI
- Firebase
- Lucide React
- The Nepal healthcare community

---

Made for better healthcare access in Nepal.
