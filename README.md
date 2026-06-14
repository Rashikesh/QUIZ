# QUIZ                                                                                                                                                  # 2022

Install ECLIPSE CREATE NEW JAVA WEBAPP PROJECT
INSTALL TOMCAT LATEST VERSION AS SERVER 
INSTALL MYSQL FOR DATABASE. CONNECT TO IDE . 
INSTALL NECESSARY LIBRARY AND SYSTEM CONFIGURATION. 

this is simple project that generate quiz randomly using API. you can use this code to develop more in it . All file are available..... No need to confuse about any file tho attachment. 
used language HTML - CSS -BOOTSTRAP -COLOR SELECTOR - ECLIPSE- JAVA -JAVASCRIPT- MYSQL - TOMCAT 

MISSING THINGS IN COMPONENTS ARE 

COOKIE AND SESSION IS NOT USED AND USER DATA IS NOT MANAGED NO ADMIN SITE CAN UPDATE THIS FILE WITH THIS THINGS ...... GOOD LUCK.....


## # Qwizzy: A Modernized Full-Stack Distributed Quiz Platform                                                                                           # 2026

Qwizzy is a production-ready, cloud-native quiz platform capable of generating dynamic trivia assessments across multiple domain categories (Mathematics, Science & Nature, General Knowledge) with real-time level configuration pipelines. 

This project represents a complete architectural overhaul, migrating a legacy, stateful Java monolithic application into a highly performant, decoupled, and stateless **Next.js frontend** and **MERN backend micro-service architecture**.

---

## 🛠️ The Architectural Overhaul (Legacy vs. Modern)

| Architectural Tier | Legacy Monolith Architecture (`demo`) | Modernized Distributed Stack (`qwizzy-fullstack`) |
| :--- | :--- | :--- |
| **User Interface (UI)** | Monolithic JSP pages, static HTML, raw jQuery scripts, manual DOM manipulation. | **Next.js 16 (React 19)** App Router components driven by isolated reactive hook hooks (`useState`, `useEffect`). |
| **Application Server** | Stateful Apache Tomcat 9.0 Web Container compiled via Eclipse IDE. | **Node.js (Express.js)** asynchronous REST API gateway. |
| **Database Management**| Stateful, local MySQL engine utilizing blocking JDBC connection streams. | **MongoDB Atlas Cloud Database Cluster** running an agile, non-blocking object document mapper (**Mongoose**). |
| **Session Control** | Stateful `HttpSession` cookies matching server-side hardware RAM address spaces. | Stateless, cryptographic **JSON Web Tokens (JWT)** decoupled across secure browser boundaries. |
| **Theme & UI Layout** | Mismatched hardcoded CSS properties and absolute styling coordinates. | Global unified layout wrapper running **Bootstrap 5** integrated alongside reactive Light/Dark mode state hooks. |

---

## 🏗️ Core Connectivity Nodes & Integration Pipelines

The modernized system relies on clean, decoupled network boundaries mapping data pipelines smoothly across the wire:

```text
  [ Client Browser UI ]          [ Cloud API Gateway ]         [ Cloud Data Store ]
   Next.js 16 Container          NodeJS / Express Server       MongoDB Atlas Cluster
     (Port 3001)                      (Port 5000)                (Global Shards)
          │                                │                            │
          ├─── HTTPS User Registration ───>│                            │
          ├─── HTTPS JWT Authentication ──>│── Encrypted Password Hash ─>│
          │<── Session Tokens Returned ────│                            │
          │                                │                            │
          ├─── Fetch Trivia Payload ───────┼────────────────────────────┼──> [ OpenTDB Public API ]
          │                                │                            │
          └─── Submit Score Report (JWT) ─>│──── Logs Scorecard Doc ───>│
```

### 1. The Registration & Cryptographic Authentication Flow
* **Node Point**: `Next.js Form Component ──> Express Auth Router ──> MongoDB User Model`
* **Mechanism**: When a user registers, passwords pass across an asynchronous network fetch payload to the backend server. The endpoint utilizes `bcryptjs` to inject a security salt factor (10 rounds) to hash the plain text before committing it into the MongoDB cloud cluster.

### 2. The Stateless Session Processing Node (JWT Generation)
* **Node Point**: `Next.js Login Form ──> JWT Token Issuance ──> Browser Local Cache Storage`
* **Mechanism**: Upon credential verification, instead of saving active profile rows in Tomcat server memory, the Express engine compiles a distinct payload (`userId`, `name`, `role`) and signs it using a cryptographically private signature string key (`JWT_SECRET`). It returns a compressed, signed text string token valid for 24 hours back to the browser cache.

### 3. The Secure Interceptor Gateway (Score Recording Pipeline)
* **Node Point**: `Quiz Gameplay Hook ──> HTTP Header Authorization Interceptor ──> MongoDB Shards`
* **Mechanism**: When a game loop concludes, the Next.js module triggers an interceptor fetch call. It appends the cached string token using standard conventions (`Authorization: Bearer <TOKEN>`). The backend decodes and authenticates the token string on the fly, logs the player's performance entry, and updates their score profile inside the `quiz_results` database collection.

---

## 📂 System Folder Directory Blueprints

```text
qwizzy-fullstack/
├── quiz-backend/                 # Node.js/Express Server Core Gateway Workspace
│   ├── models/                   # Strict Mongoose Document Schema Architectures
│   │   ├── User.js               # User Access Control profile collections
│   │   └── QuizResult.js         # Historical scorecard storage collections
│   ├── routes/                   # API Decoupled Routing Controllers (Replaces Servlets)
│   │   ├── auth.js               # Cryptographic secure sign-up & log-in pathways
│   │   └── quiz.js               # Token authorization score-saver and history endpoints
│   ├── .env                      # Application environment secret configuration properties
│   └── server.js                 # Master infrastructure execution engine root boots
│
└── quiz-frontend/                # Next.js 16 Client App Interface Workspace
    ├── public/                   # Static media file vectors (Images/Illustrations)
    └── src/
        ├── components/           # Reusable global layout state injection context engines
        │   ├── AuthContext.js    # Global user session check state validation hook hook
        │   ├── ThemeProvider.js  # Global system Light/Dark style manager wrapper
        │   └── AppBackgroundWrapper.js # Hydration flickering isolation color layout frame
        └── app/                  # Declarative App Router View Page Routes
            ├── layout.js         # Top-level unified template app wrapper frame
            ├── page.js           # Home / Hero entry landing dashboard panel view
            ├── login/            # /login - Stateful authentication interface view
            ├── register/         # /register - Front-end validated registration form view
            ├── categories/       # /categories - Animated subject selection terminal panel
            ├── dashboard/        # /dashboard - Real-time MongoDB score metrics dashboard table
            └── quiz/             # /quiz/math/game & /quiz/science/game - Game arenas
```

---

## ⚡ Key Advanced Coding Practices Implemented

1. **DNS Server Override Interceptors**: Configured native Node.js core network layers (`dns.setServers(['8.8.8.8', '8.8.4.4'])`) directly inside `server.js` to automatically bypass local ISP firewall blocks restricting `querySrv` lookups to MongoDB cloud cluster connection strings.
2. **CSR Build Prerender Isolation Fallbacks**: Wrapped the dynamic quiz loops within isolated **React `<Suspense>` layouts** (`game/layout.js`). This explicitly satisfies Next.js 16 compilation parameters, preventing production builds from throwing runtime bailouts when parsing URL query params (`useSearchParams()`) during server build prerendering phases.
3. **Responsive Flex-Box Baseline Synchronization**: Resolved button text-alignment rendering offsets caused by global stylesheet overrides by setting explicit pixel bounding parameters (`height: 56px`) coupled with atomic flex-grid alignment tags (`d-flex align-items-center justify-content-center`). This completely balances typography along both design axes across mobile and desktop Viewports.
4. **Git Cloud Exposure Safeguards**: Engineered comprehensive `.gitignore` exclusion definitions to automatically isolate machine build layers (`.next/`, `node_modules/`) and protect internal project variables (`.env`) from public cloud repository exposures.

---

## 🚀 Cloud Deployment Architecture

The production-grade infrastructure maps fully to external cloud networks for continuous integration:

* **Backend Engine Web Service**: Hosted on **Render** (Node.js runtime pipeline environment) connected directly to your MongoDB Atlas dashboard network.
* **Frontend UI Application**: Hosted on **Vercel** (Global edge CDN node architecture framework), hot-reloading code pushes instantly.
