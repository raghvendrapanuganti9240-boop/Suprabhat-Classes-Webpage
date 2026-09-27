# Suprabhat Classes — Website

A dark, purple-and-sunrise themed website for Suprabhat Classes, with a completely
separate, app-like layout on mobile.

## 📁 File structure

```
suprabhat-classes/
├── index.html          ← all content lives here
├── css/
│   └── style.css        ← all styling + animations + mobile layout
├── js/
│   └── script.js         ← modal, WhatsApp form handoff, animations
├── images/
│   ├── profile.jpg       ← YOUR main photo (shown on homepage)
│   ├── teacher-1.jpg      ← Teacher 1 photo
│   └── teacher-2.jpg      ← Teacher 2 photo
└── README.md
```

### 📸 Where to put your photos (the names you asked about)

In `index.html`, the images are referenced as:

| Purpose | File to replace | Used in `index.html` |
|---|---|---|
| Your main profile photo (hero section, both desktop & mobile) | `images/profile.jpg` | `<img src="images/profile.jpg">` (appears twice — desktop hero + mobile hero) |
| Teacher 1's photo | `images/teacher-1.jpg` | in the "Teachers" section |
| Teacher 2's photo | `images/teacher-2.jpg` | in the "Teachers" section |
| Gallery photo 1 (large, tall) | `images/class-1.jpg` | in the "Gallery" section |
| Gallery photo 2 | `images/class-2.jpg` | in the "Gallery" section |
| Gallery photo 3 | `images/class-3.jpg` | in the "Gallery" section |
| Gallery photo 4 (wide) | `images/class-4.jpg` | in the "Gallery" section |
| Results template, 2026 | `images/results-2026.jpg` | in the "Every year gets its own result card" section |
| Results template, 2025 | `images/results-2025.jpg` | same section |
| Results template, 2024 | `images/results-2024.jpg` | same section |
| Results template, 2023 | `images/results-2023.jpg` | same section |
| Results template, 2022 | `images/results-2022.jpg` | same section |
| Results template, 2021 | `images/results-2021.jpg` | same section |

**Just replace these files with real photos/templates using the exact same file names**, and the
site updates automatically — no code editing needed. Recommended sizes:
- `profile.jpg` — square, at least 800×800px
- `teacher-1.jpg` / `teacher-2.jpg` — portrait, at least 600×750px
- `class-1.jpg` — tall/portrait classroom photo, roughly 900×1100px (it fills the large bento slot)
- `class-2.jpg` / `class-3.jpg` — landscape classroom photos, roughly 900×520px
- `class-4.jpg` — wide landscape classroom photo, roughly 1400×520px
- `results-2021.jpg` through `results-2026.jpg` — your own designed results poster/template
  for that year (whatever you make in Canva or similar), portrait orientation, roughly 900×1200px (3:4)

All of the gallery/results images crop to fill their frame (`object-fit: cover`), so they
don't need to be the exact size above — just close to that aspect ratio for the best crop.

**Adding more years or renaming files:** if you'd rather use different filenames, or add a
7th year, just duplicate one `success-card` block in the "SUCCESS STORIES / YEAR-WISE RESULTS"
section of `index.html`, point its `<img>` at your new file, and change the year in the
`<span class="success-year">` badge.

Right now they're placeholder gradient images that say "REPLACE ME" so you can see exactly
where each photo lands before you swap them.

## ✏️ Things you MUST edit before publishing

Search for these in the files and update them:

1. **Phone number** — replace `+910000000000` / `910000000000` wherever it appears in
   `index.html` (call links, WhatsApp links) and in `js/script.js` (`WHATSAPP_NUMBER` constant).
2. **Address** — currently says "Sholapur, Maharashtra" in the Contact section of `index.html`.
3. **Teacher names, subjects & bios** — in the "Teachers" section of `index.html`.
4. **Social proof numbers** — years teaching / students guided, in the hero stats
   (`data-count="12"`, `data-count="900"`).
5. **Testimonial quotes** — in the "Results" section, replace with real ones once you have them.
6. **Yearly results templates** — replace `images/results-2021.jpg` … `results-2026.jpg` with
   your own designed poster for each year (add or remove years as needed — see above).

## 💬 How the Enquiry form works

There's no backend — the form is designed to work instantly with zero setup:
when someone fills it and taps "Send Enquiry via WhatsApp," it opens WhatsApp
(web or app) with a neatly formatted message containing everything they typed,
addressed to your number. They just hit send.

If you'd like the enquiries to also land in your email or a spreadsheet later,
you can connect the form to a free service like **Formspree** or **EmailJS** —
happy to wire that up if you want it.

## 🎨 Design notes

- **Theme**: "Suprabhat" means *good morning* — so the whole site is built around a
  sunrise breaking over a deep purple night sky. The sun visually rises as visitors
  scroll down the homepage.
- **Colors**: deep purple/night background, violet accents, warm gold-to-coral sunrise
  gradient for primary actions — dark, but warm rather than cold.
- **Fonts**: Fraunces (a warm serif) for headings, Plus Jakarta Sans for body text.
- **Mobile is a genuinely different layout**, not just a squeezed desktop page:
  - A minimal top bar (logo + call/WhatsApp icons + Enquire) instead of the full nav bar.
  - A centered, app-style hero with a circular photo instead of the split hero.
  - The course timeline becomes a swipeable horizontal carousel.
  - A fixed bottom app-nav bar with a raised "pencil" button that opens the Enquiry form
    — replacing the floating WhatsApp/Call buttons used on desktop.
  - The Gallery grid and the year-wise Results cards become swipeable horizontal
    carousels instead of fixed grids, so they work naturally with a thumb on a small screen.

## 🚀 Publishing to GitHub Pages

```bash
git init
git add .
git commit -m "Suprabhat Classes website"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

Then in your repo: **Settings → Pages → Deploy from branch → main → / (root)**.
Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

No build step, no dependencies to install — it's plain HTML/CSS/JS, so it works
exactly as-is on GitHub Pages, Netlify, or Vercel.
