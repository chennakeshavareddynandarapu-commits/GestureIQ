# A3Jsecure — SafeHer Predictive Women Safety Intelligence System

A3Jsecure is a full-stack, AI-powered safety platform designed to proactively protect women in campuses and public spaces. By shifting from reactive reporting to predictive risk analysis, A3Jsecure empowers users with real-time intelligence.

## 🚀 Key Features
- **Predictive Heatmap**: AI-driven visualization of high-risk zones based on incident frequency and time patterns.
- **Anonymous Reporting**: Multi-step form for reporting incidents without storing any PII (Personally Identifiable Information).
- **Safe Route Planner**: AI-recommended paths that avoid yellow and red risk zones.
- **Real-time Stats**: Live feed of safety analytics and community alerts.
- **Premium UI**: Dark-themed, glassmorphic interface built with React, Tailwind CSS, and Framer Motion.

## 🛠️ Technology Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Leaflet.js, Lucide Icons.
- **Backend**: Node.js, Express, MongoDB, Mongoose.
- **Intelligence**: Risk Scoring Algorithm, NLP Incident Tagging, Anonymization Middleware.

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas URI)

### Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env`:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/a3jsecure
   JWT_SECRET=your_secret_key
   ```
4. Start the server (Dev Mode):
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the application at `http://localhost:5173`.

## 🔒 Privacy & Security
- **Zero PII**: No names, emails, or phone numbers are ever stored.
- **Anonymization**: Device identifiers and IP addresses are stripped at the ingestion layer.
- **Compliant**: Designed with GDPR best practices for data handling.

## 📜 License
Built for A3Jsecure Safety Initiative. &copy; 2026.
