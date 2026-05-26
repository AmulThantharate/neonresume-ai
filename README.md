# 🚀 NeonResume AI // Resume Generator 🦾

`NeonResume AI` is a high-performance, production-grade, client-side web application designed to parse raw resumes, optimize profiles matching technical ATS parsing metrics, and compile them into stunning, compilable **LaTeX moderncv** documents.

Powered entirely by **Google Gemini API (`gemini-flash-latest`)** 🧠, the app operates completely client-side. There is no backend server or third-party database, guaranteeing 100% user data privacy. 🔒

---

## 🌟 Key Features

1. **📂 Client-Side Text Extraction**: Unpacks `.pdf`, `.docx`, and `.txt` files directly in-browser using dynamically loaded CDN modules of **PDF.js** and **Mammoth.js**, ensuring zero data retention.
2. **🔄 Double-Pass AI Pipeline**:
   * *Phase 1 (Parse & Optimize)*: Translates raw data or unstructured document text into a highly structured, quantified ATS JSON profile, injecting measurable achievements and strong action verbs.
   * *Phase 2 (Tailor & Compile)*: Converts the structured profile into complete, compilable LaTeX moderncv markup in the `banking` style.
3. **🎯 Target Job Description (JD) Tailoring**: Analyzes past job requirements to organically align technical keywords, metrics, and profiles to a target job description.
4. **💻 Cinematic Processing Terminal**: An interactive glassmorphic console simulation tracking connection handshakes, keyword-injection progress, and compile milestones with smooth animations.
5. **🍃 Overleaf Synchronization**: Utilizes a POST form sync to launch compiled LaTeX markup into a new Overleaf tab without authentication.
6. **📝 Built-in Editor & Previews**: Features tabbed editors to view structured JSON and directly edit LaTeX code before exporting, complete with syntax highlighting.
7. **💾 Local Utilities**: Seamless clipboard coping and direct local plain-text `.tex` file downloads using browser blobs.

---

## 📂 File Architecture

The codebase is highly modularized with clear separation of UI components, form wizard steps, and integrations:

```
neonresume-ai/
 ├── dist/                  # 📦 Production minified bundle output
 ├── src/
 │    ├── components/
 │    │    ├── ui/
 │    │    │    ├── Button.jsx    # 🟢 Neon glowing interaction buttons
 │    │    │    ├── Card.jsx      # 💻 Cyberglass cards with terminal node decorators
 │    │    │    └── Toast.jsx     # 🔔 Floating spring-animated status popup
 │    │    ├── forms/
 │    │    │    ├── FormWizard.jsx      # 📑 Form navigation wizard & validation
 │    │    │    ├── PersonalForm.jsx    # 👤 Primary contact & JD textarea
 │    │    │    ├── ExperienceForm.jsx  # 💼 Job records & achievements list
 │    │    │    ├── EducationForm.jsx   # 🎓 School logs & GPAs
 │    │    │    ├── ProjectsForm.jsx    # 🛠️ Dynamic projects & impact inputs
 │    │    │    └── SkillsForm.jsx      # ⚙️ Comma-separated tech tag grids
 │    │    ├── terminal/
 │    │    │    └── ProcessingTerminal.jsx # ⚡ Log monitor & compiling progress bar
 │    │    ├── preview/
 │    │    │    ├── CodePreview.jsx     # 🔍 Tabbed syntax highlighter & editor
 │    │    │    └── StatsBanner.jsx     # 📊 Dynamic resume metric summary cards
 │    │    └── layout/
 │    │         ├── AppHeader.jsx # 🔑 Lock panel API configuration header
 │    │         └── AppFooter.jsx # 🩺 Bottom status bar and heartbeat telemetry
 │    │
 │    ├── hooks/
 │    │    └── useTerminalLogs.js # ⏳ Coordinates async log timeline progress
 │    │
 │    ├── lib/
 │    │    ├── gemini.js          # 📡 Direct Google Gen AI API fetch handlers
 │    │    └── overleaf.js        # 🚀 POST sandbox form launcher
 │    │
 │    ├── utils/
 │    │    ├── fileParser.js      # 📂 CDN loader and ArrayBuffer text extractor
 │    │    ├── latexEscape.js     # 🛡️ Sanitizes LaTeX special characters
 │    │    ├── downloadTex.js     # 💾 Browser Blob Plain-Text exporter
 │    │    └── copyToClipboard.js # 📋 Browser Clipboard navigator wrapper
 │    │
 │    ├── App.jsx                 # 🎛️ Routing orchestrator, state store & demo profiles
 │    ├── main.jsx                # 🚀 React mount entrypoint
 │    └── index.css               # 🎨 Grid overlay background & glows
 │
 ├── tailwind.config.js     # 🎨 Cybertone palette presets & scrollbars
 ├── vite.config.js         # 🛠️ Transpilation plugins
 ├── index.html             # 🌐 Loads "JetBrains Mono" typeface
 ├── package.json           # 📦 React 18, lucide, framer-motion, syntax-highlighter
 └── .env.example           # ⚙️ Developer key templates
```

---

## 🛠️ Technical Specifications

### 📡 Google Gemini API Integration
Integrates natively with the Google Developer API endpoint using standard chat generation configurations:
* **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent`
* **System Prompting**: Routed via native `systemInstruction` parameters in the POST payload.
* **Temperature**: Locked to `0.1` to maintain robust JSON compliance and structured LaTeX margins.

### 📂 Dynamic CDN Lazy-Loading
To circumvent worker bundle weight inside Vite packages, PDF.js and Mammoth.js are dynamically injected into DOM script tags only when a user selects a file:
* **Mammoth.js**: `https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js`
* **PDF.js**: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.min.js`

### 🛡️ LaTeX Spacing & Escaping
Bridges the gap between raw user inputs and LaTeX compile constraints using custom sanitation algorithms. The escaper scans the profile database recursively, replacing unescaped sequences (e.g. `&`, `%`, `_`) with compilers keys (e.g. `\&`, `\%`, `\_`), ensuring instant, out-of-the-box compilations in Overleaf.

---

## 🚀 Run and Build Instructions

Follow these instructions to spin up the developer sandbox locally:

### 1. 📦 Installation
Navigate into the workspace and fetch package bundles:
```bash
npm install
```

### 2. 🔑 Set Up Environment Keys
Duplicate the environment template file:
```bash
cp .env.example .env
```
Open `.env` and assign your Google Gemini API Key:
```env
VITE_GEMINI_API_KEY=AIzaSy...
```
*Note: Alternatively, you can run the app without a `.env` file and enter your API key directly in the header lock panel at runtime.*

### 3. 🌐 Launch Development Server
Launch Vite's hot-reload server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 4. 📦 Build for Production
Bundle, minify, and compile the code:
```bash
npm run build
```
Vite will output highly-optimized assets into the local `dist/` directory, ready to be served from any static provider (GitHub Pages, Netlify, Vercel, etc.).

---

## 🩺 Troubleshooting & Browser Tips

* **Overleaf Popup Block**: Overleaf projects are launched via form targets pointing to `_blank`. If clicking "Open in Overleaf" does not trigger a redirect, look at your address bar's blocker icon and select *"Allow popups for this site"*.
* **CORS Restrictions**: The Google Gemini API is fully CORS-enabled. If you experience network connectivity timeouts, ensure your key is valid and you have an active internet connection.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
