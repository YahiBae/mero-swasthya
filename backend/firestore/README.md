# Firestore Security & Indexes

## Overview

This directory manages Firestore database security rules and custom indexes.

## Files

### firestore.rules
Security rules that control read/write access to Firestore documents.

**Current Rules**
- ✅ Authenticated users can only read/write their own user documents
- ✅ All other documents have a default deny policy (secure by default)
- ✅ Enforces authentication for all operations

**Rules Syntax**
```
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}
```

### firestore.indexes.json
Custom composite indexes for optimized Firestore queries.

**Current Status**
- Empty (using default indexes)
- Add composite indexes here as query performance requirements grow

**Example Index**
```json
{
  "indexes": [
    {
      "collectionGroup": "appointments",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "doctorId", "order": "ASCENDING" },
        { "fieldPath": "date", "order": "DESCENDING" }
      ]
    }
  ]
}
```

## Deploy Security Rules

### Deploy Only Rules
```bash
firebase deploy --only firestore:rules
```

### Test Rules Locally
```bash
firebase emulators:start
```

## Best Practices

### 1. Default Deny
```
match /{document=**} {
  allow read, write: if false;
}
```
Always use explicit allow rules instead of relying on absence of rules.

### 2. User-Specific Access
```
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
```
Ensure users can only access their own data.

### 3. Server-Side Timestamps
```
allow create: if request.resource.data.createdAt == request.time;
```
Use server timestamps to prevent tampering.

### 4. Data Validation
```
allow write: if request.resource.data.email.matches('[a-z0-9._%+-]+@[a-z0-9.-]+')
```
Validate data format before write.

## Common Patterns

### Public Read, Authenticated Write
```
match /posts/{document=**} {
  allow read: if true;
  allow write: if request.auth != null;
}
```

### Admin Only
```
match /admin/{document=**} {
  allow read, write: if request.auth.token.admin == true;
}
```

### Time-Based Access
```
allow read: if request.time < timestamp.date(2024, 12, 31);
```

## Debugging

### View Active Rules
```bash
firebase firestore:indexes
```

### View Firestore Usage
- Go to: Firebase Console > Firestore > Analytics
- Check for denied requests or errors

## Related Documentation

- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Rules Playground](https://firebase.google.com/docs/firestore/security/test-rules-explorer)

## Migration Path

As the application grows:
1. Add composite indexes for frequently used queries
2. Expand role-based access control (RBAC)
3. Implement rate limiting rules
4. Add data validation middleware
