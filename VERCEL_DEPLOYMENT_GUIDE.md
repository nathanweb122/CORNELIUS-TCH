# 🚀 Cornelius TEC — Vercel Deployment & Environment Configuration Guide

This step-by-step guide outlines **exactly which files** are required from this project for a successful deployment to **Vercel**, how to configure environment variables for **Firebase** and **Gemini AI**, and how the integrated email and transmission error logging mechanism operates.

---

## 📁 1. Required Project Files Checklist

Ensure all of the following core project files are committed to your GitHub repository or uploaded when deploying to Vercel:

### ⚙️ Build & Framework Configurations
- `package.json` — Contains all required dependencies (`react`, `@google/genai`, `firebase`, `axios`, `lucide-react`, `motion`, `tailwindcss`, `vite`, `typescript`) and build scripts.
- `vite.config.ts` — Vite compiler and bundler configuration.
- `tsconfig.json` — TypeScript compiler setup.
- `vercel.json` — Vercel SPA rewrite rule configuration (ensures route refreshes like `/marketplace` or `/design-lab` do not throw 404s).
- `.env.example` — Template for required environment variables.

### 🌐 Entry Points & Core Components
- `index.html` — HTML root template.
- `index.tsx` — Main React DOM entry point.
- `App.tsx` — Root component containing client-side routes and navigation state.
- `constants.tsx` — Global constants, pricing tiers, and service definitions.
- `api.ts` — Axios client with smart fallback interceptor for static Vercel hosting (handles auth, design lab, and appointments when server is offline).

### 🔥 Firebase Infrastructure
- `firebase.ts` — Firebase App, Firestore database, and Auth initialization.
- `firebase-applet-config.json` — Project metadata and Firebase config reference.
- `firestoreErrorHandler.ts` — Structured error handling for database operations.
- `firestore.rules` — Firestore security rules.

### 📄 Pages (`/pages/`)
- `pages/Home.tsx` — Landing page and Hero interface.
- `pages/Marketplace.tsx` — Digital Assets Vault & Client Portal.
- `pages/DesignLab.tsx` — AI Architecture & Image Generation Suite.
- `pages/Appointment.tsx` — Strategy Discovery booking page.
- `pages/Login.tsx` — User sign-in view.
- `pages/Signup.tsx` — User registration view.
- `pages/Profile.tsx` — Member profile and assigned licenses view.
- `pages/Services.tsx` — Engineering services overview.

### 🧩 Components (`/components/`)
- `components/Navbar.tsx` — Global top navigation bar.
- `components/Footer.tsx` — Page footer with direct team links.
- `components/AppointmentForm.tsx` — Session booking form with email/transmission error logging.
- `components/DirectContactCard.tsx` — Direct team contact card (WhatsApp QR code, Email dispatch, Copy to clipboard).
- `components/ChatWidget.tsx` — Corneila AI Concierge assistant.
- `components/TalkingAvatar.tsx` — AI Avatar voice synthesizer.
- `components/Hero.tsx` — Interactive banner.
- `components/MarketplaceItem.tsx` — Asset card component.
- `components/ProjectTimeline.tsx` — Milestones visualization.
- `components/Reviews.tsx` — Member feedback grid.
- `components/AdBanner.tsx` — Promotional banner.
- `components/googleAuth.ts` — Google OAuth utility.
- `components/demos/*` — Interactive product preview demos.

---

## 🔑 2. Environment Variables Setup on Vercel

When deploying on Vercel, navigate to your Vercel Project Dashboard:
**Project Settings** ➡️ **Environment Variables** and add the following keys.

### 🔥 Firebase Environment Variables (Required for Auth & Firestore)

| Variable Name | Value Description | Where to Find |
| :--- | :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Your Firebase Web API Key | Firebase Console ➡️ Project Settings ➡️ General ➡️ Web App |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `cornelius-tec.firebaseapp.com` | Firebase Console ➡️ Project Settings ➡️ General |
| `VITE_FIREBASE_PROJECT_ID` | Your Firebase Project ID | Firebase Console ➡️ Project Settings ➡️ General |
| `VITE_FIREBASE_STORAGE_BUCKET` | e.g. `cornelius-tec.appspot.com` | Firebase Console ➡️ Project Settings ➡️ General |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your Firebase Sender ID | Firebase Console ➡️ Project Settings ➡️ General |
| `VITE_FIREBASE_APP_ID` | Your Firebase Web App ID | Firebase Console ➡️ Project Settings ➡️ General |
| `VITE_FIREBASE_MEASUREMENT_ID` | (Optional) Analytics ID | Firebase Console ➡️ Project Settings ➡️ General |

> 💡 **Note:** Vite requires the `VITE_` prefix for client-accessible variables during build time.

---

### 🤖 Gemini AI Environment Variables (Required for Design Lab & AI Concierge)

| Variable Name | Value Description | Where to Find |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Google Gemini API Key | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `VITE_GEMINI_API_KEY` | Copy of Gemini API Key | [Google AI Studio](https://aistudio.google.com/app/apikey) |

---

## 🛠️ 3. Step-by-Step Vercel Deployment Instructions

### Method 1: Deploy via GitHub (Recommended)

1. **Push Code to GitHub**:
   Ensure all files listed in Section 1 are pushed to your GitHub repository.

2. **Import Project to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Select your GitHub repository (`cornelius-tec`).

3. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables**:
   Paste all `VITE_FIREBASE_*` and `GEMINI_API_KEY` / `VITE_GEMINI_API_KEY` values into the Vercel Environment Variables section.

5. **Click Deploy**:
   Vercel will compile the Vite bundle and output a live preview URL (e.g. `https://cornelius-tec.vercel.app`).

---

### Method 2: Deploy via Vercel CLI

If deploying directly from your terminal:

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to preview
vercel

# 4. Set Environment Variables in CLI or Vercel Dashboard
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add GEMINI_API_KEY

# 5. Deploy to Production
vercel --prod
```

---

## 📧 4. Email Sending & Transmission Error Logging Mechanism

To ensure email transmissions, discovery requests, and direct messaging never fail silently or leave users stuck:

### 🔎 Diagnostic Console Logging (`[Email & Transmission Logger]`)
Both `AppointmentForm.tsx` and `DirectContactCard.tsx` now feature structured logging that records:
1. **Timestamp**: ISO string indicating the exact time of transmission.
2. **Target Identifiers**: User email address and destination contact node (`corneliustch@gmail.com`).
3. **Execution Steps**: Logs whether Firestore write succeeded, whether API call completed, or whether mail client pop-up was triggered/blocked.
4. **Failure Diagnostics**: Detailed error objects containing `errorName`, `errorMessage`, and `errorCode` printed directly to browser developer tools console (`console.error`).

### ⚠️ User-Friendly Error Banners & Fallbacks
If an email client pop-up is blocked by browser policy, or if network connectivity prevents automated database booking:
- **Immediate Visual Alert**: A high-visibility error alert banner appears on screen explaining the exact situation in clear language.
- **Copy Email to Clipboard**: Includes a single-click button to copy `corneliustch@gmail.com` directly to clipboard.
- **WhatsApp Direct Switch**: Includes a direct action button to transmit the request via WhatsApp (`+250796569416`) with pre-filled details.
- **Smart Interceptor Fallback**: `api.ts` automatically intercept requests on static hosting deployments (like Vercel) so users always receive confirmation states.

---

## ✅ 5. Post-Deployment Verification Checklist

Once deployed on Vercel, test the following endpoints on your live link:

- [ ] **Auth / Signup**: Create an account on `/signup`. Verify authentication state persists.
- [ ] **Design Lab**: Navigate to `/design-lab` and generate an architectural render. Verify image renders on screen.
- [ ] **Strategy Session Booking**: Submit a discovery booking on `/appointment`. Verify success state and test copying contact email on error simulation.
- [ ] **Direct WhatsApp QR**: Test clicking "Open WhatsApp" or scanning the QR code in `DirectContactCard`.
