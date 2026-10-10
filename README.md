# Thuy Le

A minimal Netflix-inspired portfolio with a headshot, short bio, current roles, matching glass shelves, play controls, and compact skill groups. Static HTML, CSS, and native JavaScript modules; no dependencies or database.

## Edit

- `dist/data.js`: resume content, projects, and skills.
- `dist/render.js`: HTML templates for the cards, shelves, and detail dialogs.
- `dist/index.html`: header, profile, footer, and metadata. The build regenerates content between the portfolio markers.
- `dist/styles.css`: colors, typography, and responsive layouts.
- `dist/app.js`: card dialogs and horizontal shelf navigation.
- `dist/Thuy-Le-Resume.pdf`: downloadable October 2026 resume.

## Build

Node.js 20+. Run `npm run check` and `npm run build`. Build produces complete static HTML, checks references, and verifies the headshot is the only image. All shelf titles, cards, and skills are rendered in the static HTML; detail dialogs and arrow controls use JavaScript.

## GitHub and Vercel setup

1. Unzip this download. Open the `thuy-le` folder.
2. Create a GitHub repository named `thuy-le` under `lazysince87`.
3. Upload the CONTENTS of this folder to the repository root. `package.json`, `vercel.json`, `dist`, and `scripts` should be at the top level, not nested in another `thuy-le` folder.
4. In Vercel, choose Add New → Project and import `lazysince87/thuy-le`.
5. Select Framework Preset: Other, Root Directory: repository root, Build Command: `npm run build`, Output Directory: `dist`. The included `vercel.json` sets the build and output values automatically.
6. Deploy. Future pushes to the production branch trigger automatic deployments.

No environment variables or paid services are required. The project name `thuy-le` gives you a Vercel subdomain if that name is available. You can choose another free subdomain or connect a domain you own in Project Settings → Domains.

## Optional: upload with Git

Run these from inside the extracted `thuy-le` folder after creating the empty GitHub repository:

```bash
git init
git add .
git commit -m "Create Netflix-inspired portfolio"
git branch -M main
git remote add origin https://github.com/lazysince87/thuy-le.git
git push -u origin main
```

## Local preview

```bash
npm run check
npm run build
python3 -m http.server 3000 --directory dist
```

Open http://localhost:3000. Use a local server rather than opening `index.html` directly because the site uses JavaScript modules.

Professional content follows the supplied resume. Project details follow public READMEs at github.com/lazysince87. Headshot from Thuy's original portfolio. Netflix favicon used as requested. This is a personal portfolio inspired by Netflix.
