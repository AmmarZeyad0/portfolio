# Ammar Zeyad: Journey & Portfolio

Built with [Astro](https://astro.build). It's a static site, so it's fast, free to host and has nothing to hack.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Where things live

| You want to… | Edit this |
|---|---|
| Change your bio, links, skills, experience, certs | `src/data/profile.ts` |
| Add a milestone to the timeline | `src/data/journey.ts` (newest first) |
| Write a blog post | Add a `.md` file to `src/content/blog/` |
| Add a project | Add a `.md` file to `src/content/projects/` |
| Share a PDF | Put the file in `public/pdfs/` and add an entry to `src/content/library.json` |
| Change colours / fonts | `src/styles/global.css` (the `:root` block at the top) |

### New blog post template

```md
---
title: What I learned setting up GitHub Actions
description: One-sentence summary shown on cards.
date: 2026-11-20
tags: [cicd, github-actions]
draft: false   # set true to hide it while you write
---

Your post in Markdown…
```

### New PDF entry (`src/content/library.json`)

```json
[
  {
    "id": "aws-ccp-notes",
    "title": "AWS Cloud Practitioner study notes",
    "description": "My notes from preparing for CLF-C02.",
    "file": "/pdfs/aws-ccp-notes.pdf",
    "kind": "notes",
    "date": "2025-12-01",
    "tags": ["aws"]
  }
]
```

`kind` is one of `notes`, `certificate`, `paper`, `cheatsheet`, `cv`, `other`.

Tags link everything together: `/tags/aws` shows every post, project and PDF tagged `aws`.

## Deploy (Cloudflare Pages, free)

1. Create a GitHub repo and push this folder:
   ```bash
   git init && git add . && git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/AmmarZeyad0/portfolio.git
   git push -u origin main
   ```
2. Go to **dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git** and pick the repo.
3. Build settings: framework preset **Astro**, build command `npm run build`, output directory `dist`.
4. Deploy. You get a `*.pages.dev` URL. Every `git push` redeploys automatically.
5. *(Optional)* Buy a domain (e.g. `ammarzeyad.dev`) and add it under **Custom domains**.

**Large PDFs:** keep each file under 25 MB on Cloudflare Pages. For big files, upload them to **Cloudflare R2** (10 GB free), make the bucket public, and put the full R2 URL in `file`.

**Alternatives:** Vercel and Netlify work the same way: import the GitHub repo, and they detect Astro automatically.
