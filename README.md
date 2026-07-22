# Academic Homepage

A minimal, responsive academic homepage built with Next.js and configured for automatic deployment to GitHub Pages.

## Edit your information

Most content is in `app/page.tsx`. Replace the placeholder name, biography, research interests, publications, experience, service, email, and external links. See `CONTENT_GUIDE.md` for a short checklist.

## Local preview

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Publish on GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. Open the repository's **Settings → Pages**.
3. Set **Source** to **GitHub Actions**.
4. The included workflow builds and publishes the site after every push.

Both user-site repositories (`username.github.io`) and ordinary project repositories are supported.
