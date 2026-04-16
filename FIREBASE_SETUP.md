# Firebase Setup Guide for Sight Chic Store

This guide will walk you through setting up Firebase and Firestore for the Sight Chic Store e-commerce application.

## Prerequisites
- Google account
- Node.js & npm installed
- Project cloned and dependencies installed

## Step-by-Step Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"**
3. Enter project name: `sight-chic-store` (or your preferred name)
4. Choose your preferred settings
5. Create the project and wait for it to initialize

### 2. Enable Firestore Database

1. In Firebase Console, click on your project
2. Go to **Build** → **Firestore Database**
3. Click **"Create Database"**
4. Choose region (select closest to your location)
5. Select **"Start in test mode"** for development
6. Click **"Create"**

**Security Rules (Test Mode):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 1, 1);
    }
  }
}
```
**Update this before production!**

### 3. Enable Cloud Storage

1. Go to **Build** → **Storage**
2. Click **"Get Started"**
3. Choose region (same as Firestore)
4. Start in **"Test mode"**
5. Click **"Create"**

**Storage Rules (Test Mode):**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Get Firebase Configuration

1. Click **Project Settings** (gear icon)
2. Go to **Project settings** tab
3. Scroll to **"Your apps"** section
4. Click the web icon or **"Add app"** → **Web**
5. Register the app
6. Copy the Firebase config object:

```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

### 5. Configure Environment Variables

1. In your project root, create `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Firebase config:
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456

VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
VITE_RAZORPAY_KEY_ID=your_key_id
```

3. Restart your development server:
```bash
npm run dev
```

### 6. Seed Database with Products

1. Navigate to: `http://localhost:8080/admin`
2. You should see the **Admin Panel**
3. Click **"Seed Database"** button
4. Wait for confirmation message
5. View the products in the **Products in Database** section

## Database Structure

### Products Collection
```
/products/{productId}
├── name: string
├── price: number
├── category: 'eyeglasses' | 'sunglasses'
├── image: string (URL)
├── images: string[] (URLs)
├── description: string
├── material: string
├── frameWidth: string
├── lensWidth: string
├── bridgeWidth: string
├── templeLength: string
├── isNew: boolean
└── collection: 'men' | 'women' | 'unisex'
```

## Cloud Storage Structure

Product images are stored at:
```
gs://your-bucket/product-images/{productId}/{imageName}-{timestamp}
```

## Testing Database Connection

1. Go to **Firestore Database** in Firebase Console
2. You should see a **"products"** collection
3. Expand it to view all products
4. Check that product counts match

## Common Issues & Solutions

### Issue: "CORS policy" errors
**Solution:** This is normal for development. Firebase handles CORS automatically.

### Issue: "Permission denied" when seeding
**Solution:** Check test mode is enabled in Firestore Rules

### Issue: Images not loading
**Solution:** Verify Cloud Storage rules allow reads:
```
allow read: if true;
```

### Issue: Can't connect to Firestore
**Solution:** 
1. Verify environment variables are set correctly
2. Restart development server
3. Check Firebase project is active

## Production Deployment

Before deploying to production:

1. **Update Security Rules:**

**Firestore:**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{document=**} {
      allow read;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

**Storage:**
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /product-images/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

2. **Remove test mode expiration date**

3. **Enable Firebase Authentication** (if needed)

4. **Set up Firestore backups**

5. **Enable billing** for production use

## Useful Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/start)
- [Firebase Storage Documentation](https://firebase.google.com/docs/storage)

## Next Steps

- Implement product management panel for adding/editing products
- Add image upload functionality
- Set up automated backups
- Configure Firebase Analytics
- Set up Firebase Authentication for admin panel
