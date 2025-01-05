# Photogram

<div align="center">


[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.0-orange)](https://firebase.google.com/)
[![Uploadcare](https://img.shields.io/badge/Uploadcare-3.0-brightgreen)](https://uploadcare.com/)


[Demo](https://photo-gram-six.vercel.app/) | [Documentation](https://github.com/sameer2006-s/PhotoGram/wiki) | [Report Bug](https://github.com/sameer2006-s/PhotoGram/issues) | [Request Feature](https://github.com/sameer2006-s/PhotoGram/issues)

</div>

## 📋 Table of Contents

- [About](#about)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About

**Photogram** is a simple, fun social media project created as part of my learning journey with modern web development technologies. It allows users to share and interact with images, fostering a sense of community and creativity. Built to explore React, TypeScript, and Firebase, Photogram highlights my hands-on experience with these technologies, focusing on scalability, performance, and delivering an engaging user experience.
.

## ✨ Key Features

- **Secure Authentication**
  - Email/Password authentication
  - OAuth integration (Google)
  - Session management

- **Image Management**
  - High-resolution image uploads
  - Multiple image formats support
  - Automatic image optimization
  - Custom filters and effects

- **Social Interaction**
  - Real-time photo feed
  - Like and save functionality

- **Profile Management**
  - Customizable user profiles
  - Activity tracking
  - Privacy settings
  - Content management

## 🛠 Tech Stack

- **Frontend**
  - React 18
  - TypeScript 5.0
  - Vite
  - Tailwind CSS

- **Backend Services**
  - Firebase Authentication
  - Cloud Firestore
  - Firebase Storage
  - UploadCare


## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

```bash
node -v # v16.0.0 or higher
npm -v  # v8.0.0 or higher
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sameer2006-s/PhotoGram.git
cd PhotoGram
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
```

## ⚙️ Configuration

### Uploadcare Setup

1. Create an account at [Uploadcare](https://uploadcare.com)
2. Get your public key from the Dashboard
3. Install Uploadcare widget:
```bash
npm install @uploadcare/react-widget
```

4. Configure Uploadcare in your application:

```typescript
// src/config/uploadcare.ts
import { Widget } from '@uploadcare/react-widget';

const UPLOADCARE_PUBLIC_KEY = import.meta.env.VITE_UPLOADCARE_PUBLIC_KEY;

export const uploadcareOptions = {
  publicKey: UPLOADCARE_PUBLIC_KEY,
  imagesShrink: '1024x1024',
  imageShrinkQuality: 90,
  crop: '1:1',
  previewStep: true,
};

export { Widget as UploadcareWidget };
```

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication methods:
   - Email/Password
   - Google
3. Create a Firestore database
4. Set up Storage rules
5. Configure Firebase in your application:

```typescript
// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## 📱 Usage

### User Authentication

```typescript
import { auth } from '@/config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};
```

## Image Upload with Uploadcare

```typescript
import { UploadcareWidget, uploadcareOptions } from '@/config/uploadcare';

const ImageUpload = () => {
  const handleUpload = (fileInfo) => {
    if (fileInfo) {
      const imageUrl = fileInfo.cdnUrl;
      // Store the URL in your database or use it directly
      console.log('Uploaded image URL:', imageUrl);
    }
  };

  return (
    
  );
};
```

## 🌐 Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Vercel:
```bash
vercel --prod
```

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

Project Link: [https://github.com/sameer2006-s/PhotoGram](https://github.com/sameer2006-s/PhotoGram)

---

<div align="center">
Made by Sameer Ahmed
</div>
