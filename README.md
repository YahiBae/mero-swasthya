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

Mero Swasthya is a React-based healthcare appointment platform for Nepal.

### Why Mero Swasthya?

- **Provider discovery:** browse hospitals, clinics, and doctors in one place
- **Appointment workflow:** book, view, and manage appointments without friction
- **Authenticated accounts:** sign in with Firebase Auth and keep profile data synced
- **Patient + provider views:** separate dashboard flows for the two roles
- **Deployment ready:** SPA-friendly hosting for deep links and refreshes

---

## ✨ Key Features

### 🏥 Discovery
- Browse hospitals, clinics, and doctors in a single interface
- Open detailed provider pages with service and contact context
- Filter and compare listings by category and location

### 📅 Appointments
- Book appointments from provider detail pages
- Block booking until the user is authenticated
- View upcoming and past appointments
- Clear appointment history with single or multi-select actions

### 👤 Accounts
- Sign up and log in with Firebase Authentication
- Save profile changes to Firestore
- Manage patient and provider profile views
- Store and clean dependent data safely

### 🧭 Experience
- Responsive navigation for desktop and mobile
- Fast client-side routing with React Router
- SPA-friendly deployment for deep links and refreshes

### 🔥 Backend
- Firebase integration for Auth and Firestore
- Environment-based configuration
- Ready for future backend expansion

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
- React 18 - UI framework
- TypeScript - type-safe application code
- Vite - development and build tooling
- React Router - client-side navigation
- TanStack Query - data orchestration

### Styling
- Tailwind CSS - utility-first styling
- shadcn/ui - accessible component system
- Radix UI primitives - low-level UI building blocks
- Lucide React icons - icon set

### State and Data
- React Hook Form - form state handling
- Zod validation - schema validation
- localStorage - selected appointment flows
- Firebase Auth and Firestore - persistent user data

### Utilities
- Sonner - toast notifications
- date-fns - date handling
- Embla Carousel - sliders
- Recharts - charts

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
├── public/                           # Static assets
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── placeholder.svg
│   └── robots.txt
├── src/                              # Application source
│   ├── components/                   # Shared UI and layout components
│   │   ├── ui/                       # shadcn/ui primitives
│   │   ├── BookAppointmentModal.tsx
│   │   ├── DashboardSidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Navbar.tsx
│   ├── data/                         # Mock data and local stores
│   │   ├── appointmentStore.ts
│   │   ├── mockData.ts
│   │   └── siteContent.ts
│   ├── hooks/                        # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── lib/                          # Shared utilities
│   │   └── utils.ts
│   ├── pages/                        # Route pages
│   │   ├── Index.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Services.tsx
│   │   ├── Hospitals.tsx
│   │   ├── HospitalDetails.tsx
│   │   ├── Clinics.tsx
│   │   ├── ClinicDetails.tsx
│   │   ├── Doctors.tsx
│   │   ├── DoctorDetails.tsx
│   │   ├── Departments.tsx
│   │   ├── EmergencyService.tsx
│   │   ├── Diagnostics.tsx
│   │   ├── PatientDashboard.tsx
│   │   ├── PatientAppointments.tsx
│   │   ├── ProfilePage.tsx
│   │   ├── ProviderDashboard.tsx
│   │   ├── ProviderAppointments.tsx
│   │   ├── ProviderSchedule.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.example                      # Firebase env template
├── firebase.json                    # Firebase hosting config
├── firestore.indexes.json           # Firestore indexes
├── firestore.rules                  # Firestore security rules
├── index.html                       # Vite HTML entry
├── package.json                     # Scripts and dependencies
├── playwright.config.ts             # Playwright setup
├── playwright-fixture.ts             # Playwright fixture helpers
├── tailwind.config.ts               # Tailwind config
├── tsconfig.app.json                # App TypeScript config
├── tsconfig.json                    # Base TypeScript config
├── tsconfig.node.json               # Node TypeScript config
├── vercel.json                      # Vercel SPA routing
├── vite.config.ts                   # Vite config
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

### Configured

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

This project is a Vite single-page application and can be deployed to Vercel, Netlify, Cloudflare Pages, or Firebase Hosting.

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
