<<<<<<< HEAD
# abase-architecture-
=======
# ABase Ecosystem — Architecture & Interactive Visualizer

[![Architecture Spec](https://img.shields.io/badge/Architecture-Archify%203.0-blue)](https://github.com/AdilAliAnsari/abase)
[![Target Repo](https://img.shields.io/badge/Repository-AdilAliAnsari%2Fabase-emerald)](https://github.com/AdilAliAnsari/abase)
[![Runtime](https://img.shields.io/badge/Runtime-Node%2022%20%7C%20PyTorch%20%7C%20Expo-purple)](https://github.com/AdilAliAnsari/abase)

Comprehensive runtime architecture specification, interactive visualizer, and component schemas for the [ABase Ecosystem](https://github.com/AdilAliAnsari/abase).

---

## 🏗️ System Architecture Diagram

```
                        ┌─────────────────────────────────────────────────────────────┐
                        │             Docker Container: abase-backend                 │
                        │                                                             │
  ┌─────────────────┐   │   ┌───────────────┐     /api/auth     ┌─────────────────┐   │   OTP emails    ┌─────────────────┐
  │   Mobile App    │───┼──>│Express Gateway│──────────────────>│   Auth Routes   │───┼────────────────>│   Gmail SMTP    │
  │(Expo / React Nat│   │   │ (Node 22 :3000│                   │ (OTP / Register)│   │                 │ (Nodemailer)    │
  └────────┬────────┘   │   └───────┬───────┘                   └────────┬────────┘   │                 └─────────────────┘
           │            │           │ clerkMiddleware                    │ getAuth    │                          ▲
           │            │           ▼                                    ▼            │                          │
           │            │   ┌───────────────┐   protectRoute    ┌─────────────────┐   │   User / PDF CRUD        │
           │            │   │Clerk AuthGuard│<──────────────────│ Listing Routes  │───┼──────────────────────┤
           │            │   │(protectRoute) │                   │(/api/pdf,/books)│   │                      │
           │            │   └───────┬───────┘                   └─────────────────┘   │                      ▼
           │            │           │                                                 │              ┌─────────────────┐
           │            │           │ User by clerkId                                 │              │    MongoDB      │
           │            │           └─────────────────────────────────────────────────┼─────────────>│(Mongoose Models)│
           │            │                                                             │              └─────────────────┘
           │ /api/ai/   │   ┌───────────────┐                                         │
           │ chat (SSE) │   │AI Route Bridge│                                         │
           └───────────>│──>│(/api/ai Proxy)│                                         │
                        │   └───────┬───────┘                                         │
                        └───────────┼─────────────────────────────────────────────────┘
                                    │ HTTP /v1/chat/completions (SSE Stream)
                                    ▼
                        ┌─────────────────────────────────────────────────────────────┐
                        │               Custom AI Inference Subsystem                 │
                        │   ┌─────────────────────────────────────────────────────┐   │
                        │   │                PyTorch LLM Server                   │   │
                        │   │       FastAPI :8000 (2B Causal Transformer)         │   │
                        │   └─────────────────────────────────────────────────────┘   │
                        └─────────────────────────────────────────────────────────────┘
```

---

## 📦 Architecture Tiers & Components

| Component | Technology | Description | Source Reference |
| :--- | :--- | :--- | :--- |
| **Mobile Client** | Expo / React Native | Dark glassmorphism interface, drawer navigation, PDF reader modal with bookmarking, MX player video modal, and real-time AI Chat with agent selector. | `mobile/src/App.tsx`<br>`mobile/src/navigation/AppNavigator.tsx`<br>`mobile/src/components/AiChat.tsx` |
| **Express Gateway** | Node 22 / Express | Core REST API gateway listening on `:3000`, running within Docker container `abase-backend`. | `backend/src/index.js`<br>`docker-compose.yml`<br>`backend/Dockerfile` |
| **Authentication** | Clerk + Nodemailer | Hybrid authentication: Clerk Middleware token verification + Nodemailer Gmail SMTP for OTP registration & password resets. | `backend/src/routes/authRoutes.js`<br>`backend/src/routes/auth.js`<br>`backend/src/utils/emailServices.js` |
| **Catalog & Listings** | Express + Mongoose | Book and PDF material listings (`/api/pdf`, `/api/books`) with text indexing and category filtering. | `backend/src/routes/pdfRoutes.js`<br>`backend/src/routes/bookRoutes.js` |
| **AI Route Bridge** | Express Router | Reverse proxy layer forwarding `/api/ai/chat` and `/api/ai/complete` with Server-Sent Events (SSE) token streaming. | `LLM backend/express/src/routes/aiRoutes.js` |
| **PyTorch LLM Server** | PyTorch / FastAPI | Custom 2-Billion parameter Causal Decoder Transformer (RoPE, RMSNorm, SwiGLU, KV cache) running on `:8000`. | `LLM backend/llm-server/server.py`<br>`LLM backend/llm-server/model.py`<br>`LLM backend/llm-server/config_2b.json` |
| **Database** | MongoDB | Document database storing users, notes, books, and permissions via Mongoose schemas. | `backend/src/lib/db.js`<br>`backend/src/models/` |
| **Autonomous Agents** | GSD Framework | Autonomous planning, execution, verification workflows, and multi-model adapter configurations. | `.agents/`<br>`.agent/workflows/`<br>`adapters/` |

---

## 🚀 Running the Interactive Visualizer Locally

### 1. View Directly
Open [`abase-architecture.html`](./abase-architecture.html) in any modern web browser.

### 2. Local HTTP Server
```bash
npx serve .
# or
python -m http.server 3333
```

### 🎮 Interactive Controls
- **Click any Node**: Opens the Semantic Passport with source line references and route details.
- **`/`**: Instant fuzzy search across all services and endpoints.
- **`T`**: Toggle between Dark and Light mode.
- **`M`**: Toggle Semantic Radar.
- **`L`**: Toggle Semantic Lens (dependency isolation).
- **`F`**: Fullscreen presentation mode.

---

## 📄 Repository Files
- [`abase-architecture.candidate.json`](./abase-architecture.candidate.json) — Source schema specification for the architecture topology.
- [`abase-architecture.html`](./abase-architecture.html) — Self-contained interactive Archify architecture visualizer.
>>>>>>> 95bbcf8 (feat: add ABase multi-tier architecture candidate specification and interactive visualizer)
