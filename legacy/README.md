# Legacy static site (reference only)

The original static HTML site, kept for visual comparison during the Next.js
migration. It is **not** served by the app. Delete this folder once parity is
signed off.

Preview it side by side with the Next.js app:

```bash
cd legacy && python -m http.server 3200   # legacy  → http://localhost:3200/index.html
npm run dev                                # Next.js → http://localhost:3000
```

| Legacy file           | Next.js replacement                          |
| --------------------- | -------------------------------------------- |
| index.html            | app/(site)/page.tsx                          |
| about.html            | app/about/page.tsx                           |
| copyright.html        | app/(site)/copyright/page.tsx                |
| test.html             | none (index.html with the outage popup on)   |
| dmca-validation.html  | public/dmca-validation.html                  |
| (contact.html)        | app/(site)/contact/page.tsx (never existed)  |

## Known missing / placeholder assets

- `/placeholder.svg`: every client logo pointed here, but the file never
  existed (broken images on the live site). The carousel now shows a text
  placeholder; add real logos to `public/logos/` and set `logo` in
  `data/clients.ts`.
- `SLIIT_Logo_Crest (2).png`: not referenced by any page; left here unused.
- The OrbitControls/GLTFLoader CDN scripts were 404/unused and were dropped.
