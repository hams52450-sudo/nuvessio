# Asterly — Learning Studio HTML Template

[Live demo](https://hams52450-sudo.github.io/asterly/) · Hosted on GitHub Pages from the `main` branch, root folder.

This is the demonstration repository. The buyer can use their own domain and hosting; no custom domain is attached here.

A warm, single-page template for a learning studio, tutoring business, or small training provider. Version 1.0.0.

**Plain HTML, CSS, and JavaScript. No framework, installation, build step, or subscription required.** All fonts and images are local. The default demo makes no third-party network requests.

## Quick start

1. Unzip the package.
2. Open `index.html` in a current browser.
3. Edit the files in any text editor and refresh to see your changes.

For local HTTP preview, use an editor's local server or, if Python is installed, run `python -m http.server 8080` from this folder. Visit `http://localhost:8080`. An HTTP server is recommended when connecting a live form service.

## Files

```text
asterly-template/
├── index.html                   The only website page
├── README.md                    This customization guide
├── ASSET-NOTICES.md              Font license and image provenance
└── assets/
    ├── css/styles.css           Numbered sections and design tokens
    ├── js/main.js               Navigation, course selection, form
    ├── fonts/
    │   ├── manrope-variable.ttf
    │   └── OFL-Manrope.txt       Keep this license with the font
    └── images/
        ├── favicon.svg
        ├── learning-workshop.webp
        ├── learning-workshop-small.webp
        └── social-preview.jpg   Optional social sharing artwork
```

## Make it yours

| Change | Where to edit |
| --- | --- |
| Brand and tagline | Header, footer, `<title>`, and metadata in `index.html` |
| Logo | Header/footer `.brand` markup; replace `assets/images/favicon.svg` separately |
| Text, courses, FAQs, stories | Clearly commented sections in `index.html` |
| Colors | `:root` variables at the top of `assets/css/styles.css` |
| Typography | `--font-body`, `--font-editorial`, and `@font-face` in the CSS |
| Spacing and width | `--section-space` and `--container` in the CSS |
| Contact email | Both the visible `hello@example.com` text and its `mailto:` link |
| Hero photo | Both workshop images, plus `src`, `srcset`, `sizes`, dimensions, and descriptive `alt` text |

The main palette is navy `#152d47`, terracotta `#b8522a`, peach `#f5b794`, and ivory `#faf8f4`. Check text contrast after changing colors. Manrope is bundled under the SIL Open Font License; Georgia uses the visitor's installed system font and is not redistributed.

The header links scroll to sections on the same page. Keep the section `id` values and matching `href` values aligned. To add a course, duplicate a course `<article>`, give its `data-course` a unique value, and add a matching `<option>` to the contact form. Course outlines and FAQs use native `<details>` elements and do not need JavaScript.

For a new hero image, use a landscape composition with the important subject near the center. Export a 1200 px and a 640 px WebP version. Both files must show the same image. Update the alt text honestly; remove the AI description only if you replace it with a non-AI asset. Do not use assets whose license excludes redistribution in templates.

## Contact form: demo first, live when configured

**The supplied form does not send email.** In demo mode it validates fields and explicitly reports that nothing was sent or stored. No backend, inbox, payment processing, booking system, or learning platform is included.

To connect a live enquiry service:

1. Set `data-endpoint=""` on `#enquiry-form` to your HTTPS endpoint.
2. The endpoint must accept a JSON `POST` with `name`, `email`, `course`, `message`, and boolean `consent`.
3. Return a successful HTTP status with JSON `{ "success": true }` only when the service has accepted the enquiry. An empty or different response is treated as unconfirmed delivery.
4. A different-origin service must allow your domain with CORS. If your provider uses a different request or response format, adapt the small `fetch` block in `main.js`.
5. Add server-side validation, length limits, rate limiting/spam protection, secure delivery, and appropriate privacy handling. Never put API secrets in the HTML or JavaScript.
6. Replace the demo information notice with your actual data practices and test success, rejected requests, offline behavior, and timeout handling on your host.

The script prevents duplicate in-flight submissions, uses a 12-second timeout, and preserves entries when delivery is uncertain. It resets the form only after a confirmed response. With JavaScript off, the form button stays disabled while page content, navigation, course outlines, FAQs, and the contact email remain available.

## SEO and publication

Update the title, description, Open Graph title/description, language, and favicon. Once your final domain exists, add absolute canonical and social image URLs in `<head>`. For example, replace `your-domain.example` below with your real host:

```html
<link rel="canonical" href="https://your-domain.example/">
<meta property="og:url" content="https://your-domain.example/">
<meta property="og:image" content="https://your-domain.example/assets/images/social-preview.jpg">
<meta property="og:image:alt" content="Asterly — Your next chapter starts with a new skill.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://your-domain.example/assets/images/social-preview.jpg">
```

Replace the existing `twitter:card` tag rather than adding a duplicate. Replace the social artwork when rebranding. Canonical URLs are intentionally not prefilled with a fake domain.

Upload `index.html` and the entire `assets` folder to any static host. Preserve folder names and letter case. No server rewrite rules are needed for this one-page template.

## Before using this for a real business

- Replace the fictional brand, course durations, sample learner quotes, contact details, and sample learning plan with accurate content. Only publish testimonials with permission.
- Keep the demo disclosures until the sample claims have been replaced.
- Connect and test the form service, or remove the form and use your real email address.
- Review asset notices and verify any new images, fonts, logos, or endorsements you add.
- Test desktop, tablet, mobile, keyboard navigation, form errors, and all links after customization.

This package is a template, not a promise of course results or marketplace acceptance. The seller chooses the applicable marketplace/end-user license; no open-source license is imposed on the template code by this package. The bundled font retains its separate OFL license. See `ASSET-NOTICES.md` for asset details.
