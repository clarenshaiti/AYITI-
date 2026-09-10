# Supabase setup for Ayiti

This app can use Supabase for real login, signup, email verification, and password reset.

## 1) Create a Supabase project

1. Go to https://supabase.com
2. Create a new project
3. Copy your project URL and anon key

## 2) Update the app config

Open `app.js` and replace:

- `https://YOUR_PROJECT_REF.supabase.co`
- `YOUR_SUPABASE_ANON_KEY`

with your real Supabase values.

## 3) Enable authentication methods

In the Supabase dashboard:

- Go to Authentication → Providers
- Enable Email provider
- Turn on email confirmations if you want real email verification
- Configure the site URL and redirect URL

For local development, set:

- Site URL: `http://localhost:8000`
- Redirect URL: `http://localhost:8000/**`

## 4) Optional: password reset

The reset flow is already wired in the app. It sends a reset email when a user clicks the reset button.

## 5) Front-end notes

This app uses the browser client and the `auth` APIs from Supabase. You will need to add the Supabase script in the HTML if you want the browser to expose `window.supabase`.

Example:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="app.js"></script>
```

## 6) Production note

For production, store secrets only in a secure server-side environment. This demo is intentionally simple and uses the browser anon key pattern.
