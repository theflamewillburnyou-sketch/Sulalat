# Sulalat AI Project Brief

> **Purpose:** Give any AI (or developer) enough context to create new Shopify sections, pages, and templates that match Sulalat’s structure, design system, and functionality.
>
> **How to use:** Paste or attach this file at the start of a task. Prefer matching existing `sulalat-*` / custom sections over inventing a new visual language.
>
> **Last updated:** 2026-09-23  
> **Repo:** Shopify Online Store 2.0 theme (base: Clean Canvas Enterprise), customized for **Sulalat**.

---

## 1. Project overview

| Item | Detail |
|------|--------|
| Brand | Sulalat — specialty coffee / hospitality (Saudi Arabia focus) |
| Platform | Shopify OS 2.0 (JSON templates + sections) |
| Theme base | Enterprise (Clean Canvas) + heavy custom Sulalat sections |
| Locale / currency context | Often SAR; bilingual EN + Arabic content appears on cards |
| Primary accent | Mint green `#53c295` (also `#61c19a` in Brand style settings) |

**Business surfaces in theme:** storefront marketing pages, shop/collections, custom product PDP (`product.sulalat`), cart, customer dashboard/wishlist, B2B register, initiatives/academy content pages, payment promo banners (Tabby/Tamara).

---

## 2. Repository structure (what matters)

```
layout/theme.liquid          → global CSS vars, brand tokens, header/footer groups
assets/brand-system.css      → brand CSS variables + .primary-btn / .secondary-btn
assets/main.css              → base Enterprise theme
assets/custom-style.css      → store-specific overrides
assets/footer.css            → footer brand styling
sections/                    → OS 2.0 sections (prefer sulalat-* / feature-named files)
snippets/                    → reusable liquid (e.g. sulalat-product-card, sulalat-tamara-widget)
templates/*.json             → page/product/collection compositions
templates/customers/*        → account login/register/order (classic accounts)
config/settings_schema.json  → Brand style + theme settings
```

**Naming conventions**
- Custom sections: `sulalat-*`, `product-*`, `shop-*`, `main-*-sulalat`, initiative/page names.
- CSS BEM-like: `.sulalat-pdp__*`, `.sulalat-product-card__*`, scoped with `[data-section-id="{{ section.id }}"]`.
- CSS variables per section: `--sulalat-*`, `--brand-*`, or short prefixes (`--sti-`, `--prep-`, `--ssl-`).

---

## 3. Design system (tokens)

Source of truth: `assets/brand-system.css` + Theme settings → **Brand style** + overrides in `layout/theme.liquid`.

### 3.1 Colors

| Token / role | Typical value | Use |
|--------------|---------------|-----|
| Primary / CTA | `#53c295` | Buttons, accents, active tabs, links on brand surfaces |
| Primary hover | `#45ad82` | Hover states |
| Deep / link emphasis | `#006c4e` | Stronger mint links |
| Heading | `#1a1a1a` / `#141211` | Titles |
| Body | `#4a4a4a` / `#535353` | Paragraphs |
| Muted | `#757575` / `#8a8a8a` | Placeholders, secondary text |
| Page / soft surface | `#fbf9f9`, `#f5f3f3`, `#e7f5ef` | Backgrounds, mint panels |
| Card | `#ffffff` | Cards, form cards |
| Border | `#e5e5e5` / `#dbdad9` | Dividers, inputs, cards |
| Footer bg | `#eef9f4` | Footer mint wash |
| Promo soft | `#eaf8f1` | PDP promo banner backgrounds |
| Table value bg | `#eaf8f1` | Taste/info tables |

**Avoid (for new Sulalat work):** purple/indigo AI defaults, cream+terracotta clichés, heavy glow, random dark-mode-first looks.

### 3.2 Shape & spacing

| Token | Value | Use |
|-------|-------|-----|
| `--brand-radius-sm` | ~12px | Small controls |
| `--brand-radius-md` | ~16–18px | Cards, media |
| `--brand-radius-lg` | ~20px | Larger panels |
| `--brand-radius-pill` | 26px+ / 999px / 80px | Primary CTAs, pills |
| `--brand-container-max` | 1440–1600px | `.container` max-width |
| `--brand-container-padding-x` | 100px → 30px → 20px (breakpoints) | Horizontal page padding |
| Section padding | often 40–80px desktop, ~28–48px mobile | Per-section settings |

### 3.3 Typography

- Use theme fonts: `var(--heading-font-family)`, `var(--body-font-family)` (configured in Theme Editor → Typography).
- Section headings: often `clamp(28px, 3vw, 40px)` or larger hero titles; weight 600–700.
- Body: ~15–16px, line-height ~1.5–1.6.
- Do **not** default to Inter/Roboto/Arial stacks in new custom CSS unless matching an existing pattern.

### 3.4 Buttons

Prefer existing brand classes from `brand-system.css`:

- **Primary:** `.primary-btn` / `.brand-cta--primary` — mint fill, white text, pill, hover fills white with mint text.
- **Secondary / outline:** `.secondary-btn` / `.brand-cta--secondary` — mint border, mint text, hover fills mint.
- Product cards also use `.sulalat-btn--primary` / `.sulalat-btn--outline` (local to card sections).

**Rules**
- Pill shape for main CTAs.
- Accent `#53c295` unless section setting overrides.
- Avoid generic purple buttons.

### 3.5 Cards & media

- Soft rounded rectangles (`border-radius: 14–20px`).
- Light borders `#e5e5e5`–`#e8e8e8`; avoid heavy multi-layer shadows (subtle `var(--brand-shadow)` OK).
- Product media often colored brand panels (teal / magenta / beige) with white icon when “brand media” mode is on.
- Images: lazy load, `image_url` + `image_tag` with widths/sizes.

### 3.6 Layout composition rules

- First viewport of marketing pages: brand-forward, one clear job (hero), not a dashboard of widgets.
- Full-bleed heroes via `page-banner` (image + overlay + heading) are common for custom pages.
- Content width: always wrap in `.container` using brand max-width/padding vars.
- Prefer **one purpose per section**: one heading, short support text, one primary interaction.

---

## 4. Global chrome: header & footer

### 4.1 Header (`sections/header.liquid`)

Two modes:

| Mode | Class | Look | When |
|------|-------|------|------|
| Overlay | `header--overlay` | Transparent over hero; light/white UI | Most marketing pages with banners |
| Solid / product | `header--product` | White bar, dark text | Product, cart, article, blog, dashboard, wishlist, category collection, **b2b-register** |

Logic (simplified): `is_product_header` is true for:

- `product`, `cart`, `article`, `blog`
- template suffixes: `dashboard`, `dashboard-orders`, `wishlist`, `product-category-collection`, `b2b-register`

**When creating a new page template that has no dark hero / needs readable nav:** add its `template.suffix` to that solid-header condition so the header does not overlap content.

Sticky overlay headers sit over content; solid headers take document flow. If content sits under the header, fix header mode or add top padding — do not invent a second header.

### 4.2 Footer (`sections/footer.liquid` + `footer-group.json` + `assets/footer.css`)

- Mint-tinted footer background (`--brand-footer-bg` / `#eef9f4`).
- Multi-column menus + text blocks via footer group.
- Accent links/icons use primary mint.
- Keep footer changes in footer group/settings; don’t duplicate footer markup inside random sections.

---

## 5. How pages & templates work

### 5.1 Creating a new page

1. Add `templates/page.{suffix}.json` with `sections` + `order`.
2. Admin → Pages → Add page → Theme template → select `{suffix}`.
3. Prefer reusing `page-banner` + custom feature sections.

### 5.2 Template inventory (custom / important)

| Template | Role |
|----------|------|
| `index.json` | Homepage |
| `product.sulalat.json` | Custom coffee PDP |
| `product.json` | Default product |
| `page.shop.json` | Shop landing (categories + category product strips) |
| `collection.product-category-collection.json` | Category listing + filters + load more |
| `page.b2b-register.json` | B2B / company registration |
| `page.wishlist.json` | Wishlist |
| `page.dashboard.json` / `page.dashboard-orders.json` | Customer dashboard |
| `page.initiatives.json` + many initiative pages | Content / CSR / academy style pages |
| `page.contact.json` | Contact + map |
| `cart.json` | Cart (`main-cart` Sulalat styling) |
| `customers/*` | Classic customer account flows |

### 5.3 Section anatomy (required pattern for new sections)

```liquid
<section class="sulalat-example" data-section-id="{{ section.id }}" style="--ex-accent: {{ section.settings.accent_color }};">
  <style>
    .sulalat-example[data-section-id="{{ section.id }}"] { ...scoped... }
    .sulalat-example[data-section-id="{{ section.id }}"] .container {
      max-width: var(--brand-container-max, 1440px);
      margin: 0 auto;
      padding: 0 var(--brand-container-padding-x, 20px);
    }
    @media (max-width: 749px) { ... }
  </style>
  <div class="container">...</div>
</section>
{% schema %}{ "name": "...", "settings": [...], "blocks": [...], "presets": [...] }{% endschema %}
```

**Rules**
- Scope all CSS to `[data-section-id]`.
- Expose colors/padding in schema (defaults = brand mint/white).
- Mobile breakpoints commonly `749px` and `989px`.
- Prefer metafields for product-specific content; blocks as Theme Editor fallback.

---

## 6. Product experience (`product.sulalat`)

### 6.1 Section order (typical)

1. `main-product-sulalat` — gallery, title, short desc, rating, variants, ATC, subscribe, bulk CTA, promo, **Tabby/Tamara payment banners**
2. `product-taste-info` — Taste Profile + Information table (metafields)
3. `product-coffee-preparation` — media gallery (metafields / blocks)
4. `product-description-tabs` — Description / Reviews + Brand/SKU/Category
5. `product-store-locator` — Where to get this product (country → city → store + map)
6. `product-recommendations` — Related products (Sulalat cards)

### 6.2 Key metafields / metaobjects (product)

| Key | Purpose |
|-----|---------|
| `custom.short_description` | Short text / rich text under title |
| `custom.taste_profile` (or `taste_profile_text`) | Taste profile body |
| `custom.flavor_notes` | List of flavor note metaobjects (name + image) |
| `custom.country`, `process`, `roast`, `altitude`, `variety`, `sca_score` | Info table |
| `custom.coffee_preparation` | List of prep media metaobjects |
| `custom.coffee_preparation_heading` | Optional heading |
| `custom.store_locations` / `where_to_buy` / `stores` | List of store location metaobjects |
| `custom.title_ar` / `arabic_title` | Arabic title on product cards |
| `custom.card_badge` | Optional badge image on cards |

**Coffee preparation item fields (flexible):** `image`/`photo`, `video`, `video_url`, `show_play`, `link`  
**Store location fields:** `name`, `country`, `city`, `address`, `latitude`/`lat`, `longitude`/`lng`, optional `map_embed`

### 6.3 Product card (`snippets/sulalat-product-card.liquid`)

- Color rotation: teal → magenta → beige.
- Optional `brand_media: true` → colored panel + icon (not photo).
- Body: title, short description, price, **View Details** / **Add to Cart** (or **View Product** when `details_label` passed).
- Used on: related products, shop category products, category collection.

### 6.4 Payments (Tabby / Tamara)

- Custom **Payment banners** block in `main-product-sulalat` (side-by-side cards).
- Dynamic installment = price ÷ 4; updates with variant JS.
- Learn more / More options must be real `<a href>` (defaults to tabby.ai / tamara.co if empty).
- Tamara often has **no theme app block** — use `tamara_public_key` + `snippets/sulalat-tamara-widget.liquid`.
- Tabby may expose an app block; prefer not duplicating widgets next to custom banners.

---

## 7. Shop & collections

### 7.1 Shop page (`page.shop`)

- `page-banner`
- `shop-categories` — image + title grid linking to collections/pages
- Multiple `shop-category-products` — banner + heading + product grid + “view all” link

### 7.2 Category collection (`collection.product-category-collection`)

- `page-banner`
- `main-collection-sulalat` — category nav, sort, grid of `sulalat-product-card`, **Browse more** load-more label
- Solid header mode for this template

Shop listing CTAs: **View Product** (not “View Details”) on shop/collection cards; Related Products on PDP keep **View Details**.

---

## 8. Cart

- Template: `templates/cart.json` → `sections/main-cart.liquid` (class `sulalat-cart`).
- White background, large title, two-column layout (items + summary), soft rounded panels (`border-radius: 20px`), mint accent settings.
- Also: `cart-drawer` for drawer UX; keep styling consistent with brand pills/accent.
- Empty state should link toward shop/collections.

---

## 9. Checkout (limits)

Shopify **Checkout** is largely hosted / Checkout Extensibility — **do not** expect full Liquid redesign of checkout like theme sections.

Document for AI:
- Theme can brand storefront + cart; checkout branding follows Shopify admin checkout settings / Plus extensibility.
- Thank-you / order status may use additional apps or Shopify features.
- Payment methods Tabby/Tamara are configured as Shopify payment apps; PDP banners are promotional only.

---

## 10. Customer accounts, wishlist, dashboard

| Area | Notes |
|------|-------|
| Classic register/login | `templates/customers/*`, `main-register.liquid` |
| Custom B2B register | `page.b2b-register` + `sections/b2b-register.liquid` (may be disabled if using app forms) |
| Wishlist | `page.wishlist` + wishlist section/app patterns; solid header |
| Dashboard | `page.dashboard`, `page.dashboard-orders`, `customer-dashboard` section |

**Account type note:** Theme `create_customer` forms need **Legacy (classic) customer accounts**. New Customer Accounts break password-based theme register forms.

---

## 11. B2B registration & tagging

### Intended flow

1. **Normal** customers → default `/account/register` (no `b2b` tag).
2. **B2B** customers → dedicated page using `b2b-register` template (or Rivio / form app embed on that page).
3. Shopify Flow: Customer created / tagged → if tag contains `b2b` → B2B automation.

### Theme form (`b2b-register`) behavior

- Company vs Personal toggle.
- Company fields → `customer[first_name]` / `[last_name]` + extras in `customer[note]`.
- Tag via `customer[tags]` (`b2b` for company; configurable).
- Solid header to avoid overlap.
- Extra B2B fields (CR, VAT, region, city, phone) live in **customer note**, not native Shopify register fields.

### Apps (if used instead of theme form)

- Rivio B2B Registration / similar: auto-approve rules must match **submitted field values**, not only field keys.
- Hidden field key `b2b` ≠ value `b2b` unless default value is set.
- Simplest: auto-approve all submissions on the B2B form + set **Customer tags** to `b2b` after approval.
- Shopify Forms: free but weak for this design + conditional B2B UX.

---

## 12. Content / initiatives pages

Common pattern:

1. `page-banner` (fullscreen-ish image, overlay, H1, short text)
2. Content sections (grids, tabs, rich text)
3. Optional `initiative-register` (lead form with privacy/terms)

Examples: green-future, chocolate, bakery-gelato, academy, barista, cupping, community-empowering, environmental, wellbeing-growth, cafe-consultancy, maintenance pages, solutions, experience-sulalat, insight.

Arabic dates may appear on insight cards via `snippets/insight-date.liquid`.

---

## 13. Functionality patterns AI must reuse

1. **Metafields first, blocks fallback** — product-driven content.
2. **Scoped CSS** — never leak global selectors without section id.
3. **Schema defaults** — brand mint `#53c295`, white backgrounds, sensible padding ranges.
4. **Responsive** — stack grids ≤749px; 2-col often ≤989px.
5. **Accessibility** — labels (visually-hidden OK), button types, aria on tabs/maps.
6. **Money** — `| money`; installment math in cents.
7. **JSON templates** — register section in `templates/*.json` `sections` + `order`.
8. **Header awareness** — add solid-header suffix for non-hero pages.
9. **No fake clickable links** — if it looks like a link, give a real `href` or button action.
10. **Apps** — prefer documented app blocks/snippets; don’t assume every app has a theme block (Tamara).

---

## 14. AI generation checklist (new section / page)

Before coding, answer:

- [ ] Which template? (`page.x`, `product.sulalat`, collection…)
- [ ] Overlay or solid header?
- [ ] Does content come from metafields, blocks, or collection?
- [ ] Which existing section is the closest visual sibling?
- [ ] Primary CTA style: `.primary-btn` or local `.sulalat-btn`?
- [ ] Mobile stacking defined?
- [ ] Schema + preset added?
- [ ] Wired into JSON template order?

**Do**
- Match mint accent, pill buttons, soft radii, `.container` vars.
- Copy patterns from `product-taste-info`, `product-description-tabs`, `shop-category-products`, `b2b-register`, `main-cart`.
- Keep one job per section.

**Don’t**
- Invent a new color system or purple gradients.
- Put dense dashboard chrome in marketing heroes.
- Break cart/checkout expectations with experimental checkout Liquid.
- Hardcode Inter/system fonts.
- Leave “Learn more” as non-link spans.

---

## 15. Quick reference — key files

| Concern | File(s) |
|---------|---------|
| Brand tokens | `assets/brand-system.css`, `layout/theme.liquid`, Brand style in `settings_schema.json` |
| Header modes | `sections/header.liquid` (`is_product_header`) |
| Footer | `sections/footer.liquid`, `sections/footer-group.json`, `assets/footer.css` |
| PDP | `sections/main-product-sulalat.liquid`, `templates/product.sulalat.json` |
| Product card | `snippets/sulalat-product-card.liquid` |
| Cart | `sections/main-cart.liquid` |
| Shop | `sections/shop-categories.liquid`, `shop-category-products.liquid` |
| Collection grid | `sections/main-collection-sulalat.liquid` |
| B2B register | `sections/b2b-register.liquid`, `templates/page.b2b-register.json` |
| Tamara widget | `snippets/sulalat-tamara-widget.liquid` |
| Page hero | `sections/page-banner.liquid` |

---

## 16. Example prompt for future AIs

```text
Using SULALAT_AI_PROJECT_BRIEF.md as the source of truth, create a new Shopify section for [GOAL].
Match Sulalat brand tokens (#53c295, pill CTAs, scoped CSS, .container vars).
Follow existing section patterns (data-section-id, schema padding/colors).
Use [metafields/blocks] for content. Wire into templates/[file].json.
Use solid header if the page has no dark hero. Mobile breakpoint 749px.
```

---

*End of brief. Keep this file updated when major design tokens, header rules, or core templates change.*
