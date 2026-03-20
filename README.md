# GestureIQ — Real-Time AI Gesture Intelligence Platform

**GestureIQ** is a cutting-edge, full-stack AI platform that utilizes hand gesture recognition and **Deterministic Finite Automata (DFA)** to create a secure, intentional, and high-precision Human-Machine Interface (HMI). 

Instead of reacting to single accidental gestures, GestureIQ validates **gesture sequences** to ensure user intent before triggering critical system actions.

---

## 🧠 The Core Engine: DFA Validation

The breakthrough of GestureIQ is its internal **DFA (Deterministic Finite Automaton)** engine. Traditional gesture detection is often prone to false positives. By requiring a specific sequence of movements, the system achieves:

- **Zero False Triggers**: Accidental gestures cannot activate system protocols.
- **Intent-Driven Interaction**: Only deliberate, ordered sequences reach the `ACCEPT` state.
- **Robustness**: A reliable interface for high-stakes environments like Medical and Industrial zones.

> [!TIP]
> **View Details**: Read the full logic breakdown in [Role of DFA in GestureIQ](role%20of%20DFA/Role_of_DFA_in_GestureIQ.md).

---

## 📦 Project Modules

GestureIQ includes three specialized domain modules, each with its own unique DFA configuration:

### 1. 🎓 Education Module
An interactive science quiz where students use gestures to progress.
- **Sequence**: `Point` to select → `Wait` for feedback → `ThumbsUp/Down` to answer.
- **DFA Logic**: Prevents accidental answers by requiring a multi-step confirmation.

### 2. 🏥 Medical Training
A precision anatomy identification tool for medical trainees.
- **Sequence**: `Point` at organ → `Wait 2s` → `OK Sign` to confirm inspection.
- **DFA Logic**: Mimics surgical protocols where every action must be verified.

### 3. 💼 Professional Controller
A touchless presentation system for high-stakes corporate environments.
- **Logic**: Maps single-gesture transitions (`Open Palm` = Next, `Fist` = Prev) for fast, reliable interaction without the need for physical controllers.

---

## 🛠️ Technology Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons.
- **Backend**: Node.js, Express, Socket.io (Real-time).
- **Vision**: MediaPipe (21 hand landmark extraction), Sub-millisecond precision.
- **Intelligence**: Custom DFA State Engine (JSON-Configurable).

---

## 🚀 Live Protocol Setup

### Prerequisites
- Node.js (v18+)
- Web Browser with Camera access

### 1. Backend Launch
```bash
cd server
npm install
npm run dev
```

### 2. Client Launch
```bash
cd client
npm install
npm run dev
```
Open **http://localhost:5173** to access the system.

---

## 📡 WebSocket Architecture
The system uses high-speed WebSockets for a seamless loop:
1. **Frontend** captures 21 hand landmarks.
2. **Gesture Event** is sent to the server.
3. **DFA Engine** processes the state transition.
4. **DFA Update** is pushed back to the client UI (Real-time graph & feedback).

---

## 📜 Repository Structure
- `/client`: React application with real-time UI components and DFA Viz.
- `/server`: Node.js backend with the DFA state machine and configurations.
- `/role of DFA`: Comprehensive documentation on Automata theory applications in this project.
- `Dockerfile`: Containerization setup for deployment.

---

**Built with Precision for the GestureIQ Safety Initiative. &copy; 2026.**
