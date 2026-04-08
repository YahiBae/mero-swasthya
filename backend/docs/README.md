# Backend Structure

## Overview
This directory contains all backend configuration, Firebase setup, and Cloud Functions for the Mero Swasthya appointment system.

## Folder Structure

```
backend/
├── config/              # Firebase and deployment configurations
│   └── firebase.json    # Firebase project configuration
├── firestore/           # Firestore database configuration
│   ├── firestore.rules  # Security rules for Firestore
│   └── firestore.indexes.json  # Custom indexes for Firestore queries
├── functions/           # Cloud Functions (future expansion)
│   └── README.md        # Cloud Functions documentation
└── docs/                # Backend documentation
    └── README.md        # This file
```

## Quick Start

### 1. Firebase Setup
All Firebase configurations are in `config/firebase.json`. This includes:
- Firestore database configuration (location: `nam5`)
- Hosting settings with SPA rewrite rules
- Authentication providers (Email/Password, Google Sign-In)

### 2. Firestore Security Rules
Located in `firestore/firestore.rules`:
- Users can only read/write their own documents
- Default deny policy for all other documents
- Enforces authentication for all operations

### 3. Database Indexes
Configured in `firestore/firestore.indexes.json`:
- Currently empty (using default indexes)
- Add composite indexes here for optimized queries

## Firebase Deployment

### Deploy Changes
```bash
npm run firebase:deploy
```

### Deploy Only Firestore Rules
```bash
firebase deploy --only firestore:rules
```

### Deploy Only Hosting
```bash
firebase deploy --only hosting
```

## Firebase CLI Commands

### Login to Firebase
```bash
firebase login
```

### Select Project
```bash
firebase use --add
```

### Deploy Configuration
```bash
firebase deploy
```

### Set Firestore Rules
```bash
firebase deploy --only firestore:rules
```

## Environment Variables

Backend environment is configured via `.env` and `.env.example` files in the root directory. Key variables:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Cloud Functions (Future)

Cloud Functions templates and implementations will be added in the `functions/` directory. This is reserved for serverless backend logic.

## Security Best Practices

1. **Never commit sensitive keys** - Use environment variables
2. **Review Firestore rules** - Ensure proper access control
3. **Use strong authentication** - Leverage Firebase Auth
4. **Encrypt data in transit** - Always use HTTPS
5. **Monitor Firestore usage** - Track query performance

## Related Documentation

- [Firebase Basics Skill](/Users/sagarpun/Documents/Appointment%20Nepal%20System/.agents/skills/firebase-basics/SKILL.md)
- [Firebase Firestore Skill](/Users/sagarpun/Documents/Appointment%20Nepal%20System/.agents/skills/firebase-firestore-standard/SKILL.md)
- [Firebase Auth Skill](/Users/sagarpun/Documents/Appointment%20Nepal%20System/.agents/skills/firebase-auth-basics/SKILL.md)

## Support

For Firebase-related questions, refer to the Firebase documentation or the agent skills linked above.
