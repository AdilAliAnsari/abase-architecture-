const fs = require('fs');
const path = require('path');

const REVISION = '1c8f7426ea17df6611defff697ad1cbc233d8253';
const SHORT_REV = '1c8f742';
const REPO_URL = 'https://github.com/AdilAliAnsari/abase';

const candidate = {
  "schema_version": 1,
  "diagram_type": "architecture",
  "meta": {
    "title": "ABase Ecosystem - Runtime & Multi-Tier Architecture",
    "output": ".archify/architecture-abase-20261014/abase-architecture.html",
    "quality_profile": "showcase",
    "repository": {
      "url": "https://github.com/AdilAliAnsari/abase.git",
      "provider": "github",
      "link_mode": "web",
      "revision": REVISION
    }
  },
  "components": [
    {
      "id": "mobile",
      "type": "frontend",
      "label": "Mobile App",
      "sublabel": "Expo / React Native",
      "pos": [40, 300],
      "size": [140, 60],
      "sources": [
        { "path": "mobile/src/App.tsx", "line": 5, "end_line": 30, "label": "App root & providers" },
        { "path": "mobile/src/navigation/AppNavigator.tsx", "line": 20, "end_line": 110, "label": "Navigation & CartScreen" },
        { "path": "mobile/src/screens/CartScreen.tsx", "line": 35, "end_line": 120, "label": "Shopping cart & checkout" },
        { "path": "mobile/src/components/AiChat.tsx", "line": 40, "end_line": 100, "label": "AI Chat & agent modes" },
        { "path": "mobile/src/screens/PDFLibraryScreen.tsx", "line": 45, "end_line": 60, "label": "PDF reader modal" },
        { "path": "mobile/src/services/paymentService.ts", "line": 10, "end_line": 60, "label": "Razorpay payment client" }
      ]
    },
    {
      "id": "api",
      "type": "backend",
      "label": "Express Gateway",
      "sublabel": "Node 22 :3000",
      "pos": [280, 300],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/index.js", "line": 1, "end_line": 45, "label": "Express app & middleware" },
        { "path": "backend/src/index.js", "line": 55, "end_line": 82, "label": "Routes & DB connect" },
        { "path": "backend/Dockerfile", "line": 1, "end_line": 14, "label": "Container image" },
        { "path": "docker-compose.yml", "line": 1, "end_line": 16, "label": "Compose definition" }
      ]
    },
    {
      "id": "authroutes",
      "type": "backend",
      "label": "Auth Routes",
      "sublabel": "/api/auth OTP flow",
      "pos": [540, 40],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/routes/authRoutes.js", "line": 45, "end_line": 120, "label": "Register & OTP" },
        { "path": "backend/src/routes/authRoutes.js", "line": 150, "end_line": 220, "label": "Verify email" },
        { "path": "backend/src/routes/authRoutes.js", "line": 300, "end_line": 380, "label": "Login & JWT session" }
      ]
    },
    {
      "id": "guard",
      "type": "security",
      "label": "Clerk Auth Guard",
      "sublabel": "clerkMiddleware",
      "tag": "protectRoute",
      "pos": [540, 140],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/index.js", "line": 20, "end_line": 25, "label": "clerkMiddleware" },
        { "path": "backend/src/routes/cartRoutes.js", "line": 10, "end_line": 25, "label": "getAuth resolver" },
        { "path": "mobile/src/services/clerkService.ts", "line": 1, "end_line": 60, "label": "Clerk client bridge" }
      ]
    },
    {
      "id": "listings",
      "type": "backend",
      "label": "Listing Routes",
      "sublabel": "/api/pdf, /api/books",
      "pos": [540, 240],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/routes/pdfRoutes.js", "line": 8, "end_line": 60, "label": "Create & upload PDF" },
        { "path": "backend/src/routes/pdfRoutes.js", "line": 65, "end_line": 140, "label": "PDF search & download" },
        { "path": "backend/src/routes/bookRoutes.js", "line": 8, "end_line": 80, "label": "Book catalog & search" }
      ]
    },
    {
      "id": "cartroutes",
      "type": "backend",
      "label": "Cart Routes",
      "sublabel": "/api/cart Multi-item",
      "pos": [540, 340],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/routes/cartRoutes.js", "line": 1, "end_line": 35, "label": "Cart router & fallback" },
        { "path": "backend/src/routes/cartRoutes.js", "line": 70, "end_line": 120, "label": "Add item & total compute" },
        { "path": "backend/src/routes/cartRoutes.js", "line": 160, "end_line": 220, "label": "Update quantity & remove" },
        { "path": "backend/src/models/Cart.js", "line": 1, "end_line": 65, "label": "Cart Mongoose schema" }
      ]
    },
    {
      "id": "paymentroutes",
      "type": "backend",
      "label": "Payment Engine",
      "sublabel": "/api/payments Razorpay",
      "pos": [540, 440],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/routes/paymentRoutes.js", "line": 1, "end_line": 40, "label": "Payment endpoints" },
        { "path": "backend/src/controllers/paymentController.js", "line": 35, "end_line": 120, "label": "createOrder handler" },
        { "path": "backend/src/controllers/paymentController.js", "line": 140, "end_line": 230, "label": "verifyPayment & HMAC" },
        { "path": "backend/src/controllers/paymentController.js", "line": 310, "end_line": 380, "label": "Webhook handler" },
        { "path": "backend/src/models/Payment.js", "line": 1, "end_line": 90, "label": "Payment transaction schema" }
      ]
    },
    {
      "id": "airoutes",
      "type": "backend",
      "label": "AI Route Bridge",
      "sublabel": "/api/ai Auto-Agent",
      "pos": [540, 550],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/routes/aiRoutes.js", "line": 20, "end_line": 75, "label": "Auto-Agent Classifier" },
        { "path": "backend/src/routes/aiRoutes.js", "line": 85, "end_line": 170, "label": "Flowchart & Mermaid generator" },
        { "path": "backend/src/routes/aiRoutes.js", "line": 445, "end_line": 540, "label": "Chat handler & SSE streaming" },
        { "path": "backend/src/services/webSearchService.js", "line": 95, "end_line": 180, "label": "Web search retrieval" }
      ]
    },
    {
      "id": "gmail",
      "type": "external",
      "label": "Gmail SMTP",
      "sublabel": "via Nodemailer",
      "pos": [860, 40],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/utils/emailServices.js", "line": 3, "end_line": 15, "label": "Gmail transport" },
        { "path": "backend/src/utils/emailServices.js", "line": 30, "end_line": 50, "label": "Send OTP verification" },
        { "path": "backend/src/utils/emailServices.js", "line": 55, "end_line": 78, "label": "Send password reset" }
      ]
    },
    {
      "id": "razorpay",
      "type": "external",
      "label": "Razorpay Gateway",
      "sublabel": "Orders & Webhooks",
      "pos": [860, 140],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/services/razorpayService.js", "line": 10, "end_line": 70, "label": "Razorpay SDK Gateway" },
        { "path": "backend/PAYMENT_TESTING.md", "line": 1, "end_line": 80, "label": "Payment test suite" }
      ]
    },
    {
      "id": "mongo",
      "type": "database",
      "label": "MongoDB",
      "sublabel": "Mongoose 5 Schemas",
      "pos": [860, 260],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/lib/db.js", "line": 1, "end_line": 25, "label": "connectDB" },
        { "path": "backend/src/models/User.js", "line": 1, "end_line": 65, "label": "User model" },
        { "path": "backend/src/models/Book.js", "line": 1, "end_line": 84, "label": "Book model" },
        { "path": "backend/src/models/PDF.js", "line": 1, "end_line": 82, "label": "PDF model" },
        { "path": "backend/src/models/Cart.js", "line": 1, "end_line": 68, "label": "Cart model" },
        { "path": "backend/src/models/Payment.js", "line": 1, "end_line": 91, "label": "Payment model" }
      ]
    },
    {
      "id": "websearch",
      "type": "external",
      "label": "Live Web Engine",
      "sublabel": "DuckDuckGo Grounding",
      "pos": [860, 420],
      "size": [140, 60],
      "sources": [
        { "path": "backend/src/services/webSearchService.js", "line": 1, "end_line": 95, "label": "HTML search parser" },
        { "path": "backend/src/services/webSearchService.js", "line": 96, "end_line": 180, "label": "Web retrieval & links" }
      ]
    },
    {
      "id": "llmserver",
      "type": "backend",
      "label": "PyTorch LLM Server",
      "sublabel": "FastAPI :8000 & SFT",
      "pos": [860, 550],
      "size": [140, 60],
      "sources": [
        { "path": "LLM backend/llm-server/server.py", "line": 20, "end_line": 60, "label": "FastAPI & CUDA init" },
        { "path": "LLM backend/llm-server/server.py", "line": 350, "end_line": 460, "label": "OpenAI /v1/chat completions" },
        { "path": "LLM backend/llm-server/train_sft.py", "line": 25, "end_line": 110, "label": "SFT fine-tuning pipeline" },
        { "path": "LLM backend/llm-server/sft_data.jsonl", "line": 1, "end_line": 5, "label": "Instruction dataset" },
        { "path": "LLM backend/llm-server/model.py", "line": 20, "end_line": 120, "label": "2B Causal Transformer" }
      ]
    },
    {
      "id": "agents",
      "type": "frontend",
      "label": "GSD Agent System",
      "sublabel": "Workflows & Skills",
      "pos": [40, 550],
      "size": [140, 60],
      "sources": [
        { "path": ".agents/skills/executor/SKILL.md", "line": 1, "end_line": 50, "label": "GSD executor skill" },
        { "path": ".agents/skills/planner/SKILL.md", "line": 1, "end_line": 50, "label": "GSD planner skill" },
        { "path": "adapters/GEMINI.md", "line": 1, "end_line": 40, "label": "Gemini adapter" },
        { "path": "adapters/CLAUDE.md", "line": 1, "end_line": 40, "label": "Claude adapter" },
        { "path": "deployment/deployment.md", "line": 1, "end_line": 50, "label": "Deployment spec" }
      ]
    }
  ],
  "boundaries": [
    {
      "kind": "region",
      "label": "Docker container: abase-backend",
      "wraps": ["api", "authroutes", "guard", "listings", "cartroutes", "paymentroutes", "airoutes"]
    },
    {
      "kind": "region",
      "label": "Inference & Fine-Tuning Subsystem",
      "wraps": ["llmserver"]
    },
    {
      "kind": "region",
      "label": "Autonomous Development",
      "wraps": ["agents"]
    }
  ],
  "connections": [
    { "id": "mobile-api", "from": "mobile", "to": "api", "label": "REST Requests" },
    { "id": "mobile-airoutes", "from": "mobile", "to": "airoutes", "label": "/api/ai/chat (SSE)", "variant": "dashed" },
    { "id": "api-clerk", "from": "api", "to": "guard", "label": "clerkMiddleware", "variant": "security" },
    { "id": "api-auth-routes", "from": "api", "to": "authroutes", "label": "/api/auth" },
    { "id": "api-listings", "from": "api", "to": "listings", "label": "/api/pdf, /api/books" },
    { "id": "api-cart", "from": "api", "to": "cartroutes", "label": "/api/cart" },
    { "id": "api-payments", "from": "api", "to": "paymentroutes", "label": "/api/payments" },
    { "id": "api-airoutes", "from": "api", "to": "airoutes", "label": "/api/ai (bridge)" },
    { "id": "airoutes-llm", "from": "airoutes", "to": "llmserver", "label": "FastAPI :8000 (SSE)", "variant": "emphasis" },
    { "id": "airoutes-websearch", "from": "airoutes", "to": "websearch", "label": "Live Web Retrieval" },
    { "id": "auth-routes-getauth", "from": "authroutes", "to": "guard", "label": "getAuth (/me)", "variant": "security" },
    { "id": "listings-protect", "from": "listings", "to": "guard", "label": "protectRoute", "variant": "security" },
    { "id": "auth-routes-smtp", "from": "authroutes", "to": "gmail", "label": "OTP emails" },
    { "id": "auth-routes-mongo", "from": "authroutes", "to": "mongo", "label": "User read/write" },
    { "id": "guard-user-lookup", "from": "guard", "to": "mongo", "label": "User by clerkId", "variant": "security" },
    { "id": "listings-mongo", "from": "listings", "to": "mongo", "label": "PDF / Book CRUD" },
    { "id": "cart-mongo", "from": "cartroutes", "to": "mongo", "label": "Cart Persistence" },
    { "id": "payment-razorpay", "from": "paymentroutes", "to": "razorpay", "label": "Create Order (SDK)" },
    { "id": "razorpay-webhook", "from": "razorpay", "to": "paymentroutes", "label": "Webhook (HMAC)", "variant": "security" },
    { "id": "payment-mongo", "from": "paymentroutes", "to": "mongo", "label": "Payment Records" },
    { "id": "agents-mobile", "from": "agents", "to": "mobile", "label": "Autonomous tests", "variant": "dashed" }
  ],
  "cards": [
    {
      "dot": "cyan",
      "title": "Mobile App & Commerce Experience",
      "items": [
        "React Native & Expo client with glassmorphism UI, shader background, and starfield animations",
        "Complete Cart & Checkout flow (CartScreen) with item counters, price breakdown, and modal confirmation",
        "Integrated Razorpay payment client (paymentService) supporting UPI, cards, and instant verification",
        "PDF Library & Reader modal with page tracking, bookmarks, fullscreen mode, and browser fallback",
        "Real-time AI Chat interface with Auto-Agent classifier (Coder / Research / Agent / Chat) and SSE streaming"
      ]
    },
    {
      "dot": "emerald",
      "title": "Backend, Payments & AI Engine",
      "items": [
        "Node 22 Express REST API containerized with Docker and MongoDB persistence across 5 Mongoose schemas",
        "Production Razorpay payment engine (/api/payments) with order creation, HMAC-SHA256 signature verification, and webhooks",
        "Shopping Cart subsystem (/api/cart) supporting user session binding, in-memory caching, and MongoDB sync",
        "Upgraded AI Route Bridge with live web search grounding (DuckDuckGo), ASCII & Mermaid flowchart generation",
        "Custom 2B PyTorch Causal Transformer with SFT fine-tuning pipeline (train_sft.py) and FastAPI streaming server"
      ]
    },
    {
      "dot": "amber",
      "title": "Agentic Workflows & Multi-Cloud Specs",
      "items": [
        "Structured GSD (Get Shit Done) framework with planner, executor, debugger, and verifier skills",
        "Multi-model adapter specifications for Claude, Gemini, and OpenAI LLMs in adapters/",
        "Standardized multi-environment build, deployment, release checklist, and zero-downtime rollback procedures"
      ]
    }
  ]
};

// 1. Build evidence JSON
let totalRefs = 0;
const nodesEvidence = {};
candidate.components.forEach(c => {
  nodesEvidence[c.id] = c.sources.map(s => {
    totalRefs++;
    const pathEncoded = s.path.split('/').map(encodeURIComponent).join('/');
    const lineHash = s.line ? `#L${s.line}${s.end_line && s.end_line !== s.line ? '-L' + s.end_line : ''}` : '';
    return {
      path: s.path,
      line: s.line,
      endLine: s.end_line || s.line,
      label: s.label,
      href: `${REPO_URL}/blob/${REVISION}/${pathEncoded}${lineHash}`
    };
  });
});

const evidenceData = {
  schemaVersion: 1,
  verified: true,
  repository: {
    url: REPO_URL,
    revision: REVISION,
    shortRevision: SHORT_REV,
    label: "AdilAliAnsari/abase",
    href: `${REPO_URL}/tree/${REVISION}`
  },
  referenceCount: totalRefs,
  nodes: nodesEvidence
};

// 2. Build SVG Elements
const sigils = {
  frontend: `<g aria-hidden="true" data-semantic-sigil="frontend" class="semantic-sigil s-frontend" transform="translate({SX} {SY}) scale(0.6875)"><rect x="2" y="3" width="12" height="10" rx="2"/><path d="M2 6.5h12"/><circle cx="4.1" cy="4.8" r=".7" class="sigil-fill"/><circle cx="6.3" cy="4.8" r=".7" class="sigil-fill"/></g>`,
  backend: `<g aria-hidden="true" data-semantic-sigil="backend" class="semantic-sigil s-backend" transform="translate({SX} {SY}) scale(0.6875)"><path d="M6 3 3 8l3 5M10 3l3 5-3 5"/></g>`,
  security: `<g aria-hidden="true" data-semantic-sigil="security" class="semantic-sigil s-security" transform="translate({SX} {SY}) scale(0.6875)"><path d="M8 2.2 13 4v3.5c0 3.1-1.8 5.4-5 6.5-3.2-1.1-5-3.4-5-6.5V4Z"/><path d="m5.8 8 1.5 1.5 3-3"/></g>`,
  external: `<g aria-hidden="true" data-semantic-sigil="external" class="semantic-sigil s-external" transform="translate({SX} {SY}) scale(0.6875)"><rect x="2.5" y="5" width="8.5" height="8" rx="1.5"/><path d="M8 2.5h5.5V8M13.5 2.5 7.5 8.5"/></g>`,
  database: `<g aria-hidden="true" data-semantic-sigil="database" class="semantic-sigil s-database" transform="translate({SX} {SY}) scale(0.6875)"><ellipse cx="8" cy="4" rx="5" ry="2"/><path d="M3 4v8c0 1.1 2.2 2 5 2s5-.9 5-2V4M3 8c0 1.1 2.2 2 5 2s5-.9 5-2"/></g>`
};

function getNodeContext(id) {
  if (["api", "authroutes", "guard", "listings", "cartroutes", "paymentroutes", "airoutes"].includes(id)) {
    return "Docker container: abase-backend";
  }
  if (id === "llmserver") return "Inference & Fine-Tuning Subsystem";
  if (id === "agents") return "Autonomous Development";
  return "Architecture component";
}

let nodesSvg = "";
candidate.components.forEach(c => {
  const [x, y] = c.pos;
  const [w, h] = c.size;
  const cx = x + w / 2;
  const sigil = sigils[c.type].replace('{SX}', x + 6).replace('{SY}', y + 6);
  const context = getNodeContext(c.id);
  const tagAttr = c.tag ? ` data-node-tag="${c.tag}"` : '';
  const fineTag = c.tag ? `<text data-detail="fine" x="${cx}" y="${y + 52}" class="t-security" font-size="7" text-anchor="middle">${c.tag}</text>` : '';
  const titleText = `${c.label} · ${c.sublabel} · ${context}${c.tag ? ' · ' + c.tag : ''}`;

  nodesSvg += `        <!-- ${c.id} -->
        <g id="node-${c.id}" data-node-id="${c.id}" data-node-label="${c.label}" tabindex="0" role="button" aria-label="Focus ${c.label}, ${c.sublabel}, ${context}" aria-pressed="false" data-node-kind="${c.type}" data-node-sublabel="${c.sublabel}"${tagAttr} data-node-context="${context}">
          <title>${titleText}</title>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" class="c-mask"/>
          <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" class="c-${c.type}" stroke-width="1.5"/>
          ${sigil}
          <text data-node-label="" data-detail-anchor="" x="${cx}" y="${y + 28}" class="t-primary" font-size="11" font-weight="600" text-anchor="middle">${c.label}</text>
          <text data-detail="context" x="${cx}" y="${y + 44}" class="t-muted" font-size="9" text-anchor="middle">${c.sublabel}</text>
          ${fineTag}
        </g>
`;
});

// Paths and Labels metadata
const edgeDefinitions = [
  {
    from: "mobile", to: "api", id: "mobile-api", label: "REST Requests", variant: "default",
    d: "M 180 320 L 280 320", pts: "180,320;280,320",
    lx: 230, ly: 320, lw: 76
  },
  {
    from: "mobile", to: "airoutes", id: "mobile-airoutes", label: "/api/ai/chat (SSE)", variant: "dashed",
    d: "M 180 340 L 210 340 Q 218 340 218 348 L 218 572 Q 218 580 226 580 L 540 580", pts: "180,340;218,340;218,580;540,580",
    lx: 270, ly: 570, lw: 96
  },
  {
    from: "api", to: "guard", id: "api-clerk", label: "clerkMiddleware", variant: "security",
    d: "M 420 310 L 460 310 Q 468 310 468 302 L 468 178 Q 468 170 476 170 L 540 170", pts: "420,310;468,310;468,170;540,170",
    lx: 485, ly: 170, lw: 82
  },
  {
    from: "api", to: "authroutes", id: "api-auth-routes", label: "/api/auth", variant: "default",
    d: "M 420 305 L 440 305 Q 448 305 448 297 L 448 78 Q 448 70 456 70 L 540 70", pts: "420,305;448,305;448,70;540,70",
    lx: 445, ly: 120, lw: 54
  },
  {
    from: "api", to: "listings", id: "api-listings", label: "/api/pdf, /api/books", variant: "default",
    d: "M 420 320 L 470 320 Q 478 320 478 312 L 478 278 Q 478 270 486 270 L 540 270", pts: "420,320;478,320;478,270;540,270",
    lx: 485, ly: 260, lw: 104
  },
  {
    from: "api", to: "cartroutes", id: "api-cart", label: "/api/cart", variant: "default",
    d: "M 420 335 L 470 335 Q 478 335 478 343 L 478 362 Q 478 370 486 370 L 540 370", pts: "420,335;478,335;478,370;540,370",
    lx: 485, ly: 360, lw: 56
  },
  {
    from: "api", to: "paymentroutes", id: "api-payments", label: "/api/payments", variant: "default",
    d: "M 420 345 L 450 345 Q 458 345 458 353 L 458 462 Q 458 470 466 470 L 540 470", pts: "420,345;458,345;458,470;540,470",
    lx: 465, ly: 460, lw: 76
  },
  {
    from: "api", to: "airoutes", id: "api-airoutes", label: "/api/ai (bridge)", variant: "default",
    d: "M 420 355 L 435 355 Q 443 355 443 363 L 443 557 Q 443 565 451 565 L 540 565", pts: "420,355;443,355;443,565;540,565",
    lx: 465, ly: 555, lw: 86
  },
  {
    from: "airoutes", to: "llmserver", id: "airoutes-llm", label: "FastAPI :8000 (SSE)", variant: "emphasis",
    d: "M 680 570 L 860 570", pts: "680,570;860,570",
    lx: 770, ly: 560, lw: 104
  },
  {
    from: "airoutes", to: "websearch", id: "airoutes-websearch", label: "Live Web Retrieval", variant: "default",
    d: "M 680 590 L 740 590 Q 748 590 748 582 L 748 458 Q 748 450 756 450 L 860 450", pts: "680,590;748,590;748,450;860,450",
    lx: 780, ly: 510, lw: 102
  },
  {
    from: "authroutes", to: "guard", id: "auth-routes-getauth", label: "getAuth (/me)", variant: "security",
    d: "M 610 100 L 610 140", pts: "610,100;610,140",
    lx: 570, ly: 120, lw: 72
  },
  {
    from: "listings", to: "guard", id: "listings-protect", label: "protectRoute", variant: "security",
    d: "M 610 240 L 610 200", pts: "610,240;610,200",
    lx: 570, ly: 220, lw: 70
  },
  {
    from: "authroutes", to: "gmail", id: "auth-routes-smtp", label: "OTP emails", variant: "default",
    d: "M 680 70 L 860 70", pts: "680,70;860,70",
    lx: 770, ly: 70, lw: 64
  },
  {
    from: "authroutes", to: "mongo", id: "auth-routes-mongo", label: "User read/write", variant: "default",
    d: "M 680 85 L 740 85 Q 748 85 748 93 L 748 262 Q 748 270 756 270 L 860 270", pts: "680,85;748,85;748,270;860,270",
    lx: 790, ly: 115, lw: 82
  },
  {
    from: "guard", to: "mongo", id: "guard-user-lookup", label: "User by clerkId", variant: "security",
    d: "M 680 170 L 730 170 Q 738 170 738 178 L 738 272 Q 738 280 746 280 L 860 280", pts: "680,170;738,170;738,280;860,280",
    lx: 785, ly: 175, lw: 84
  },
  {
    from: "listings", to: "mongo", id: "listings-mongo", label: "PDF / Book CRUD", variant: "default",
    d: "M 680 270 L 860 290", pts: "680,270;860,290",
    lx: 770, ly: 275, lw: 90
  },
  {
    from: "cartroutes", to: "mongo", id: "cart-mongo", label: "Cart Persistence", variant: "default",
    d: "M 680 360 L 740 360 Q 748 360 748 352 L 748 303 Q 748 295 756 295 L 860 295", pts: "680,360;748,360;748,295;860,295",
    lx: 790, ly: 335, lw: 94
  },
  {
    from: "paymentroutes", to: "razorpay", id: "payment-razorpay", label: "Create Order (SDK)", variant: "default",
    d: "M 680 455 L 720 455 Q 728 455 728 447 L 728 168 Q 728 160 736 160 L 860 160", pts: "680,455;728,455;728,160;860,160",
    lx: 745, ly: 160, lw: 104
  },
  {
    from: "razorpay", to: "paymentroutes", id: "razorpay-webhook", label: "Webhooks (HMAC)", variant: "security",
    d: "M 860 180 L 760 180 Q 752 180 752 188 L 752 467 Q 752 475 744 475 L 680 475", pts: "860,180;752,180;752,475;680,475",
    lx: 780, ly: 230, lw: 98
  },
  {
    from: "paymentroutes", to: "mongo", id: "payment-mongo", label: "Payment Records", variant: "default",
    d: "M 680 490 L 735 490 Q 743 490 743 482 L 743 318 Q 743 310 751 310 L 860 310", pts: "680,490;743,490;743,310;860,310",
    lx: 790, ly: 375, lw: 96
  },
  {
    from: "agents", to: "mobile", id: "agents-mobile", label: "Autonomous tests", variant: "dashed",
    d: "M 110 550 L 110 360", pts: "110,550;110,360",
    lx: 110, ly: 455, lw: 90
  }
];

let edgesSvg = "";
let labelsSvg = "";
edgeDefinitions.forEach((e, idx) => {
  const marker = e.variant === "emphasis" ? "arrowhead-emphasis" : (e.variant === "security" ? "arrowhead-security" : (e.variant === "dashed" ? "arrowhead-dashed" : "arrowhead"));
  const aClass = `a-${e.variant}`;
  const tClass = `t-edge-${e.variant}`;

  edgesSvg += `        <!-- ${idx}: ${e.from} -> ${e.to} -->
        <g data-graph-role="automatic-crossover" style="--step:${idx}">
          <path data-graph-role="automatic-crossover-underlay" d="${e.d}" fill="none" stroke="var(--mask)" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" pointer-events="none"/>
          <path data-edge-from="${e.from}" data-edge-to="${e.to}" data-edge-label="${e.label}" data-edge-key="${idx}" data-edge-id="${e.id}" data-composition-points="${e.pts}" data-composition-crossover="halo" data-composition-independent="true" d="${e.d}" class="${aClass}" stroke-width="1.5" marker-end="url(#${marker})"/>
        </g>
`;

  labelsSvg += `        <g data-detail="context" data-edge-from="${e.from}" data-edge-to="${e.to}" data-edge-label="${e.label}" data-edge-key="${idx}" data-edge-id="${e.id}">
          <rect x="${e.lx - e.lw / 2}" y="${e.ly - 7}" width="${e.lw}" height="14" rx="3" class="c-mask"/>
          <text x="${e.lx}" y="${e.ly + 3}" class="${tClass}" font-size="8" text-anchor="middle">${e.label}</text>
        </g>
`;
});

// Boundaries SVG
const boundariesSvg = `        <!-- Boundaries (behind everything) -->
        <rect data-graph-role="structural-frame" data-composition-frame-kind="region" data-composition-frame-id="0" data-composition-frame-label="Docker container: abase-backend" x="250" y="20" width="465" height="620" rx="12" class="c-region" stroke-width="1"/>
        <rect data-graph-role="structural-frame" data-composition-frame-kind="region" data-composition-frame-id="1" data-composition-frame-label="Inference & Fine-Tuning Subsystem" x="835" y="525" width="190" height="110" rx="12" class="c-region" stroke-width="1"/>
        <rect data-graph-role="structural-frame" data-composition-frame-kind="region" data-composition-frame-id="2" data-composition-frame-label="Autonomous Development" x="20" y="520" width="180" height="110" rx="12" class="c-region" stroke-width="1"/>
`;

// Cards HTML
const cardsHtml = `    <div class="cards">
      <div class="card">
        <div class="card-header">
          <div class="card-dot cyan"></div>
          <h3>Mobile App &amp; Commerce Experience</h3>
        </div>
        <ul>
          <li>React Native &amp; Expo client with glassmorphism UI, shader background, and starfield animations</li>
          <li>Complete Cart &amp; Checkout flow (CartScreen) with item counters, price breakdown, and modal confirmation</li>
          <li>Integrated Razorpay payment client (paymentService) supporting UPI, cards, and instant verification</li>
          <li>PDF Library &amp; Reader modal with page tracking, bookmarks, fullscreen mode, and browser fallback</li>
          <li>Real-time AI Chat interface with Auto-Agent classifier (Coder / Research / Agent / Chat) and SSE streaming</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-dot emerald"></div>
          <h3>Backend, Payments &amp; AI Engine</h3>
        </div>
        <ul>
          <li>Node 22 Express REST API containerized with Docker and MongoDB persistence across 5 Mongoose schemas</li>
          <li>Production Razorpay payment engine (/api/payments) with order creation, HMAC-SHA256 signature verification, and webhooks</li>
          <li>Shopping Cart subsystem (/api/cart) supporting user session binding, in-memory caching, and MongoDB sync</li>
          <li>Upgraded AI Route Bridge with live web search grounding (DuckDuckGo), ASCII &amp; Mermaid flowchart generation</li>
          <li>Custom 2B PyTorch Causal Transformer with SFT fine-tuning pipeline (train_sft.py) and FastAPI streaming server</li>
        </ul>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-dot amber"></div>
          <h3>Agentic Workflows &amp; Multi-Cloud Specs</h3>
        </div>
        <ul>
          <li>Structured GSD (Get Shit Done) framework with planner, executor, debugger, and verifier skills</li>
          <li>Multi-model adapter specifications for Claude, Gemini, and OpenAI LLMs in adapters/</li>
          <li>Standardized multi-environment build, deployment, release checklist, and zero-downtime rollback procedures</li>
        </ul>
      </div>
    </div>`;

// Read current HTML
const htmlPath = 'c:/Users/adilaliansari/OneDrive/Desktop/abase architecture/abase-architecture.html';
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Replace script id="archify-source-evidence-data"
const evidenceRegex = /<script id="archify-source-evidence-data" type="application\/json">([\s\S]*?)<\/script>/;
const newEvidenceScript = `<script id="archify-source-evidence-data" type="application/json">${JSON.stringify(evidenceData)}</script>`;
let updatedHtml = rawHtml.replace(evidenceRegex, newEvidenceScript);

// Replace viewBox in svg
updatedHtml = updatedHtml.replace(/<svg viewBox="0 0 1060 600"/, '<svg viewBox="0 0 1060 670"');

// Replace Boundaries, Edges, Components, Labels
const svgBodyRegex = /(<!-- Background Grid -->\s*<rect width="100%" height="100%" fill="url\(#grid\)" \/>)([\s\S]*?)(<\/svg>)/;

const newSvgInner = `\n${boundariesSvg}\n        <!-- Connection paths (before components for correct z-order) -->\n${edgesSvg}\n        <!-- Components -->\n${nodesSvg}\n        <!-- Connection labels -->\n${labelsSvg}      `;

updatedHtml = updatedHtml.replace(svgBodyRegex, `$1\n${newSvgInner}$3`);

// Replace Cards
const cardsRegex = /<div class="cards">([\s\S]*?)<\/div>\s*<nav class="node-outline/;
updatedHtml = updatedHtml.replace(cardsRegex, `${cardsHtml}\n    <nav class="node-outline`);

// Output candidate.json and HTML files
const ws = 'c:/Users/adilaliansari/OneDrive/Desktop/abase architecture';

fs.writeFileSync(path.join(ws, 'abase-architecture.candidate.json'), JSON.stringify(candidate, null, 2));
fs.writeFileSync(path.join(ws, 'public/abase-architecture.candidate.json'), JSON.stringify(candidate, null, 2));

fs.writeFileSync(path.join(ws, 'abase-architecture.html'), updatedHtml);
fs.writeFileSync(path.join(ws, 'public/abase-architecture.html'), updatedHtml);
fs.writeFileSync(path.join(ws, 'index.html'), updatedHtml);
fs.writeFileSync(path.join(ws, 'public/index.html'), updatedHtml);

console.log('SUCCESS: All architecture files and visualizers updated to revision ' + SHORT_REV + '!');
