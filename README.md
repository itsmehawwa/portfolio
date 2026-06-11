# Artist Portfolio

A simple static portfolio site for showcasing artwork and linking to Instagram. No build step required.

## Quick start

1. Run a local server (recommended):

   ```bash
   cp .env.example .env   # first time only
   bash scripts/dev.sh
   ```

   This starts a server on port `8000` (from `.env`) and opens your browser. If that port is already in use, it opens the existing server instead.

   **Do not** double-click `index.html` — use the local server or the live URL below.

   **Live site (GitHub Pages):** [https://itsmehawwa.github.io/portfolio/](https://itsmehawwa.github.io/portfolio/)

   **Troubleshooting:** If the page won't load, run `bash scripts/dev.sh` again. If you see "Address already in use", either stop the old server (`lsof -i :8000` then `kill <PID>`) or change `PORT` in `.env`.

2. **Customize content** in `index.html`:
   - Artist name, bio, and project titles
   - Replace `https://instagram.com/` with your profile URL (e.g. `https://instagram.com/yourhandle`)
   - Update the `@yourhandle` text in the About section

3. **Add your images** to the `images/` folder:
   - `work-01.jpg` through `work-06.jpg` — gallery pieces
   - `portrait.jpg` — about section photo

   Use JPG or WebP; aim for roughly 1200–1600px on the long edge for a good balance of quality and load time.

## Structure

```
portfolio/
├── index.html      # Page content
├── css/styles.css  # Layout and typography
├── js/main.js      # Mobile menu, lightbox, footer year
├── images/         # Your artwork (replace placeholders)
└── README.md
```

## Features

- Responsive image gallery with lightbox
- Instagram links in header, hero, about, and footer
- Mobile navigation
- Accessible markup and keyboard support (Escape closes lightbox)
