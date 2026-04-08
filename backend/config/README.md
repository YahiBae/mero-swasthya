# Firebase Configuration

## Overview

This directory contains all Firebase project configuration files.

## Files

### firebase.json
Main Firebase configuration file that defines:

**Firestore Settings**
- Database: `(default)`
- Location: `nam5` (North America)
- Rules file: `firestore.rules`
- Indexes file: `firestore.indexes.json`

**Hosting Settings**
- Public directory: `public/`
- SPA rewrite: All routes redirect to `/index.html` for client-side routing
- Ignored files: `.env`, `node_modules/`, hidden files

**Authentication**
- Email/Password authentication: ✅ Enabled
- Google Sign-In: ✅ Enabled
  - Brand Name: `mero-swasthya`
  - Support Email: `spun87235@gmail.com`

## Usage

### Deploy Configuration
```bash
# Deploy all
firebase deploy

# Deploy only Hosting
firebase deploy --only hosting

# Deploy only Firestore rules
firebase deploy --only firestore:rules
```

### Update Configuration
Edit this file directly to change:
- Database location
- Hosting rules
- Authentication providers
- Rewrite rules

After changes, deploy with `firebase deploy`.

## Important Notes

1. **Location**: `nam5` means US-Central1 region for Firestore
2. **Rules file path**: Must match actual file location
3. **Public directory**: Points to the build output directory
4. **SPA rewrites**: Essential for React Router to work on Firebase Hosting

## Related Files

- `../firestore/firestore.rules` - Access control rules
- `../firestore/firestore.indexes.json` - Query indexes
