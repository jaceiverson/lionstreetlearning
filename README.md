# Lion Street Learning

A modern, accessible static website for **Lion Street Learning** — a children's speech development and educational services practice. Built with semantic HTML5, vanilla CSS (custom design system), and lightweight vanilla JavaScript.

---

## Project Structure

```
lionstreetlearning/
├── index.html          # Home page
├── about.html          # About Me page
├── services.html       # Services page + contact form
├── css/
│   └── style.css       # Complete design system & all page styles
├── js/
│   └── main.js         # Navigation, FAQ accordion, scroll reveal, counters
├── images/             # Drop production image assets here
├── CNAME               # Custom domain for GitHub Pages
├── .gitignore
└── README.md
```

---

## Features

- **Responsive** — mobile-first layout, works on all screen sizes
- **Accessible** — semantic HTML5, ARIA labels, keyboard navigation, focus management
- **Animated** — scroll-reveal (Intersection Observer), floating hero badges, counter animation
- **Interactive** — mobile hamburger menu, FAQ accordion, sticky nav on scroll
- **No build tools** — pure HTML/CSS/JS, zero dependencies to install

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, stats bar, features, services preview, about snippet, testimonials, CTA |
| About Me | `about.html` | Story, credentials/certifications, values |
| Services | `services.html` | 6 service cards, process steps, FAQ accordion, contact form |

---

## Replacing Placeholder Images

All images currently use [placehold.co](https://placehold.co) URLs. To swap in real assets:

1. Add your production images to the `/images/` folder.
2. Update the `src` attributes in each HTML file:

```html
<!-- Before (placeholder) -->
<img src="https://placehold.co/700x875/e8d5b7/5c4a2a?text=Hero+Image" alt="..." />

<!-- After (your asset) -->
<img src="images/hero-photo.webp" alt="..." />
```

**Recommended image formats:** `.webp` (primary), `.jpg` (fallback)  
**Recommended image sizes:**

| Use | Recommended Size |
|-----|-----------------|
| Hero image | 800 × 1000 px |
| About/Educator photo | 600 × 750 px |
| Service card images | 500 × 600 px |
| Testimonial avatars | 100 × 100 px |

---

## Deploying to GitHub Pages

### Step 1 — Push to GitHub

```bash
git add .
git commit -m "Initial site build"
git push origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (left sidebar).
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**.

GitHub will publish your site at:  
`https://[your-username].github.io/lionstreetlearning/`

### Step 3 — Add Your Custom Domain

1. In **Settings → Pages**, enter your custom domain (e.g., `www.lionstreetlearning.com`) under **Custom domain**.
2. Check **Enforce HTTPS** (available after DNS propagates, usually 24–48 hrs).
3. GitHub will automatically create/update the `CNAME` file in your repo.

---

## Connecting a Custom Domain via Squarespace DNS

> These steps assume your domain is **registered through Squarespace** (Domains panel) and you want to point it to GitHub Pages.

### Step 1 — Get GitHub Pages IP Addresses

GitHub Pages currently uses these A record IPs (verify at [GitHub Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Step 2 — Configure DNS in Squarespace

1. Log in to **Squarespace** → **Domains**.
2. Click your domain → **DNS Settings** → **DNS Records**.
3. Delete any existing **A records** pointing elsewhere.
4. Add the following records:

#### For the root domain (`lionstreetlearning.com`):

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 3600 |
| A | `@` | `185.199.109.153` | 3600 |
| A | `@` | `185.199.110.153` | 3600 |
| A | `@` | `185.199.111.153` | 3600 |

#### For the `www` subdomain:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `[your-username].github.io` | 3600 |

### Step 3 — Verify

After 24–48 hours for DNS propagation:
- Visit `www.lionstreetlearning.com` — it should load your site.
- In GitHub Settings → Pages, click **Verify** next to your custom domain.
- Enable **Enforce HTTPS** for a secure connection.

> **Tip:** Use [whatsmydns.net](https://www.whatsmydns.net) to check DNS propagation status globally.

---

## Customization Guide

### Colors (CSS Variables)

All brand colors are defined as CSS custom properties at the top of `css/style.css`:

```css
:root {
  --clr-primary:       #F5A623;  /* Amber gold */
  --clr-primary-dark:  #D4850A;
  --clr-primary-light: #FEF3D8;
  --clr-secondary:     #1E3A5F;  /* Navy blue */
  --clr-secondary-med: #2D5B8E;
  --clr-accent:        #FF6B6B;  /* Coral */
}
```

Change these values to instantly re-theme the entire site.

### Fonts

The site uses [Google Fonts](https://fonts.google.com):
- **Poppins** — headings, logo, buttons
- **Inter** — body text

To change fonts, update the `<link>` tag in each HTML `<head>` and the variables in `style.css`:

```css
--font-display: 'Your Heading Font', sans-serif;
--font-body:    'Your Body Font', sans-serif;
```

### Contact Form

The current form has client-side-only handling (simulated submission). To wire up real form submissions, choose one of:

- **[Formspree](https://formspree.io)** — free tier, just change `action="#"` to your Formspree endpoint
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `netlify` attribute if deploying to Netlify
- **[EmailJS](https://www.emailjs.com)** — send emails directly from client-side JS
- A custom backend endpoint

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
