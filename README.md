# AYITI-

A static marketplace landing page inspired by a Haitian local marketplace concept.

## Local preview

Open the project in a browser with a simple local server:

```bash
cd /workspaces/AYITI-
python3 -m http.server 8000
```

Then visit:

http://localhost:8000/

## Live preview deployment options

### Option 1: GitHub Pages

This project includes a GitHub Actions workflow for a live preview deployment on GitHub Pages.

#### Steps

1. Push the repository to GitHub.
2. In GitHub, open the repository.
3. Go to Settings → Pages.
4. Set the source to GitHub Actions.
5. The workflow in `.github/workflows/deploy-pages.yml` will deploy the site automatically on every push to `main`.
6. You can also run it manually from the Actions tab with "Run workflow".

The public site URL will be:

https://<your-username>.github.io/AYITI-/

### Option 2: Netlify

A Netlify config file is included in the repo to make deployment straightforward.

#### Steps

1. Push the repository to GitHub.
2. Sign in to Netlify.
3. Click "Add new site" → "Import an existing project".
4. Select the GitHub repository.
5. Keep the default build settings, or set:
   - Build command: leave blank
   - Publish directory: `.`
6. Deploy the site.

Netlify will publish your app automatically on every push.

## Files

- `index.html` — app shell and page structure
- `styles.css` — styling and layout
- `app.js` — interactive behavior and sample data
