# JET380 — Jason E. Thomas

Front-end developer portfolio for Jason E. Thomas. The live site is [https://jet380.com](https://jet380.com).

## What this is

A static, single-page portfolio: featured projects, experience, a short bio, and contact links. There is no build step and no framework.

## Tech

- HTML and CSS (`index.html`, `portfolio.css`)
- A short script in the page for the mobile menu
- Canvas animation in `components/Matrix-rain/` (the hero logo background). It stays off when the visitor has requested reduced motion.
- Images, the favicon, the link-preview image, and the résumé PDF in `assets/`

## Preview locally

From this folder:

```bash
python3 -m http.server 8765
```

Then open `http://127.0.0.1:8765/`.

## Résumé

`resume/resume.html` is the editable source. The site links to `assets/Jason-Thomas-Resume-Front-End-Developer.pdf`.

To regenerate the PDF, print that HTML to one US Letter page with headers and footers turned off, and replace the PDF in `assets/`. Comments in the HTML mark anything that still needs a real URL.

## Live site

[https://jet380.com](https://jet380.com)

The site is hosted separately from this GitHub repository. Merging here does not publish the site.
