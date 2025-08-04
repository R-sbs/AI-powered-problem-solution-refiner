# AI-Powered Problem-Solution Refiner

A React.js application that allows users to input a problem and solution statement, refine them via Google’s Gemini (Generative Language API), and generate a final display view. This README will guide you through setup, development.

---

## Table of Contents

1. [Features](#features)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Setup](#setup)

   * [Backend (Express Proxy)](#backend-express-proxy)
   * [Frontend (React + Vite)](#frontend-react--vite)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Usage](#usage)
8. [Mock vs. Real API](#mock-vs-real-api)
9. [Building & Deployment](#building--deployment)
10. [Troubleshooting](#troubleshooting)
11. [License](#license)

---

## Features

* **Input Form**: Enter problem & solution statements and select a perspective (Investor, Market, Customer).
* **AI Refinement**: Improve text using Google’s Gemini via a secure Express proxy.
* **Final View**: View the refined problem and solution with clear layout.
* **Loading States**: Visual feedback while the API processes.
* **Responsive**: Mobile‑friendly layout with Tailwind CSS.
* **TypeScript**: Typesafety across components.

---

## Prerequisites

* **Node.js** ≥ 18
* **npm** ≥ 8
* Google Cloud project with Generative Language API enabled
* A valid **Google API Key** with `generativelanguage.googleapis.com` scope

---

## Project Structure

```
ai-refiner/
├── public/                   # Static assets
├── server.js                 # Express proxy to Gemini API
├── .env                      # Environment variables (not committed)
├── vite.config.js            # Vite proxy config
├── package.json              # Shared scripts/dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.js        # TailwindCSS config
└── src/                      # Frontend source
    ├── api/                  # API clients (mock & Gemini)
    │   ├── mockOpenAI.ts     # Mocked improvement client
    │   └── gemini.ts         # Real Gemini client
    ├── pages/
    │   ├── Home.tsx          # Input & refine form
    │   └── Result.tsx        # Final display view
    ├── App.tsx               # React Router setup
    ├── main.tsx              # Entry point
    └── index.css             # Tailwind import
```

---

## Setup

### Backend (Express Proxy)

1. Install dependencies:

   ```bash
   npm install express cors axios dotenv
   ```
2. Create a `.env` at project root:

   ```env
   GOOGLE_API_KEY=YOUR_GOOGLE_API_KEY
   ```
3. Start the proxy:

   ```bash
   node server.js
   ```

   > The proxy will listen on `http://localhost:4000` and expose `/api/improve`.

### Frontend (React + Vite)

1. Install dependencies (from project root):

   ```bash
   npm install
   npm install react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure `vite.config.js` to proxy `/api` to `http://localhost:4000`:

   ```js
   // vite.config.js
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     server: {
       proxy: {
         '/api': 'http://localhost:4000'
       }
     }
   })
   ```

3. Ensure TailwindCSS is imported in `src/index.css`:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Install TypeScript types:

   ```bash
   npm install -D @types/react @types/react-dom
   ```

---

## Environment Variables

| Variable         | Description                                |
| ---------------- | ------------------------------------------ |
| `GOOGLE_API_KEY` | API key for Google Generative Language API |

> **Note:** Never commit `.env` to source control. Use `.env.local` or your platform’s secret manager in production.

---

## Running the Application

From the project root:

```bash
# 1. Start backend proxy
node server.js &

# 2. Start frontend dev server
npm run dev
```

* Frontend: `http://localhost:5173`
* Proxy: `http://localhost:4000`

---

## Usage

1. Open [http://localhost:5173](http://localhost:5173) in your browser.
2. Enter a **Problem Statement** and click **Improve Problem**.
3. Enter a **Solution Statement** and click **Improve Solution**.
4. Select a **Perspective** from the dropdown.
5. Click **Generate Final View** to see both improved texts and the chosen perspective.
6. Click **Back to Edit** to refine again.

---

## Mock vs. Real API

* **Mock**: Uses `src/api/mockOpenAI.ts` for offline testing (converts text to uppercase). Uncomment or import this to skip API costs.
* **Real**: Uses `src/api/gemini.ts` to fetch from Google Gemini via `/api/improve`.

Switch by updating the import in `Home.tsx`:

```diff
- import { improveText } from '../api/mockOpenAI'
+ import { improveText } from '../api/gemini'
```

---

## Building & Deployment

1. **Build Frontend**:

   ```bash
   npm run build
   ```
2. **Serve Static Files** with your chosen server (e.g., Vercel, Netlify).
3. **Deploy Backend** (Express proxy) separately or as serverless functions.

> On platforms like Vercel, you can combine both in a mono‑repo with a `vercel.json` configuration.

---

## Troubleshooting

* **CORS errors**: Ensure the proxy is running and Vite’s proxy is configured.
* **API errors**: Check `GOOGLE_API_KEY` and that the Generative Language API is enabled in GCP.
* **TypeScript issues**: Run `npm run dev -- --force` or restart your IDE.


