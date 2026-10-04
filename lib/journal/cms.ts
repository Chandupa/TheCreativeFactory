/*
 * Whether the Journal CMS (/keystatic) is available.
 *
 * - Local development: always (files are edited directly on disk).
 * - Production: only once the Keystatic GitHub App credentials are set in
 *   Vercel. Until then /keystatic and /api/keystatic simply 404.
 *
 * One-time setup: run `npm run dev` with NEXT_PUBLIC_KEYSTATIC_STORAGE=github
 * in .env.local, open http://127.0.0.1:3000/keystatic and follow the "create
 * GitHub App" flow. It writes the four variables below to .env.local — copy
 * them to Vercel (Project → Settings → Environment Variables) and redeploy.
 */
export function isCmsEnabled(): boolean {
  if (process.env.NODE_ENV === "development") return true;
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
      process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
      process.env.KEYSTATIC_SECRET &&
      process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG,
  );
}
