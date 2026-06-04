# Artist Portfolio

A simple static portfolio site for showcasing artwork and linking to Instagram. No build step required.

## Quick start

1. Open `index.html` in a browser, or run a local server:

   ```bash
   python3 -m http.server 8000
   ```

   Then visit [http://localhost:8000](http://localhost:8000).

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
