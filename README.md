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

It helps patients discover providers, compare services, and manage appointment workflows in one place.

### Overview

- Discover hospitals, clinics, doctors, and services
- Manage patient and provider appointment flows
- Keep profiles and dependents synced with Firebase
- Deploy as a client-side SPA with route refresh support

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

### Tip

Place the screenshots in a simple flow: home, listing pages, detail pages, then dashboard views.

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

### State & Data
- React Hook Form
- Zod validation
- localStorage for selected appointment flows
- Firebase Auth and Firestore for persistent user data

### Utilities
- Sonner for toast notifications
- date-fns for date handling
- Embla Carousel for sliders
- Recharts for charts

### Hosting and Integrations

- Firebase Auth
- Firestore
- Vercel SPA routing

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:
- Node.js 18 or newer
- npm or Bun installed

### Install Dependencies

1. Install dependencies

```bash
npm install
```

Or with Bun:

```bash
bun install
```

### Run the App Locally

1. Start the development server

```bash
npm run dev
```

Or with Bun:

```bash
bun run dev
```

2. Open the local Vite URL shown in the terminal

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

### Notes

- `src/pages` contains all route-level screens
- `src/components` contains shared UI and layout building blocks
- `src/data` contains mock data and local persistence helpers
- `src/lib/firebase.ts` controls Firebase initialization and fallbacks

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

### Build Notes

- `npm run build` generates the production bundle in `dist`
- `npm run preview` serves the production output locally

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

### Routing Notes

- Refreshing nested routes requires SPA fallback hosting support
- Vercel routing is configured through [vercel.json](vercel.json)

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

### Firebase Keys

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

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

### Future Improvements

- Move more mock data to Firestore
- Add server-side analytics and reporting
- Expand provider and appointment workflows

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

### Suggested Hosts

- Vercel
- Netlify
- Cloudflare Pages
- Firebase Hosting

---

## 🛠️ Troubleshooting

### Blank or broken Firebase screens
- Check that the `.env` file contains the `VITE_FIREBASE_*` values.
- Verify the Firebase project matches the values in [src/lib/firebase.ts](src/lib/firebase.ts).

### Login or register does not work
- Confirm Firebase Authentication is enabled in the Firebase console.
- Make sure email/password sign-in is turned on.

### Route refresh shows 404
- Deploy with SPA fallback support so routes like `/hospitals` and `/doctors/:id` resolve to `index.html`.
- On Vercel, confirm [vercel.json](vercel.json) is included in the deployment.

### Build warnings appear
- `Browserslist` can be updated with `npx update-browserslist-db@latest`.
- The CSS import order warning in `src/index.css` is non-blocking but can be cleaned up later.

---

## ⚠️ Common Issues

### Missing env values
- Copy [.env.example](.env.example) to `.env`.
- Fill all `VITE_FIREBASE_*` values before starting the app.

### Firebase login popup does not open
- Use `npx -y firebase-tools@latest login --no-localhost` if browser-based login fails.
- Make sure Firebase Authentication is enabled for the project.

### Nested route reload fails
- Confirm the host rewrites all routes to `index.html`.
- Keep [vercel.json](vercel.json) in the deployment for Vercel.

### Development build feels stale
- Stop and restart the dev server after changing env values.
- Run `npm run build` again before deployment.

---

## ❓ FAQ

### Is the app production ready?
- The UI and core flows are ready for development and testing.
- For production use, complete Firebase security rules and verify deployment settings.

### Can I run the app without Firebase?
- Yes, but Firebase-backed auth and profile persistence will be limited.
- The app falls back to local project defaults when env values are missing.

### Why does refresh fail on nested routes?
- The app is a single-page application, so hosting must rewrite unknown routes to `index.html`.
- This is already handled in [vercel.json](vercel.json) for Vercel deployments.

### Where do I change the logo and branding?
- Update [public/favicon.svg](public/favicon.svg) for the logo image.
- Update the app name and metadata in [index.html](index.html).

---

## ✅ Setup Checklist

- Copy [.env.example](.env.example) to `.env`
- Fill in the `VITE_FIREBASE_*` values
- Run `npm install`
- Start the app with `npm run dev`
- Verify login, booking, and profile flows
- Run `npm run build` before deployment

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

### Workflow

1. Create a feature branch
2. Make focused changes
3. Run the build locally
4. Review the README and app behavior
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Team

Built with care by the Mero Swasthya team.

### Project Ownership

- App design and implementation: Mero Swasthya
- Documentation: maintained alongside the codebase

---

## 📞 Support

For support, open an issue in the repository or contact the project maintainers.

### Contact

- Repository issues
- Maintainer communication channel

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
