# Nuvessio — Learning Studio HTML Template

[Live demo](https://hams52450-sudo.github.io/nuvessio/)

A single-page template for a learning studio, tutoring business, or small training provider. Version 1.1.0. Available in English, Uzbek, and Russian.

**Plain HTML, CSS, and JavaScript. No framework, installation, build step, or subscription required.** Images are included locally. Text uses fonts already available on each visitor's device; no font files or external font services are included. The default demo makes no third-party network requests.

## 1. Open the template

1. Unzip the package and open the `nuvessio-template` folder.
2. Double-click `index.html` to preview the page in a current browser.
3. Open the files in a text editor, make a change, save, and refresh the browser.

Keep a backup before editing. All content stays on one page.

## 2. Find the right file

```text
nuvessio-template/
├── index.html                   The complete website page
├── README.md                    This customization guide
├── ASSET-NOTICES.md              Asset origin and usage notes
└── assets/
    ├── css/styles.css           Colors, typography, layout, responsive rules
    ├── js/main.js               Mobile menu, course selection, demo form
    └── images/
        ├── favicon.svg          Browser tab icon
        ├── learning-workshop.webp
        ├── learning-workshop-small.webp
        └── social-preview.png   Image for social sharing
```

## 3. Make it yours

| Change | Where to edit |
| --- | --- |
| Brand name | Search for `Nuvessio` and `nuvessio` in `index.html`; update the title, metadata, header, footer, and accessibility labels. Also update the title inside `favicon.svg`. |
| Logo and tab icon | Edit the header/footer `.brand` markup and `assets/images/favicon.svg`. |
| Text, courses, FAQs, stories | Edit the labeled sections in `index.html`. |
| Colors | Change the `:root` variables near the top of `assets/css/styles.css`. |
| Fonts | Edit `--font-body` and `--font-editorial` in the CSS. The defaults use system fonts and require no downloads. |
| Spacing and page width | Edit `--section-space` and `--container` in the CSS. |
| Contact information | Replace both the visible `hello@example.com` and the matching `mailto:` address in `index.html`. |
| Main photo | Replace both workshop images and update their `src`, `srcset`, dimensions, and `alt` text. |
| Social sharing image | Replace `assets/images/social-preview.png` with your own branded image; update its URL and image descriptions in the page metadata. |

The palette is navy `#152d47`, terracotta `#b8522a`, peach `#f5b794`, and ivory `#faf8f4`. Check text contrast after changing colors. System fonts can look slightly different across operating systems. Georgia remains the system serif choice for italic accents.

For the main photo, export the same landscape image at 1200 px and 640 px wide. Keep faces or other important details near the center. Update the descriptive alt text and remove the AI disclosure only if your replacement is not AI-generated. Use assets that allow redistribution in templates.

Navigation links match section IDs on this page. If you rename an `id`, update its matching `href`. To add a course, duplicate a course `<article>` and add an `<option>` with the same value as its `data-course`. The existing values are `english`, `web`, and `math`.

## 4. Add your domain and publish

This buyer package contains no preset live-demo domain. Domain-dependent SEO tags are commented out so the template never publishes an example canonical URL by accident.

1. In the `<head>` of `index.html`, find `BUYER DOMAIN SETTINGS`.
2. Replace the example page and image URLs in the four tags with your own complete HTTPS URLs. Include any subfolder used by your hosting.
3. Remove only the `<!--` and `-->` lines surrounding those four tags to activate them. Leave the instruction comment above them intact if you find it helpful.

The four tags should look like this after editing, with your real domain in place of `your-domain.example`:

```html
<link rel="canonical" href="https://your-domain.example/">
<meta property="og:url" content="https://your-domain.example/">
<meta property="og:image" content="https://your-domain.example/assets/images/social-preview.png">
<meta name="twitter:image" content="https://your-domain.example/assets/images/social-preview.png">
```

Update the existing page title, description, Open Graph title/description, and `og:image:alt` / `twitter:image:alt` text to match your business and artwork. Keep the existing `twitter:card` tag; do not add a duplicate. The page language is `en-US` and the Open Graph locale is `en_US`.

Upload `index.html` and the entire `assets` folder to your static hosting service. Keep filenames and letter case unchanged. No special server routing is needed. Open the published page and social image URL to check that both load.

## 5. Understand the contact form

**The included form is a demo. It does not send email or store entries.** It checks required fields and displays a clear demo message. A backend, inbox, booking system, and payment processing are not included.

For a simple website, replace the example email address and use the email link. Keep the demo notice while the form is in demo mode. To receive messages through the form, ask a developer to follow the advanced section below.

## Before launch

- Replace fictional names, course details, learner quotes, contact information, and the sample learning plan with accurate content. Use testimonials only with permission.
- Keep demo disclosures until you replace the illustrative claims and connect any real services.
- Review `ASSET-NOTICES.md` and the requirements of your selected marketplace.
- Test the mobile menu, course buttons, FAQs, email link, and form after editing.
- Check desktop, tablet, and phone layouts, keyboard navigation, text contrast, and all file paths.
- Confirm that your domain and social image URLs are correct and the page contains no example business information.

## Advanced: connect a live form service

This section is for buyers or developers who need real message delivery. It is optional for a static demo.

1. Set `data-endpoint=""` on `#inquiry-form` in `index.html` to your HTTPS endpoint.
2. The endpoint must accept a JSON `POST` with `name`, `email`, `course`, `message`, and boolean `consent`. Course values include `english`, `web`, `math`, and `guidance`.
3. Return a successful HTTP status with JSON `{ "success": true }` only after accepting the inquiry. Empty or different responses are treated as unconfirmed delivery.
4. A service on another origin must permit your domain through CORS. If its format differs, adapt the small `fetch` block in `assets/js/main.js`.
5. Implement server-side validation, length limits, spam protection, rate limiting, secure delivery, and appropriate data handling. Never put API secrets in HTML or JavaScript.
6. Replace the demo form notice and the information notice with your actual data practices. Test successful delivery, rejected requests, offline use, and timeouts before accepting real inquiries.

The script prevents duplicate submissions, uses a 12-second timeout, preserves entries when delivery is uncertain, and resets the form only after confirmed success. Without JavaScript, the submit button stays disabled; page content, navigation, course outlines, FAQs, and the email link remain usable.

For local HTTP testing, use your editor's local server. If Python is installed, you can run `python -m http.server 8080` from the template folder and open `http://localhost:8080`. Test the connected form on its final HTTPS host as well.

This package does not promise business results or marketplace acceptance. The seller supplies the applicable marketplace or end-user license; no open-source license is assigned to the template code here.

## Multilingual update — EN / UZ / RU

The original English page is preserved. Uzbek and Russian are available in the header. No dependencies or build step were added.

- `assets/js/i18n.js` contains translation rows: original English key, Uzbek, Russian. When editing source copy, update the matching key and both translations together.
- Load `i18n.js` before `main.js`, as in the supplied HTML.
- `nuvessio.language` stores only `en`, `uz`, or `ru` in localStorage. Invalid values fall back to English; unavailable storage does not stop the page from working.
- Text nodes are updated without replacing controls or icons. User entries and expanded sections survive switching.
- Form validation and delivery statuses use the active language. The form remains in demo mode until its endpoint is configured.
- Language selection needs JavaScript. When JavaScript is disabled, the original English content stays available and the language controls are hidden.
- Test the extracted folder through a local HTTP server or your normal web host for consistent origin-based storage. Storage for direct file URLs depends on the browser.
- This update does not publish or modify a live site.
