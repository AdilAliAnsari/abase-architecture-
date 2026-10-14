const fs = require('fs');
const path = require('path');

const p = path.join(__dirname, '../README.md');
let content = fs.readFileSync(p, 'utf8');

const updatedSection = `## 🏗️ System Architecture Diagram

\`\`\`
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
            │            │           │                   /api/cart┌─────────────────┐   │ Cart Sync    │    MongoDB      │
            │            │           ├───────────────────────────>│   Cart Routes   │───┼─────────────>│(Mongoose Models)│
            │            │           │                            │(Items & Totals) │   │              │ User, Book, PDF │
            │            │           │                            └─────────────────┘   │              │ Cart, Payment   │
            │            │           │                 /api/pay   ┌─────────────────┐   │ Payment Recs └─────────────────┘
            │            │           ├───────────────────────────>│ Payment Engine  │───┼──────────────────────┤
            │            │           │                            │(Razorpay Orders)│   │                      │
            │            │           │                            └────────┬────────┘   │                      │
            │            │           │ User by clerkId                     │            │                      ▼
            │            │           └─────────────────────────────────────┼────────────┼─────────────>┌─────────────────┐
            │            │                                                 │            │ Orders & Web │ Razorpay Gateway│
            │            │                                                 │            │ HMAC-SHA256  │(UPI / Cards/Net)│
            │            │                                                 │            │              └─────────────────┘
            │ /api/ai/   │   ┌───────────────┐                             │            │
            │ chat (SSE) │   │AI Route Bridge│                             ▼            │              ┌─────────────────┐
            └───────────>│──>│Auto-Agent &SSE│──────────────────────────────────────────┼─────────────>│   Live Web      │
                         │   └───────┬───────┘       Web Search Grounding (DuckDuckGo)  │              │ (DuckDuckGo API)│
                         └───────────┼──────────────────────────────────────────────────┘              └─────────────────┘
                                     │ HTTP /v1/chat/completions (SSE Stream)
                                     ▼
                         ┌─────────────────────────────────────────────────────────────┐
                         │             Inference & Fine-Tuning Subsystem               │
                         │   ┌─────────────────────────────────────────────────────┐   │
                         │   │                PyTorch LLM Server                   │   │
                         │   │   FastAPI :8000 (2B Transformer + SFT Pipeline)     │   │
                         │   └─────────────────────────────────────────────────────┘   │
                         └─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 📦 Architecture Tiers & Components

| Component | Technology | Description | Source Reference |
| :--- | :--- | :--- | :--- |
| **Mobile Client** | Expo / React Native | Dark glassmorphism UI, interactive drawer navigation, Cart checkout flow, Razorpay mobile payments, PDF reader, and real-time AI Chat with agent selector. | \`mobile/src/App.tsx\`<br>\`mobile/src/navigation/AppNavigator.tsx\`<br>\`mobile/src/screens/CartScreen.tsx\`<br>\`mobile/src/components/AiChat.tsx\` |
| **Express Gateway** | Node 22 / Express | Core REST API gateway listening on \`:3000\`, running within Docker container \`abase-backend\` with Clerk and CORS middleware. | \`backend/src/index.js\`<br>\`docker-compose.yml\`<br>\`backend/Dockerfile\` |
| **Authentication** | Clerk + Nodemailer | Hybrid authentication: Clerk Middleware token verification + Nodemailer Gmail SMTP for OTP registration & password resets. | \`backend/src/routes/authRoutes.js\`<br>\`backend/src/utils/emailServices.js\`<br>\`mobile/src/services/clerkService.ts\` |
| **Catalog & Listings** | Express + Mongoose | Book and PDF material listings (\`/api/pdf\`, \`/api/books\`) with text indexing, categories, and inventory tracking. | \`backend/src/routes/pdfRoutes.js\`<br>\`backend/src/routes/bookRoutes.js\` |
| **Shopping Cart** | Express + Mongoose | Cart management (\`/api/cart\`) supporting multi-item checkout, price compute, in-memory caching, and MongoDB persistence. | \`backend/src/routes/cartRoutes.js\`<br>\`backend/src/models/Cart.js\`<br>\`mobile/src/services/cartService.ts\` |
| **Payment Engine** | Razorpay SDK + Express | Production payment gateway integration (\`/api/payments\`) for order creation, HMAC-SHA256 signature verification, and webhooks. | \`backend/src/routes/paymentRoutes.js\`<br>\`backend/src/controllers/paymentController.js\`<br>\`backend/src/services/razorpayService.js\` |
| **AI Route Bridge** | Express Router | Intelligent AI router with Auto-Agent Classifier (Coder/Research/Agent/Chat), Mermaid/ASCII flowcharts, and live web search grounding. | \`backend/src/routes/aiRoutes.js\`<br>\`backend/src/services/webSearchService.js\` |
| **Live Web Engine** | Cheerio / DuckDuckGo | Live search scraper and knowledge grounding service providing real-time web citations and structured links for the AI assistant. | \`backend/src/services/webSearchService.js\` |
| **PyTorch LLM Server** | PyTorch / FastAPI | Custom 2-Billion parameter Causal Transformer with Supervised Fine-Tuning (SFT) pipeline (\`train_sft.py\`) and OpenAI-compatible SSE streaming on \`:8000\`. | \`LLM backend/llm-server/server.py\`<br>\`LLM backend/llm-server/train_sft.py\`<br>\`LLM backend/llm-server/model.py\` |
| **Database** | MongoDB | Document database storing 5 schemas (Users, Books, PDFs, Carts, and Payments) via Mongoose. | \`backend/src/lib/db.js\`<br>\`backend/src/models/\` |
| **Autonomous Agents** | GSD Framework | Autonomous planning, execution, verification workflows, and multi-model adapter configurations. | \`.agents/\`<br>\`adapters/\`<br>\`deployment/\` |`;

const regex = /## 🏗️ System Architecture Diagram[\s\S]*?## 🎮 Interactive Controls/;
content = content.replace(regex, updatedSection + '\n\n---\n\n## 🎮 Interactive Controls');

fs.writeFileSync(p, content, 'utf8');
console.log('README.md updated successfully!');
