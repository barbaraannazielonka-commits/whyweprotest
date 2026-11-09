# WHY WE PROTEST – Understanding the Forces Behind Social Change
**Nannestad High School - Barbara Anna Zielonka**

An interactive learning game based on James Paul Gee's "fish tank" principle. Model complex social systems, test hypotheses, and understand the forces behind historical social movements.

---

## Deploying to Cloudflare Pages via GitHub

This project is fully configured for zero-friction building and hosting on **Cloudflare Pages** connected to your **GitHub** repository.

### Option A: Cloudflare Pages Git Integration (Recommended — 2 Minutes)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit of Why We Protest"
   git push origin main
   ```

2. **Log into Cloudflare:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com/)
   - Navigate to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.

3. **Select your GitHub Repository** and configure the build settings:
   - **Framework preset:** `Vite` (or `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js Version:** `20` (already set automatically via `.nvmrc`)

4. **Click "Save and Deploy"**:
   - Cloudflare will clone your GitHub repository, install packages, compile the Vite app, and deploy it to a fast, free global CDN (`https://<project-name>.pages.dev`).
   - Every subsequent `git push` to `main` will automatically build and deploy new updates.

---

### Option B: Automated GitHub Actions CI/CD

A ready-to-use GitHub Actions workflow is included at `.github/workflows/deploy.yml`.

- Every Pull Request and push to `main` automatically runs:
  - `npm ci`
  - `npm run lint` (TypeScript verification)
  - `npm run build` (Production compilation)
- To enable automatic deployment to Cloudflare via GitHub Actions, add these two secrets in **GitHub Repo Settings → Secrets and variables → Actions**:
  - `CLOUDFLARE_API_TOKEN` (Create one in Cloudflare Dashboard with *Cloudflare Pages: Edit* permission)
  - `CLOUDFLARE_ACCOUNT_ID` (Found on your Cloudflare dashboard overview)

---

### SPA Routing & Redirects

Cloudflare Pages automatically routes all single-page client paths to `/index.html` using the included `public/_redirects` rule:
```
/* /index.html 200
```
This ensures direct URLs and browser refreshes work seamlessly without 404 errors.

---

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build check
npm run build

# Preview production build locally
npm run preview
```
