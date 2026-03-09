# Smart-Kids-Learn-Read
Smart Kids Learn &amp; Read is a fun and interactive educational app designed to help young children build strong early learning skills. The app teaches kids how to count numbers, recognize letters, practice phonics, spell simple words, and pronounce them correctly, while also learning shapes and colors through engaging games.

## Deploy on Vercel

This project is configured for Vercel with SPA rewrites in [vercel.json](vercel.json).

### Recommended Vercel settings

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### Deploy steps

1. Go to Vercel Dashboard and click **Add New Project**.
2. Import this GitHub repository: `Bedohh206/Smart-Kids-Learn-Read`.
3. Confirm the build settings above.
4. Deploy.
5. Enable automatic deployments from the `main` branch.

## Post-deploy checks

After each deployment, verify these URLs:

- `https://smartkidsquiz.app/robots.txt`
- `https://smartkidsquiz.app/sitemap.xml`
- `https://smartkidsquiz.app/ads.txt`
- `https://smartkidsquiz.app/guides`
- `https://smartkidsquiz.app/privacy`

## AdSense readiness notes

- Replace `pub-XXXXXXXXXXXXXXXX` in [public/ads.txt](public/ads.txt) with your real publisher ID.
- Replace `ca-pub-XXXXXXXXXXXXXXXX` in [index.html](index.html) with your real AdSense client ID.
- Replace `G-XXXXXXXXXX` in [index.html](index.html) with your real GA4 Measurement ID.
