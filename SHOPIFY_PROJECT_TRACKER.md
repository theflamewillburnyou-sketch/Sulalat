# Shopify Project Tracker — Sulalat Homepage

## Project Overview

- **Project name:** Sulalat (Shopify Online Store 2.0)
- **Project objective:** Rebuild the **homepage** to match the provided reference screenshot as closely as technically possible while keeping the implementation maintainable, responsive (desktop/tablet/mobile), and fully compatible with OS 2.0 sections.
- **Screenshot/design reference:** Provided image `Home__1_-233268ac-3325-4900-9cbc-d8ccc6fd4928.jpg` (stored in repo `assets/`).
- **Current stage:** Audit complete; mapping complete; brand-system implementation pending.
- **General architecture:**
  - Homepage rendered by `templates/index.json` with section order driven by the `sections` + `order` fields.
  - Global theme styling exists in `assets/main.css` + theme variables injected from `layout/theme.liquid`.
  - Homepage sections are currently implemented as **OS 2.0 sections** in `sections/*.liquid`, each mostly self-styled via inline `<style>` blocks and per-section CSS variables.
- **Important assumptions:**
  - The screenshot’s section order corresponds to the current `templates/index.json` order:
    1) `hero-banner` 2) `coffee-experience` 3) `category-showcase` 4) `logo-marquee` 5) `partner-split` 6) `coffee-shop-slider` 7) `trust-partner` 8) `blog-showcase` 9) `trust-partner`
  - The screenshot is using the same brand accent palette already present in the section defaults (gold/button `#c7a17a`, pale surface `#f5f1eb`, light green `#c4f6e2`-tinted divider).

## Theme Architecture

### Existing components
- **Templates:** `templates/index.json` (homepage layout)
- **Global layout:** `layout/theme.liquid`
- **Global CSS/JS:**
  - `assets/main.css` (theme-wide typography, containers, and `.btn` system)
  - `assets/main.js` (theme runtime utilities)

### Homepage sections (current)
- `hero-banner.liquid` — top hero with background image + overlay heading + image cards + optional scroll link.
- `coffee-experience.liquid` — two-column about section with paired image sliders + heading + text.
- `category-showcase.liquid` — horizontal category card showcase (Swiper-based) + “View all” card.
- `logo-marquee.liquid` — autoplaying/static logo marquee (CSS keyframes) + section title.
- `partner-split.liquid` — split layout: content + image inside rounded panel.
- `coffee-shop-slider.liquid` — centered content + two CTA buttons + Swiper image slider.
- `trust-partner.liquid` — second logo marquee variant (same pattern as logo-marquee but separate section file).
- `blog-showcase.liquid` — featured blog article card + side list + CTA.

### Snippets/assets potentially relevant
- Theme runtime already supports focus-visible and general UI patterns.
- No existing dedicated “brand system” CSS file found yet.

## Section Inventory (Homepage)

| Section | File | Status | Screenshot Match | Last Modified | Notes |
| ------- | ---- | ------ | ---------------- | ------------- | ----- |
| Hero | `sections/hero-banner.liquid` | Modified | Pending | 2026-08-24 | Rebuilt to match sulalat-main HTML: image cards + centered Shop Now overlay + scroll in banner-btm |
| About/Experience | `sections/coffee-experience.liquid` | Modified | Pending | 2026-08-24 | Refined padding + slider radii via brand tokens |
| Categories | `sections/category-showcase.liquid` | Rebuilt | Pending | 2026-08-24 | Rebuilt from Swiper to CSS grid for screenshot parity |
| Logo Marquee (Quality) | `sections/logo-marquee.liquid` | Modified | Pending | 2026-08-24 | Refined padding + section-title rhythm via brand tokens |
| Partner Split | `sections/partner-split.liquid` | Modified | Pending | 2026-08-24 | Updated panel radius + CTA radius, plus content/image ratio & CTA padding |
| Coffee Shop Slider | `sections/coffee-shop-slider.liquid` | Modified | Pending | 2026-08-24 | Updated CTA radius + slider-card radius via brand tokens |
| Trusted Partners (Marquee #1) | `sections/trust-partner.liquid` | Modified | Pending | 2026-08-24 | Refined padding + section-title rhythm via brand tokens |
| Blog Showcase | `sections/blog-showcase.liquid` | Modified | Pending | 2026-08-24 | Updated card/thumb radius + CTA radius via brand tokens |
| Trusted Partners (Marquee #2) | `sections/trust-partner.liquid` | Modified | Pending | 2026-08-24 | Same section, different block settings |

## Change Log

`2026-08-24`
- `SHOPIFY_PROJECT_TRACKER.md`
- Created project tracking file with audit summary and initial screenshot mapping.

- `assets/brand-system.css`
- Added centralized brand tokens (palette, radii, button/card primitives) intended for theme-wide reuse.

- `layout/theme.liquid`
- Included `brand-system.css` after `main.css` to make brand variables available globally.

- `sections/coffee-experience.liquid`
- Refined container padding + slider radii to use centralized brand tokens.

- `sections/category-showcase.liquid`
- Refined container padding, section title spacing, and category image radii to use brand tokens.

- `sections/category-showcase.liquid`
- Rebuilt the category showcase layout from Swiper to a responsive CSS grid (to better match the screenshot’s visible card row and to reduce homepage JS/third-party loading).

- `sections/category-showcase.liquid`
- Enforced square aspect ratio for category images and added an empty square spacer for the “View all” tile to preserve card height in the grid.

- `sections/logo-marquee.liquid`
- Refined container padding and section title spacing to use brand tokens.

- `sections/trust-partner.liquid`
- Refined container padding and section title spacing to use brand tokens.

- `sections/partner-split.liquid`
- Updated panel/image radius and CTA button radius to centralized brand pill/lg tokens.

- `sections/partner-split.liquid`
- Adjusted partner panel layout ratio (content/image widths) and increased CTA padding + font-weight for closer screenshot matching.

- `sections/coffee-shop-slider.liquid`
- Updated CTA button radius and slider image radius to centralized brand tokens.

- `sections/blog-showcase.liquid`
- Updated container padding/title spacing, card image/thumb radius, and CTA button radius to centralized brand tokens.

- `sections/hero-banner.liquid`
- Updated hero card overlay CTA positioning (bottom-center) and added a subtle bottom gradient behind the CTA for closer screenshot parity.

- `sections/header.liquid`
- Set main header background on `index` pages to **semi-transparent** (not fully transparent) so it overlays the hero like the reference screenshot.

- `sections/header.liquid`, `snippets/localization-form.liquid`, `sections/header-group.json`
- Language selector was not rendering because the header section had no `enable_language_selector` setting. Added header Theme Editor settings and placed the selector in the header icon row (left of account/cart).

- `sections/header.liquid`, `snippets/localization-form.liquid`
- Header language switching now uses the same `localization-form` render as the announcement bar (no native select). The header copy had `include_native: true`, which made `custom-select` fire a native `change` instead of submitting Shopify’s localization form.

- `config/settings_data.json`, `config/settings_schema.json`, `assets/brand-system.css`, `layout/theme.liquid`, homepage + header/overlay settings
- Applied Sulalat Brand Style Guide as the theme default: primary `#61c19a`, charcoal text `#1a1a1a`, soft white bg `#fbf9f9`, Noto Serif headings, Be Vietnam Pro body (Google Fonts + Nunito Sans fallback), pill buttons, larger section spacing, and replaced leftover gold/orange accents on homepage/header/overlays.

- `sections/header.liquid`, `assets/brand-system.css`, `config/settings_data.json`
- Homepage header now overlays the hero as a fully transparent bar (no gray/black strips): transparent search, white icons/text, title-case centered nav, language → cart → account order, bag icon, and a light glass background after scroll.

- `sections/hero-banner.liquid`
- Forced hero card images to `loading="eager"` (and `fetchpriority="high"`) so they render immediately like the screenshot.

- `sections/header.liquid`, `sections/header-group.json`
- Homepage overlay header: white nav/icon tokens, search minimized to icon, hero pull under header; cleared featured “Sale” nav highlight.

- `sections/hero-banner.liquid`, `templates/index.json`
- Hero now matches screenshot 1 text-column layout: card images off by default, translucent pill CTAs (“Shop for Coffee” / “Business Solutions”), wider card row.

- `sections/coffee-experience.liquid`, `templates/index.json`
- Equal 50/50 image columns, heading + paragraph under left, body under right, overlay/pagination off for static screenshot look.

- `sections/category-showcase.liquid`, `sections/logo-marquee.liquid`, `sections/partner-split.liquid`
- Portrait category cards (3:4), circular ISO badges, mint partner panel (`#d8f3e7`) at 50/50 with “Consultation Request”.

- `sections/coffee-shop-slider.liquid`, `sections/blog-showcase.liquid`, `templates/index.json`
- Coffee shop CTAs “Main Sulalat Store” / “Pop-up Store”; blog “See More” + featured Read More + placeholder cards when no blog is selected; second logo row titled “Where You'll Find Sulalat”.

- `sections/footer.liquid`, `assets/footer.css`, `sections/footer-group.json`
- Light footer (`#f4f4f4`), mint newsletter bar above columns, Pages/Support/Legal/Contact link columns, copyright left + social right.

**Screenshot requirement addressed:** full homepage visual pass against reference screenshot 1 (header through footer).
**Responsive considerations:** brand tokens are resolution-independent; existing per-section media queries remain unchanged.
**Testing status:** not yet rendered/visually verified (pending Theme Editor + device checks).

## Design System

### Current global design variables (already present)
- Injected via `layout/theme.liquid` using theme settings into `:root` (e.g. `--btn-bg-color`, `--heading-font-family`, `--page-width`, `--gutter-*`, button border radius).
- Theme `assets/main.css` defines:
  - Typography scales for `h1`..`h6`, `.subheading`, etc.
  - Container sizing via `.container`, `.page-width`.
  - Button system via `.btn--primary`, `.btn--secondary`, and shared `--btn-*` CSS variables.

### Planned brand/design system (to add)
- Add a centralized file (likely `assets/brand-system.css`) to define:
  - Brand colors mapping to existing theme variables where possible.
  - Shared radii (`--brand-radius-sm/md/lg`) and shadows.
  - Reusable component styles for homepage cards, CTA buttons, section titles, marquee/logos, and slider cards.

### Implemented brand/design system tokens (current)
- Brand system file: `assets/brand-system.css`
- Tokens aligned to brand guide / DESIGN.md:
  - Primary CTA: `#61c19a` (hover `#4eaa84`, deep `#006c4e`)
  - Surfaces: `#fbf9f9`, `#f5f3f3`, white cards
  - Text: `#1a1a1a` / `#4a4a4a` / `#757575`
  - Border: `#dbdad9`
  - Radii: card `12–16px`, buttons pill `9999px`
  - Fonts: Noto Serif (headings) + Be Vietnam Pro (body/UI)
  - Soft shadow: `0 4px 20px rgba(0,0,0,0.05)`
- Theme Settings defaults + current Enterprise preset now use these values theme-wide.

- `config/settings_schema.json`, `config/settings_data.json`, `layout/theme.liquid`, `assets/brand-system.css`
- Added Theme Customizer group **Brand style** (colors, mint panel, radii, apply-to-theme). Tokens inject as `--brand-*` CSS variables after `brand-system.css` so merchants can update the brand guide without editing code.

- `sections/header.liquid`, `sections/hero-banner.liquid`, `templates/index.json`
- Fixed homepage header + hero only: header is fixed/transparent over hero with white UI; hero is full-viewport with serif headline, two text columns, dark pill CTAs, and scroll control on the right.

`2026-08-24` (follow-up)
- Rebuilt `sections/hero-banner.liquid` to match the user’s `sulalat-main/index.html` reference: 900px banner, dark overlay, image cards with centered “Shop Now” navi overlay, divider + scroll inside `.banner-btm`.
- Updated `templates/index.json` hero settings (1440 container, 570 card width, “Shop Now” / “For Business Partners”).
- Header overlay uses `position: absolute` (like reference); desktop search no longer minimized.

`2026-08-24` (full-page pass)
- Aligned remaining homepage sections to `sulalat-main` HTML/CSS:
  - Brand tokens (`#53c295`, mint `#e7f5ef`, footer `#eef9f4`, 1440 container, 60px title gap, Greycliff pill CTAs)
  - About: 41.4/58.6 grid, two-column body copy, overlays + pagination
  - Categories: restored Swiper freeMode slider (250px slides)
  - Certifications marquee: rectangular logos (no circles), 156px
  - Partner: 40/60 split, mint panel, Explore Business Solutions CTA
  - Coffee shop: reference CTA labels + Swiper spacing/autoplay
  - Blog + trust marquees + footer newsletter bar styling
- Updated `templates/index.json` + `config/settings_data.json` accent colors

`2026-08-24` (typography)
- Removed extra installed fonts (Be Vietnam Pro Google Fonts, Noto Serif, Greycliff CF). Storefront now uses only Theme Settings typography (`heading_font`, `body_font`, `navigation_font`).

## Responsive Rules

- Theme breakpoints present in `layout/theme.liquid`:
  - `sm` = 600px
  - `md` = 769px
  - `lg` = 1024px
  - `xl` = 1280px
- Current homepage sections use additional local breakpoints (notably 767px, 749px, 991px). We will adjust if needed for consistency but avoid breaking existing responsive logic prematurely.

## Decisions Log

`2026-08-24` — Centralize brand system via CSS variables + reusable classes.
- **Reason:** Existing sections use per-section inline styles with repeated constants; a centralized brand system will reduce drift and make future changes safer.
- **Alternative considered:** Rewriting every section to use theme `.btn` and full component classes. Deferred to avoid risky large refactors before visual parity is verified.
- **Impact:** Early CSS variable introduction first; section refactors will be done incrementally.

## Known Issues

- Exact visual differences vs screenshot cannot be fully validated without rendering in the browser; changes will be implemented in a high-confidence, low-risk order:
  1) global brand-system CSS variables
  2) reuse shared radii/colors
  3) adjust spacing/typography in the most screenshot-critical blocks (hero + partner + CTAs + blog overlay)
- Logo marquee animation speed and exact visual sizing may require iterative tuning.

## About Us page

| Piece | File | Notes |
| ----- | ---- | ----- |
| Template | `templates/page.about.json` | Assign in Admin → Page → Theme template → **about** |
| Banner | `sections/page-banner.liquid` | Full-bleed hero + overlay + subtitle/heading/text |
| Tabs + content | `sections/about-tabs.liquid` | Who We Are, Vision & Mission, Certifications + placeholder tabs; timeline uses Swiper |

`2026-08-25` — About Us tabs complete. Careers job cards open an in-tab Job Detail view (roles/qualifications/skills + Apply Online contact form).

## Solutions page

| Piece | File | Notes |
| ----- | ---- | ----- |
| Template | `templates/page.solutions.json` | Assign in Admin → Page → Theme template → **solutions** |
| Banner | `sections/page-banner.liquid` | Shared page hero |
| Showcase | `sections/solution-showcase.liquid` | Coffee + Equipments carousels |
| Feature | `sections/solution-feature.liquid` | Chocolate / Gelato / Bakery alternating splits |
| Inquiry | `sections/solution-inquiry.liquid` | B2B contact form panel |

`2026-08-25` — Added Solutions page template with Coffee, Equipments, Chocolate, Gelato, Bakery, and inquiry form sections.

## Solutions Services page

| Piece | File | Notes |
| ----- | ---- | ----- |
| Template | `templates/page.solution-services.json` | Assign in Admin → Page → Theme template → **solution-services** |
| Nav | `sections/solution-page-nav.liquid` | Breadcrumbs (Home → Solutions → Main Stream → Services) |
| Services grid | `sections/solution-services.liquid` | Maintenance & Training card sections |

`2026-08-25` — Added Solution Services page from design screenshot.

## Collection (Sulalat) page

| Piece | File | Notes |
| ----- | ---- | ----- |
| Template | `templates/collection.product-category-collection.json` | Assign in Admin → Collection → Theme template → **product-category-collection** |
| Section | `sections/main-collection-sulalat.liquid` | Category pills, search, sort, 3-col grid, Load More |
| Card | `snippets/sulalat-product-card.liquid` | Custom card with View Details + Add to Cart |

`2026-08-25` — Added Sulalat collection template from design screenshot.

## Testing Checklist

- Desktop rendering of homepage section order and spacing.
- Tablet rendering (≤ 769px) for grid/stack behavior.
- Mobile rendering (≤ 749/767px) for:
  - hero height and card stack
  - slider behavior
  - CTA button layout
  - blog card stacking
- Shopify Theme Editor compatibility:
  - section schemas remain valid
  - no reliance on hardcoded content
- Accessibility:
  - check focus states for any buttons/links modified
  - ensure decorative elements use `aria-hidden` where relevant

