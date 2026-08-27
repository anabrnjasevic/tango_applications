# Camino Tango Weekend

Astro recreation of the [Congra](https://webflow.com/templates/html/congra-website-template) event landing page layout, customized for a tango weekend. Congra is free to use for one client project under Webflow's [Free License](https://webflow.com/templates/template-licenses); this repo is original Astro code, not a redistribution of the Webflow template.

## Stack

- [Astro](https://astro.build) 7
- [Tailwind CSS](https://tailwindcss.com) 4
- Static deploy → [Vercel](https://vercel.com) (Hobby tier is fine)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Edit content

All copy, prices, schedule, and links live in one file:

```
src/data/site.ts
```

Replace `registerUrl` in `src/data/site.ts` if you move the registration section.

Registration uses a native on-site form, validated on the server, then posted to the Google Form/Sheet. Field mapping: `src/data/form.ts`. Security: `src/lib/form-security.ts`.

### Registration security (production)

Copy `.env.example` to `.env` and set Cloudflare Turnstile keys ([free](https://dash.cloudflare.com/?to=/:account/turnstile)):

```
PUBLIC_TURNSTILE_SITE_KEY=your_site_key
TURNSTILE_SECRET_KEY=your_secret_key
```

Add the same variables in Vercel, plus `GOOGLE_APPS_SCRIPT_URL` and `GOOGLE_FORM_WEBHOOK_SECRET` (see `.env.example`). Local `astro dev` skips Turnstile. Hosts without Turnstile keys skip it too.

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Framework preset: **Astro**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add your custom domain in Vercel project settings

No Webflow subscription required.

## Images

Template demo images are stored in `public/images/` (from the Congra Webflow preview). Swap them for client photos as needed.
