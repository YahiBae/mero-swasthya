# Backend - Mero Swasthya

## 📁 Backend Folder Structure

```
backend/
├── config/
│   ├── firebase.json           # Firebase project configuration
│   └── README.md               # Configuration guide
├── firestore/
│   ├── firestore.rules         # Firestore security rules
│   ├── firestore.indexes.json  # Custom Firestore indexes
│   └── README.md               # Firestore guide
├── functions/
│   └── README.md               # Cloud Functions guide (future expansion)
├── docs/
│   └── README.md               # Backend documentation
└── README.md                   # This file
```

## 🚀 Quick Start

### 1. Firebase Setup
- Configuration: `config/firebase.json`
- Database: Firestore (nam5 region)
- Authentication: Email/Password + Google Sign-In

### 2. Security Rules
- File: `firestore/firestore.rules`
- Policy: Default deny, explicit allow for authenticated users
- Users can only access their own documents

### 3. Deploy
```bash
# Deploy everything
firebase deploy

# Deploy only firestore rules
firebase deploy --only firestore:rules

# Deploy only hosting
firebase deploy --only hosting
```

## 📚 Directory Guide

### config/
Firebase project configuration and deployment settings.

**Key Files:**
- `firebase.json` - Main Firebase configuration
  - Firestore database settings
  - Hosting configuration with SPA rewrites
  - Authentication providers setup

### firestore/
Firestore database security and indexing.

**Key Files:**
- `firestore.rules` - Security rules (read/write access control)
- `firestore.indexes.json` - Custom composite indexes
- `README.md` - Detailed Firestore patterns and best practices

### functions/
Firebase Cloud Functions (reserved for future expansion).

**Placeholder for:**
- Serverless backend logic
- API endpoints
- Data processing functions

### docs/
Backend documentation and guides.

## 🔐 Security Overview

### Firestore Rules
```
✅ Authenticated users only
✅ User-specific document access
✅ Default deny policy
✅ No public write access
```

### Authentication (firebase.json)
```
✅ Email/Password: Enabled
✅ Google Sign-In: Enabled
✅ Support Email: spun87235@gmail.com
```

## 🛠️ Firebase Commands

### Login
```bash
firebase login
```

### Select Project
```bash
firebase use --add
```

### Deploy
```bash
firebase deploy                    # Deploy all
firebase deploy --only hosting     # Only hosting
firebase deploy --only firestore:rules  # Only rules
```

### Test Locally
```bash
firebase emulators:start          # Start local emulator
```

### View Logs
```bash
firebase functions:log            # Cloud Functions logs
firebase firestore:delete         # Delete database
```

## 📋 Configuration Checklist

- [x] Firebase project setup
- [x] Firestore database (nam5 region)
- [x] Authentication providers (Email, Google)
- [x] Security rules (user-specific access)
- [x] Hosting configuration (SPA rewrites)
- [ ] Cloud Functions (future)
- [ ] Custom indexes (as needed)
- [ ] Backups (production)

## 🔗 Related Files

**Frontend Related:**
- `.env` / `.env.example` - Firebase credentials
- `firebase.json` - Deployment config (linked to root)
- `.firebaserc` - Firebase project reference

**Documentation:**
1. [Firebase Basics Skill](../.agents/skills/firebase-basics/SKILL.md)
2. [Firestore Basics Guide](./firestore/README.md)
3. [Config Guide](./config/README.md)

## 📞 Support

### Firebase Issues
- Check [Firebase Documentation](https://firebase.google.com/docs)
- Review security rules in `firestore/README.md`
- Test with Firebase Emulator Suite

### Backend Development
- View `functions/README.md` for Cloud Functions setup
- Follow patterns in `firestore/README.md` for data modeling

## 🎯 Next Steps

1. **Explore Firestore Rules**
   - Read: `firestore/README.md`
   - Test locally: `firebase emulators:start`

2. **Understand Configuration**
   - Read: `config/README.md`
   - Review: `config/firebase.json`

3. **Plan Cloud Functions** (future)
   - When needed, use `functions/README.md` as guide
   - Implement serverless backend logic

4. **Monitor & Optimize**
   - Use Firebase Console for analytics
   - Add indexes as queries grow

---

**Last Updated:** April 8, 2026
**Framework:** Firebase (Firestore + Auth + Hosting)
**Region:** nam5 (US-Central1)
