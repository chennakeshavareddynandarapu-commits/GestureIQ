# PWSIS — Predictive Women Safety Intelligence System

PWSIS is a full-stack, AI-powered safety platform designed to proactively protect women in campuses and public spaces. By shifting from reactive reporting to predictive risk analysis, PWSIS empowers users with real-time intelligence and proactive prevention.

## 🚀 Key Missions
1. **Risk Assessment & Prediction**: Dynamic risk scores and safety heatmaps based on time, lighting, crowd density, and historical data.
2. **Route Intelligence**: AI-recommended safest routes that avoid elevated-risk zones.
3. **Incident Reporting & Community Intelligence**: Anonymous crowd-sourced reporting with real-time aggregation.
4. **Real-Time Alerts**: Notifications for high-risk zones and sudden environmental changes.
5. **Voice Assistant Integration**: Hands-free operation and emergency triggering via voice commands.
6. **Intelligent Inactivity & Distress Detection**: Monitoring for unusual patterns with automated escalation to trusted contacts.
7. **Emergency Response Tools**: Instant SOS, Live Location Streaming, and Silent Mode SOS.

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
   MONGODB_URI=mongodb://localhost:27017/pwsis
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

## 🔒 Privacy & Principles
- **Privacy First**: All reports are anonymous. Location data is shared only with explicit consent or in emergencies.
- **No False Alarms**: Carefully calibrated risk scores to avoid unnecessary fear.
- **Inclusivity**: Accessible design for all tech literacy levels.
- **Transparency**: Clear explanation for flagged high-risk zones.

## 📜 License
Built for PWSIS Safety Initiative. &copy; 2026.

