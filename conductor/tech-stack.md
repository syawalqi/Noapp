# Tech Stack: NoApp

## Frontend Framework
- **Core:** React (Functional Components with Hooks)
- **Build Tool:** Vite (Optimized for speed and modern JS features)
- **Language:** JavaScript (ES6+)

## Storage & Data Management
- **Primary Database:** IndexedDB via **Dexie.js**. This allows for high-capacity local storage, robust querying for folders/notes, and reliable persistence.
- **State Management:** **React Context API + Custom Hooks**. A lightweight approach for managing application UI state (active view, theme, focus mode) and bridging with the Dexie.js database.

## Styling & UI
- **CSS Framework:** **Tailwind CSS**. Enables rapid development of the "papery and calm" aesthetic through utility classes and custom design tokens.
- **Icons:** Lucide-react (Clean, lightweight, and modern icon set).

## Security & Cryptography
- **Native Web Crypto API:** Utilized for secure client-side folder locking. 
    - **Hashing:** PBKDF2 for password derivation.
    - **Encryption:** AES-GCM (Optional) for protecting folder content at rest within IndexedDB.

## Deployment & Offline
- **Deployment:** Static hosting (e.g., Vercel, Netlify, or GitHub Pages).
- **Offline Capability:** Service Workers (via ite-plugin-pwa) to ensure the app is fully functional without an internet connection and is installable as a PWA.
