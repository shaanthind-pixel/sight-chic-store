# Sight Chic Store - E-commerce Website

A modern e-commerce website built with React, TypeScript, Vite, and Tailwind CSS featuring payment gateway integration.

## Features

- 🛍️ Product catalog with dynamic database integration
- 🛒 Shopping cart functionality
- 💳 Payment integration with Stripe and Razorpay
- 📱 Responsive design
- 🎨 Modern UI with ShadCN components
- 🗄️ Firebase Firestore for product data
- ☁️ Cloud Storage for product images
- ⚡ Real-time product updates

## Payment Gateways

This project includes integration with two popular payment gateways:

### Stripe
- Supports credit/debit cards
- Secure payment processing
- International payments

### Razorpay
- Popular in India
- Supports UPI, Net Banking, Cards, and Wallets
- INR currency support

## Setup Instructions

### Prerequisites
- Node.js & npm installed
- Git
- Firebase account (free tier available)

### Installation

1. Clone the repository:
```sh
git clone <YOUR_GIT_URL>
cd sight-chic-store
```

2. Install dependencies:
```sh
npm install
```

3. Start the development server:
```sh
npm run dev
```

### Database Setup (Firebase/Firestore)

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Add project"
3. Enter project name and create project

#### Step 2: Enable Firestore Database
1. In Firebase Console, go to "Build" → "Firestore Database"
2. Click "Create Database"
3. Start in test mode (for development)
4. Select your region and create

#### Step 3: Enable Cloud Storage
1. Go to "Build" → "Storage"
2. Click "Get Started"
3. Start in test mode and create

#### Step 4: Get Firebase Config
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click the web app (or create one)
4. Copy the firebaseConfig object

#### Step 5: Configure Environment Variables
1. Create `.env.local` file in project root (copy from .env.example)
2. Add your Firebase configuration:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

#### Step 6: Seed Database with Products
1. Go to `http://localhost:8080/admin`
2. Click "Seed Database" button
3. Products will be automatically added to Firestore

#### Step 7: Firestore Security Rules (Important!)
For production, update your Firestore security rules:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read for all users
    match /products/{document=**} {
      allow read;
      allow write: if request.auth != null;
    }
  }
}
```

### Payment Gateway Configuration

#### For Stripe:
1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your publishable key from the Stripe dashboard
3. Replace `pk_test_your_stripe_publishable_key_here` in `src/pages/Checkout.tsx` with your actual key

#### For Razorpay:
1. Create a Razorpay account at [razorpay.com](https://razorpay.com)
2. Get your Key ID from the Razorpay dashboard
3. Replace `your_razorpay_key_id` in `src/pages/Checkout.tsx` with your actual key

#### Backend Setup (Required for Production)
For production use, you'll need a backend server to:
- Create payment intents (Stripe)
- Create orders (Razorpay)
- Handle webhooks for payment confirmation

Example backend endpoints needed:
- `POST /api/create-payment-intent` (Stripe)
- `POST /api/create-razorpay-order` (Razorpay)

## Project Structure

```
src/
├── components/
│   ├── ui/          # ShadCN UI components
│   └── SharedComponents.tsx
├── config/
│   └── firebase.ts  # Firebase configuration
├── contexts/
│   ├── CartContext.tsx
│   ├── WishlistContext.tsx
│   └── ProductContext.tsx     # Products from Firestore
├── data/
│   └── products.ts  # Initial product data
├── pages/
│   ├── Cart.tsx
│   ├── Checkout.tsx     # Payment integration
│   ├── Admin.tsx        # Database management
│   ├── Home.tsx
│   └── ...
├── services/
│   └── firestoreService.ts  # Firestore operations
├── utils/
│   └── seedDatabase.ts  # Database seeding utility
└── App.tsx
```

## Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS, ShadCN UI
- **Database**: Firebase Firestore
- **Storage**: Firebase Cloud Storage
- **Payments**: Stripe, Razorpay
- **State Management**: React Context
- **Routing**: React Router

## Development

```sh
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Admin Panel

Access the admin panel at `http://localhost:8080/admin` to:
- View database connection status
- See all products in database
- Seed database with initial products
- Monitor product counts
- View Firebase setup instructions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
