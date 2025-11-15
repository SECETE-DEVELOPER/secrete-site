# ROOHI — NOT FOUND IN THE SKY

Minimal Next.js + Tailwind scaffold for the ROOHI interactive experience.

Run locally

1. Install dependencies

```powershell
cd "d:/SECRET PROJECT"; npm install
```

2. Start dev server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser. The placeholder page includes a Tailwind test element ("Hello — Tailwind test").

Notes
- Tailwind is configured via `tailwind.config.js` and `postcss.config.js`.
- Three.js and @react-three/fiber are included in `package.json` for later 3D work.

QA checklist
- npm install runs without errors.
- npm run dev boots Next.js and serves the placeholder page.
- Tailwind classes render correctly (see placeholder element).
