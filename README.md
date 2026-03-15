# Lion Street Learning

A modern, accessible static website for **Lion Street Learning** — a children's speech development and educational services practice. Built with semantic HTML5, vanilla CSS (custom design system), and lightweight vanilla JavaScript.

---

## Project Structure

```
lionstreetlearning/
├── index.html          # Home page
├── about.html          # About Me page
├── services.html       # Services page + contact form
├── resources.html      # Resources (coming soon)
├── parent-stories.html # Parent Stories (coming soon)
├── css/
│   └── style.css       # Design system & all page styles
├── js/
│   └── main.js         # Nav, FAQ accordion, scroll reveal, form submit, modal
├── images/             # Site images (logo, hero, services, about, etc.)
├── fonts/              # Self-hosted fonts (e.g. Madelyn)
├── CNAME               # Custom domain for GitHub Pages
├── .gitignore
└── README.md
```

---

## Features

- **Responsive** — mobile-first layout, works on all screen sizes
- **Accessible** — semantic HTML5, ARIA labels, keyboard navigation, focus management
- **Animated** — scroll-reveal (Intersection Observer), counter animation
- **Interactive** — mobile hamburger menu, FAQ accordion, sticky nav, contact form success modal
- **No build tools** — pure HTML/CSS/JS, zero dependencies to install

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, stats, features, services preview (Speech Therapy, Early Literacy, Group Workshops), about snippet, CTA |
| About Me | `about.html` | Story, credentials, values, timeline (My Journey) |
| Services | `services.html` | 5 service cards, process steps, FAQ accordion, contact form |
| Resources | `resources.html` | Coming soon — tips, activities, guides |
| Parent Stories | `parent-stories.html` | Coming soon — family stories and experiences |

**Internal links** use `/` for home and `.html` for other pages (e.g. `about.html`, `services.html`) so GitHub Pages serves the correct file for each URL.

---

## Local vs. live differences

If the live site doesn’t match your local version:

1. **Hero, numbers, or other layout** — Push your latest commit and wait for GitHub Pages to rebuild (often 1–2 minutes). Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R) or try an incognito window so the browser isn’t using cached CSS/JS.
2. **Resources / Parent Stories show a broken or unstyled page** — Links must point to `resources.html` and `parent-stories.html`. Plain paths like `/resources` don’t serve those files on GitHub Pages and can show an unstyled 404.

---

## Images & Assets

Production images live in `/images/` (e.g. `main-logo.png`, `artic.jpg`, `shared-story-reading.jpg`). To add or replace assets:

1. Add files to `/images/` (lowercase, dashes for multi-word names).
2. Update the relevant `src` in the HTML, e.g. `src="images/your-image.jpg"`.

**Suggested sizes:** hero ~800×1000 px; service cards ~600×338 px; about/timeline as needed.

---

## Contact Form

The contact form on the Services page uses **[Web3Forms](https://web3forms.com)** so submissions can be sent to an email (e.g. `hello@lionstreetlearning.com`) without a backend. To configure:

1. Sign up at Web3Forms and get an access key.
2. In `services.html`, set the hidden input `name="access_key"` to your key (replace any placeholder).
3. Submissions show a success modal and optional redirect.

---

## Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Update site"
git push origin main
```

### Step 2 — Enable GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages**.
2. Under **Source**: Branch **main**, Folder **/ (root)**.
3. Save. The site will be at `https://[your-username].github.io/lionstreetlearning/`.

### Step 3 — Custom Domain

1. Under **Settings → Pages**, set **Custom domain** (e.g. `www.lionstreetlearning.com`).
2. After DNS propagates, enable **Enforce HTTPS**.
3. The repo’s `CNAME` file should match the domain.

---

## Connecting a Custom Domain via Squarespace DNS

If your domain is registered with **Squarespace** and you want it to point to GitHub Pages:

### A records (root domain)

In Squarespace: **Domains** → your domain → **DNS Settings** → **DNS Records**. Add four A records for `@` with these values (TTL 3600):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### CNAME (www)

Add one CNAME: Host `www`, Value `[your-username].github.io`, TTL 3600.

### Verify

After 24–48 hours, open your custom domain, then in GitHub **Settings → Pages** use **Verify** and turn on **Enforce HTTPS**. You can check propagation at [whatsmydns.net](https://www.whatsmydns.net).

---

## Customization

### Colors

Brand colors are in `css/style.css` under `:root`:

```css
--clr-primary:       #4db6ac;
--clr-primary-dark:  #0a453d;
--clr-secondary:     #0a453d;
--clr-accent:        #f6b49b;
--clr-bg:            #f8eadd;
--clr-surface:       #FFFFFF;
/* … plus borders, text, shadows */
```

Change these to re-theme the site.

### Fonts

- **Google Fonts:** Poppins (headings, UI), Inter (body). Linked in each HTML `<head>`.
- **Self-hosted:** Madelyn (e.g. hero “Learning & Play”) in `/fonts/`, loaded via `@font-face` in `style.css`.

Update the `<link>` tags and CSS variables if you switch fonts.

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Latest |
| Firefox | ✅ Latest |
| Safari  | ✅ Latest |
| Edge    | ✅ Latest |
| Mobile Safari / Chrome | ✅ |

---

## License

© Lion Street Learning. All rights reserved. Not for redistribution.
