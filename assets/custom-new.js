/**
 * Homepage scroll animations (GSAP + ScrollTrigger + SplitType)
 * Loaded only on the index template via theme.liquid
 */
(function () {
  'use strict';

  function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function splitHeading(heading) {
    if (!heading || typeof SplitType === 'undefined') return null;
    return new SplitType(heading, { types: 'words', tagName: 'span' });
  }

  function fadeUp(elements, options) {
    if (!elements || !elements.length) return;
    var opts = options || {};
    gsap.fromTo(
      elements,
      { y: opts.y || 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: opts.duration || 0.85,
        ease: opts.ease || 'power3.out',
        stagger: opts.stagger || 0.12,
        delay: opts.delay || 0,
        scrollTrigger: {
          trigger: opts.trigger,
          start: opts.start || 'top 82%',
          once: true
        }
      }
    );
  }

  function animateSectionTitles() {
    document.querySelectorAll('.section-title').forEach(function (section) {
      // SplitType drops NBSP/spaces between inline-block .word spans on about tabs
      if (section.closest('.about-tabs')) return;

      var heading = section.querySelector('h2');
      var subtitles = section.querySelectorAll('p');

      if (heading) {
        var split = splitHeading(heading);
        if (split && split.words && split.words.length) {
          gsap.fromTo(
            split.words,
            { y: '110%' },
            {
              y: '0%',
              duration: 1,
              ease: 'power4.out',
              stagger: 0.06,
              scrollTrigger: {
                trigger: section,
                start: 'top 82%',
                once: true
              }
            }
          );
        }
      }

      if (subtitles.length) {
        gsap.to(subtitles, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 82%',
            once: true
          }
        });
      }
    });
  }

  function animateHeroBanner() {
    document.querySelectorAll('.site-banner').forEach(function (banner) {
      var heading = banner.querySelector('h1');
      var border = banner.querySelector('.banner-btm');
      var cards = banner.querySelectorAll('.banner-card');
      var scrollBtn = banner.querySelector('.scroll-btm');
      var bg = banner.querySelector('.banner-bg-img img');

      var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (bg) {
        gsap.set(bg, { scale: 1.08 });
        tl.to(bg, { scale: 1, duration: 1.6, ease: 'power2.out' }, 0);
      }

      if (heading) {
        var split = splitHeading(heading);
        if (split && split.words && split.words.length) {
          gsap.set(split.words, { y: '110%' });
          if (heading.parentElement) {
            heading.style.overflow = 'hidden';
          }
          tl.to(
            split.words,
            { y: '0%', duration: 1, stagger: 0.08, ease: 'power4.out' },
            0.3
          );
        }
      }

      if (border) {
        tl.fromTo(
          border,
          { clipPath: 'inset(0 100% 0 0)' },
          { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut' },
          0.65
        );
      }

      if (cards.length) {
        tl.fromTo(
          cards,
          { y: 44, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, stagger: 0.14, ease: 'power3.out' },
          0.75
        );
      }

      if (scrollBtn) {
        tl.fromTo(
          scrollBtn,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          1.15
        );
      }
    });
  }

  function animateAboutSection() {
    document.querySelectorAll('.about-section').forEach(function (section) {
      var left = section.querySelector('.about-left');
      var right = section.querySelector('.about-right');
      var content = section.querySelectorAll('.about-content, .about-text');

      if (left) {
        gsap.fromTo(
          left,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: left, start: 'top 85%', once: true }
          }
        );
      }

      if (right) {
        gsap.fromTo(
          right,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.12,
            scrollTrigger: { trigger: right, start: 'top 85%', once: true }
          }
        );
      }

      if (content.length) {
        fadeUp(content, { trigger: section.querySelector('.about-grid') || section, y: 28, stagger: 0.15, delay: 0.15 });
      }
    });
  }

  function animateCategoryShowcase() {
    document.querySelectorAll('.categories-sec').forEach(function (section) {
      var slides = section.querySelectorAll('.category-card, .view-all');
      fadeUp(slides, { trigger: section.querySelector('.categorySlider') || section, y: 40, stagger: 0.1 });
    });
  }

  function animatePartnerSplit() {
    document.querySelectorAll('.partner-section').forEach(function (section) {
      var content = section.querySelector('.partner-content');
      var image = section.querySelector('.partner-image');
      var paragraphs = content ? content.querySelectorAll('p') : [];
      var button = content ? content.querySelector('.primary-btn') : null;

      if (content) {
        gsap.fromTo(
          content,
          { x: -36, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', once: true }
          }
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          { x: 36, opacity: 0, scale: 1.04 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.05,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 80%', once: true }
          }
        );
      }

      if (paragraphs.length) {
        fadeUp(paragraphs, { trigger: section, y: 24, stagger: 0.1, delay: 0.2 });
      }

      if (button) {
        fadeUp([button], { trigger: section, y: 20, delay: 0.35 });
      }
    });
  }

  function animateCoffeeShop() {
    document.querySelectorAll('.coffee-shop').forEach(function (section) {
      var buttons = section.querySelectorAll('.shop-btns .primary-btn, .shop-btns .secondary-btn');
      var slider = section.querySelector('.coffeeShopSlider');

      fadeUp(buttons, { trigger: section.querySelector('.shop-btns') || section, y: 24, stagger: 0.12 });

      if (slider) {
        gsap.fromTo(
          slider,
          { y: 48, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: slider, start: 'top 88%', once: true }
          }
        );
      }
    });
  }

  function animateBlogShowcase() {
    document.querySelectorAll('.blog-section').forEach(function (section) {
      var featured = section.querySelector('.featured-blog');
      var cards = section.querySelectorAll('.blog-card');
      var btn = section.querySelector('.blog-btn');

      if (featured) {
        gsap.fromTo(
          featured,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: featured, start: 'top 85%', once: true }
          }
        );
      }

      fadeUp(cards, { trigger: section.querySelector('.blog-list') || section, y: 32, stagger: 0.12, delay: 0.1 });
      if (btn) fadeUp([btn], { trigger: btn, y: 20, delay: 0.15 });
    });
  }

  function animateMarquees() {
    document.querySelectorAll('.certifications, .trust-partner, .partners-marquee').forEach(function (section) {
      var track = section.querySelector('.logo-slider, .logo-track, .marquee, .partners-track');
      if (track) {
        gsap.fromTo(
          track,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: section, start: 'top 88%', once: true }
          }
        );
      }
    });
  }

  function init() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    if (prefersReducedMotion()) {
      document.querySelectorAll('.section-title p').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      document.querySelectorAll('.section-title h2 .word').forEach(function (el) {
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    animateHeroBanner();
    animateSectionTitles();
    animateAboutSection();
    animateCategoryShowcase();
    animatePartnerSplit();
    animateCoffeeShop();
    animateBlogShowcase();
    animateMarquees();

    // Refresh after images / Swiper settle
    window.addEventListener('load', function () {
      ScrollTrigger.refresh();
    });
  }

  ready(init);
})();


document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.querySelector(".careers-hero-image");
  const careersOverview = document.querySelector(".careers-overview");

  if (heroImage && careersOverview) {
    heroImage.addEventListener("mouseenter", function () {
      careersOverview.classList.add("cst-img-scale");
    });
  }
});

// register page css through js 
document.addEventListener("DOMContentLoaded", function () {

  const BLOCK_SELECTORS = [
    "#shopify-block-AY3hpdVFSOENGeEpOW__forms_inline_XiaxHt",
    '[id*="forms_inline_XiaxHt"]',
    '[id*="forms_inline"]'
  ];

  function findFormsEmbed() {
    for (var i = 0; i < BLOCK_SELECTORS.length; i++) {
      var block = document.querySelector(BLOCK_SELECTORS[i]);
      if (!block) continue;
      var embed = block.matches("shopify-forms-embed")
        ? block
        : block.querySelector("shopify-forms-embed");
      if (embed) return embed;
    }
    return document.querySelector("shopify-forms-embed");
  }

  function isPasswordInput(input, form) {
    if (!input) return false;
    if (input.type === "password") return true;
    if (input.hasAttribute("data-sulalat-password-input")) return true;

    var hint =
      (
        (input.placeholder || "") +
        " " +
        (input.name || "") +
        " " +
        (input.id || "") +
        " " +
        (input.getAttribute("autocomplete") || "") +
        " " +
        (input.getAttribute("aria-label") || "")
      ).toLowerCase();

    if (hint.indexOf("password") !== -1) return true;

    var label = null;
    if (input.id) {
      label = form.querySelector('label[for="' + CSS.escape(input.id) + '"]');
    }
    if (!label) label = input.closest("label");
    if (!label) {
      var parent = input.parentElement;
      for (var i = 0; i < 4 && parent; i++) {
        label = parent.querySelector("label");
        if (label) break;
        parent = parent.parentElement;
      }
    }

    return !!(label && (label.textContent || "").toLowerCase().indexOf("password") !== -1);
  }

  function collectInputs(root, form, results) {
    if (!root) return results;
    Array.prototype.forEach.call(root.querySelectorAll("input"), function (input) {
      if (isPasswordInput(input, form || root)) results.push(input);
    });
    Array.prototype.forEach.call(root.querySelectorAll("*"), function (el) {
      if (el.shadowRoot) collectInputs(el.shadowRoot, form || root, results);
    });
    return results;
  }

  function findPasswordInputs(form) {
    return collectInputs(form, form, []);
  }

  function initShopifyForm() {
    const formEmbed = findFormsEmbed();

    if (!formEmbed || !formEmbed.shadowRoot) {
      setTimeout(initShopifyForm, 300);
      return;
    }

    const shadow = formEmbed.shadowRoot;
    const form = shadow.querySelector("form");

    if (!form) {
      setTimeout(initShopifyForm, 300);
      return;
    }

    function convertLabelsToPlaceholders() {

  const inputs = form.querySelectorAll(
    'input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"]'
  );

  inputs.forEach(function (input) {

    if (input.dataset.sulalatPlaceholderInit === "true") return;

    let label = null;

    if (input.id) {
      label = form.querySelector(
        'label[for="' + CSS.escape(input.id) + '"]'
      );
    }

    if (!label) {
      label = input.closest("label");
    }

    if (!label) {
      let parent = input.parentElement;

      for (let i = 0; i < 4 && parent; i++) {

        label = parent.querySelector("label");

        if (label) break;

        parent = parent.parentElement;
      }
    }

    if (!label) return;


    /* Get label text */
    const labelText = label.textContent.trim();

    if (labelText) {
      input.placeholder = labelText;
    }


    /*
     * Visually hide original Shopify label.
     * Keep it in DOM for accessibility.
     */
    label.style.setProperty(
      "position",
      "absolute",
      "important"
    );

    label.style.setProperty(
      "width",
      "1px",
      "important"
    );

    label.style.setProperty(
      "height",
      "1px",
      "important"
    );

    label.style.setProperty(
      "padding",
      "0",
      "important"
    );

    label.style.setProperty(
      "margin",
      "-1px",
      "important"
    );

    label.style.setProperty(
      "overflow",
      "hidden",
      "important"
    );

    label.style.setProperty(
      "clip",
      "rect(0, 0, 0, 0)",
      "important"
    );

    label.style.setProperty(
      "white-space",
      "nowrap",
      "important"
    );

    label.style.setProperty(
      "border",
      "0",
      "important"
    );


    input.dataset.sulalatPlaceholderInit = "true";

  });

}

convertLabelsToPlaceholders();


    /* =========================================
       ADD CUSTOM CSS ONCE
       ========================================= */

    if (!shadow.querySelector("#sulalat-account-form-style")) {

      const style = document.createElement("style");

      style.id = "sulalat-account-form-style";

      style.textContent = `

        /* =====================================
           MAIN EMBED
           ===================================== */

        :host {
          display: block !important;
          width: 100% !important;
        }

        *{
          font-family: Roboto, sans-serif !important;
        }

        /* =====================================
           MAIN FORM CONTAINER
           ===================================== */

        [data-sizing="form-wrapper"],
        section[role="dialog"] {
          width: 100% !important;
          max-width: 1199px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          box-sizing: border-box !important;
          font-family: Roboto, sans-serif;
        }

        ._gridItem_1q1d2_172._gridItemContent_1q1d2_257 {
            padding: 0;
          }

          /* =====================================
          TITLE
          Same as .section-title h2
          ===================================== */

        h2._textHeading_2aowh_35 {
          margin-top: 0 !important;
          margin-bottom: 20px !important;
          color: #141211 !important;
          font-family: inherit !important;
          font-size: clamp(24px, 2vw, 36px) !important;
          font-weight: inherit !important;
          line-height: 1.2 !important;
          text-align:left !important;
        }

                /* =====================================
          SUBTITLE
          It's free and easy
          ===================================== */

        ._textBody_2aowh_10 p {
          color: #141211 !important;
          font-family: inherit !important;
          font-size: 16px !important;
          font-weight: 400 !important;
          line-height: 24px !important;
          letter-spacing: -0.01em !important;
          margin-top: 14px !important;
          margin-bottom: 0 !important;
          text-align:left !important;
        }


        /* =====================================
           FORM

           IMPORTANT:
           Do NOT make form itself a grid.
           ===================================== */

        form {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          max-width: 1199px !important;
          margin: 0 auto !important;
          padding: 0 !important;
          gap: 0 !important;
          text-align: left !important;
          box-sizing: border-box !important;
        }


        /* =====================================
           CUSTOM FIELD GRID
           Created by our JS
           ===================================== */

        .sulalat-account-fields {
          display: grid !important;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr) !important;

          column-gap: 12px !important;
          row-gap: 10px !important;
          width: 100% !important;
          margin: 26px 0 0 !important;
          box-sizing: border-box !important;
        }


        .sulalat-account-fields > * {
          width: 100% !important;
          min-width: 0 !important;

          margin: 0 !important;

          box-sizing: border-box !important;
        }


        /* Password stays half width */
        .sulalat-account-fields
        .sulalat-password-field {
          grid-column: 1 / 2 !important;
        }


        /* =====================================
           PASSWORD EYE TOGGLE
           ===================================== */

        /* =====================================
           INPUT DESIGN
           SAME AS SULALAT DASHBOARD
           ===================================== */

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"],
        input[type="number"],
        select {

          display: block !important;

          width: 100% !important;

          height: 50px !important;
          min-height: 50px !important;

          margin: 0 !important;

          padding: 10px 20px !important;

          border: 1px solid #E6E6E6 !important;
          border-radius: 999px !important;

          background: #ffffff !important;

          color: #141211 !important;

          font-family: inherit !important;
          font-size: 16px !important;
          font-weight: 400 !important;

          line-height: normal !important;

          outline: none !important;

          appearance: none !important;
          -webkit-appearance: none !important;

          box-shadow: none !important;

          box-sizing: border-box !important;

          transition:
            border-color .25s ease,
            box-shadow .25s ease !important;
        }


        input::placeholder {
          color: #9A9A9A !important;

          font-size: 16px !important;
          font-weight: 400 !important;

          opacity: 1 !important;
        }


        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        input[type="password"]:focus,
        input[type="number"]:focus,
        select:focus {

          border-color: #53C295 !important;

          box-shadow:
            0 0 0 2px rgba(83, 194, 149, .08) !important;
        }


        /* =====================================
           PASSWORD EYE TOGGLE
           (after input styles so padding wins)
           ===================================== */

        .sulalat-password-field,
        .sulalat-password-wrap {
          position: relative !important;
          width: 100% !important;
          display: block !important;
          overflow: visible !important;
        }

        .sulalat-password-wrap input,
        .sulalat-password-field input[data-sulalat-password-input],
        input[data-sulalat-password-input] {
          padding-right: 48px !important;
        }

        .sulalat-password-toggle {
          position: absolute !important;
          top: 50% !important;
          right: 16px !important;
          left: auto !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          width: 28px !important;
          height: 28px !important;
          min-width: 28px !important;
          min-height: 28px !important;
          margin: 0 !important;
          padding: 0 !important;
          border: 0 !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
          color: #8a8a8a !important;
          cursor: pointer !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 5 !important;
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }

        .sulalat-password-toggle:hover,
        .sulalat-password-toggle:focus,
        .sulalat-password-toggle:active {
          background: transparent !important;
          box-shadow: none !important;
          color: #8a8a8a !important;
        }

        .sulalat-password-toggle svg {
          width: 20px !important;
          height: 20px !important;
          display: block !important;
          pointer-events: none !important;
        }

        .sulalat-password-toggle .icon-hide {
          display: none !important;
        }

        .sulalat-password-toggle.is-visible .icon-show {
          display: none !important;
        }

        .sulalat-password-toggle.is-visible .icon-hide {
          display: block !important;
        }


        /* =====================================
           PHONE FIELD
           Hide Forms country flag dropdown
           ===================================== */

        .phone-country-selector,
        [class*="phone-country-selector"],
        [class*="formPhoneInputContainer"] [class*="selectToggle"],
        [class*="formPhoneInputContainer"] [class*="flagIcon"] {
          display: none !important;
          width: 0 !important;
          min-width: 0 !important;
          height: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
          border: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }

        [class*="formPhoneInputContainer"] {
          display: block !important;
          width: 100% !important;
          gap: 0 !important;
        }

        [class*="formPhoneInputContainer"] [class*="formFieldContainer"],
        [class*="formPhoneInputContainer"] input[type="tel"] {
          width: 100% !important;
        }

        input[type="tel"] {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }


        /* =====================================
           LABELS
           ===================================== */

        label {
          font-family: inherit !important;

          font-size: 14px !important;
          font-weight: 400 !important;

          color: #555555 !important;

          line-height: 1.4 !important;
        }

        /* =====================================
        SHOPIFY FLOATING LABEL FIX
        ===================================== */

      input[type="text"]:focus ~ label,
      input[type="email"]:focus ~ label,
      input[type="tel"]:focus ~ label,
      input[type="password"]:focus ~ label,
      input[type="number"]:focus ~ label {
        opacity: 0 !important;
        visibility: hidden !important;
      }

      /* Do not hide checkbox / terms labels */
      label:has(input[type="text"]:focus):not(:has(input[type="checkbox"])),
      label:has(input[type="email"]:focus):not(:has(input[type="checkbox"])),
      label:has(input[type="tel"]:focus):not(:has(input[type="checkbox"])),
      label:has(input[type="password"]:focus):not(:has(input[type="checkbox"])),
      label:has(input[type="number"]:focus):not(:has(input[type="checkbox"])) {
        opacity: 0 !important;
        visibility: hidden !important;
      }


        /* =====================================
           CHECKBOX
           ===================================== */

        input[type="checkbox"] {
          appearance: none !important;
          -webkit-appearance: none !important;

          position: relative !important;

          flex: 0 0 16px !important;

          width: 16px !important;
          height: 16px !important;

          min-width: 16px !important;
          min-height: 16px !important;

          margin: 2px 10px 0 0 !important;

          padding: 0 !important;

          border: 1px solid #D5D5D5 !important;
          border-radius: 2px !important;

          background: #ffffff !important;

          box-sizing: border-box !important;

          cursor: pointer !important;

          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
          clip: auto !important;
          clip-path: none !important;
        }


        input[type="checkbox"]:checked {
          border-color: #53C295 !important;
          background: #53C295 !important;
        }


        input[type="checkbox"]:checked::after {
          content: "" !important;

          position: absolute !important;

          left: 4.5px !important;
          top: 1px !important;

          width: 4px !important;
          height: 8px !important;

          border: solid #ffffff !important;

          border-width:
            0
            1.5px
            1.5px
            0 !important;

          transform: rotate(45deg) !important;
        }


        /* =====================================
           LINKS
           ===================================== */

        a,
        a span,
        [class*="Disclaimer"] a,
        [class*="disclaimer"] a,
        .sulalat-terms-field a,
        label a {
          color: #53C295 !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }


        a:hover,
        [class*="Disclaimer"] a:hover,
        .sulalat-terms-field a:hover,
        label a:hover {
          color: #53C295 !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        }


        /* =====================================
           SUBMIT BUTTON
           SAME DIRECTION AS .primary-btn
           ===================================== */

        button[type="submit"] {
          position: relative !important;

          isolation: isolate !important;
          overflow: hidden !important;

          display: inline-flex !important;

          justify-content: center !important;
          align-items: center !important;

          align-self: flex-start !important;

          width: auto !important;
          min-width: 0 !important;
          min-height: auto !important;

          margin: 26px 0 0 !important;

          padding: 11px 60px !important;

          border: 1px solid #53C295 !important;
          border-radius: 999px !important;

          background: #53C295 !important;

          color: #ffffff !important;

          font-family: inherit !important;

          font-size: 16px !important;
          font-weight: 500 !important;

          line-height: normal !important;

          text-decoration: none !important;

          box-shadow: none !important;

          cursor: pointer !important;

          transition:
            color .5s ease-in-out !important;
        }


        button[type="submit"]::before {
          content: "" !important;

          position: absolute !important;

          top: 0 !important;
          right: 0 !important;
          bottom: 0 !important;

          width: 0 !important;
          height: 100% !important;

          background: #ffffff !important;

          transition:
            width .5s ease-in-out !important;

          z-index: -1 !important;
        }


        button[type="submit"]:hover {
          color: #53C295 !important;
          background: #53C295 !important;
        }


        button[type="submit"]:hover::before {
          right: auto !important;
          left: 0 !important;

          width: 100% !important;
        }


        /* =====================================
           PRIVACY / TERMS
           ===================================== */

        .sulalat-terms-field,
        label:has(input[type="checkbox"]),
        [class*="Disclaimer"],
        [class*="disclaimer"],
        [class*="Consent"],
        [class*="consent"] {
          display: flex !important;
          align-items: flex-start !important;
          gap: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          margin: 22px 0 0 !important;
          padding: 0 !important;
          color: #555555 !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
          letter-spacing: -0.01em !important;
          font-family: Roboto, sans-serif !important;
          text-align: left !important;
          opacity: 1 !important;
          visibility: visible !important;
          order: 90 !important;
          grid-column: 1 / -1 !important;
        }

        .sulalat-terms-field input[type="checkbox"],
        label:has(input[type="checkbox"]) input[type="checkbox"],
        [class*="Disclaimer"] input[type="checkbox"],
        [class*="consent"] input[type="checkbox"] {
          display: inline-block !important;
          opacity: 1 !important;
          visibility: visible !important;
          flex-shrink: 0 !important;
        }

        .sulalat-terms-field a,
        label:has(input[type="checkbox"]) a,
        [class*="Disclaimer"] a,
        [class*="disclaimer"] a {
          color: #53C295 !important;
          text-decoration: none !important;
          font-weight: 400 !important;
          cursor: pointer !important;
        }

        .sulalat-terms-row {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          width: 100% !important;
        }

        .sulalat-terms-row__text {
          flex: 1 1 auto !important;
          min-width: 0 !important;
          color: #555555 !important;
          font-size: 14px !important;
          line-height: 1.5 !important;
        }

        .sulalat-terms-row__text a {
          color: #53C295 !important;
          text-decoration: none !important;
          cursor: pointer !important;
        }

        .sulalat-terms-row__text a:hover {
          text-decoration: underline !important;
          cursor: pointer !important;
        }

        button[type="submit"] {
          order: 100 !important;
        }

        /* =====================================
           VALIDATION ERRORS
           ===================================== */

        [class*="formError"],
        [class*="FormError"],
        output[class*="error" i] {
          display: block !important;
          width: 100% !important;
          margin: 6px 0 0 !important;
          padding: 0 !important;
          color: #e02229 !important;
          font-size: 13px !important;
          line-height: 1.35 !important;
          text-align: left !important;
          visibility: visible !important;
          opacity: 1 !important;
          order: 20 !important;
        }

        [class*="withError"],
        [class*="WithError"] {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
        }


        /* =====================================
           REMOVE UNWANTED TEXTAREA
           Only if Shopify generates an empty
           textarea in this account form
           ===================================== */

        textarea:empty {
          display: none !important;
        }

        


        /* =====================================
           TABLET / MOBILE
           ===================================== */

        @media screen and (max-width: 749px) {

          [data-sizing="form-wrapper"],
          section[role="dialog"],
          form {
            max-width: 100% !important;
          }


          .sulalat-account-fields {
            grid-template-columns: 1fr !important;

            column-gap: 0 !important;
            row-gap: 12px !important;

            margin-top: 22px !important;
          }


          .sulalat-account-fields
          .sulalat-password-field {
            grid-column: 1 !important;
          }


          input[type="text"],
          input[type="email"],
          input[type="tel"],
          input[type="password"],
          input[type="number"],
          select {
            height: 50px !important;
            min-height: 50px !important;

            padding: 10px 18px !important;

            font-size: 15px !important;
          }

          .sulalat-password-wrap input,
          input[data-sulalat-password-input] {
            padding-right: 48px !important;
          }


          input::placeholder {
            font-size: 15px !important;
          }


          button[type="submit"] {
            margin-top: 22px !important;

            padding: 11px 40px !important;

            font-size: 15px !important;
          }
        }

      `;

      shadow.appendChild(style);
    }


    /* =========================================
       BUILD FIELD GRID
       ========================================= */

    if (!form.querySelector(".sulalat-account-fields")) {

      /*
       * Find field wrappers using actual inputs.
       * This avoids relying on Shopify's generated
       * random class names.
       */

      const fields = Array.from(
        form.querySelectorAll(
          'input[type="text"], input[type="email"], input[type="tel"], input[type="password"], input[type="number"], select'
        )
      );


      const wrappers = [];


      fields.forEach(function (field) {

        let wrapper = field.parentElement;


        /*
         * Move upward until we reach the
         * Shopify field container directly
         * below the form.
         */
        while (
          wrapper &&
          wrapper.parentElement &&
          wrapper.parentElement !== form
        ) {

          wrapper = wrapper.parentElement;

        }


        if (
          wrapper &&
          wrapper !== form &&
          !wrappers.includes(wrapper)
        ) {

          wrappers.push(wrapper);

        }

      });


      if (wrappers.length) {

        const grid = document.createElement("div");

        grid.className = "sulalat-account-fields";


        /*
         * Insert grid where first field
         * originally existed.
         */
        wrappers[0].before(grid);


        wrappers.forEach(function (wrapper) {

          if (wrapper.querySelector("input") && isPasswordInput(wrapper.querySelector("input"), form)) {
            wrapper.classList.add("sulalat-password-field");
          }

          grid.appendChild(wrapper);

        });

      }

    }


    /* =========================================
       CLEAR DEFAULT PHONE COUNTRY CODE (+966)
       Forms re-injects the dial code after we clear
       it. Block setter + keep clearing silently
       until the user types a real number.
       ========================================= */

    function isBareDialCode(value) {
      var val = String(value || "").trim();
      /* +966, +966 , +1, etc. — dial code only */
      return /^\+\d{1,4}$/.test(val);
    }

    function stripFilledLabel(input) {
      var label = input.parentElement
        ? input.parentElement.querySelector("label")
        : null;
      if (!label || !label.className) return;
      label.className = String(label.className)
        .split(/\s+/)
        .filter(function (cls) {
          return (
            cls &&
            cls.indexOf("inputFilled") === -1 &&
            cls.indexOf("InputFilled") === -1
          );
        })
        .join(" ");
    }

    function lockPhoneValueSetter(input) {
      if (!input || input.dataset.sulalatPhoneLocked === "true") return;
      input.dataset.sulalatPhoneLocked = "true";

      var protoDesc = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value"
      );
      if (!protoDesc || !protoDesc.get || !protoDesc.set) return;

      Object.defineProperty(input, "value", {
        configurable: true,
        enumerable: true,
        get: function () {
          return protoDesc.get.call(this);
        },
        set: function (next) {
          if (
            this.dataset.sulalatPhoneUserEdited !== "true" &&
            isBareDialCode(next)
          ) {
            protoDesc.set.call(this, "");
            stripFilledLabel(this);
            return;
          }
          protoDesc.set.call(this, next);
        }
      });
    }

    function clearDefaultPhoneCode() {
      var phones = form.querySelectorAll(
        'input[type="tel"], #phone_number, input[id*="phone" i]'
      );

      Array.prototype.forEach.call(phones, function (input) {
        if (!input || input.dataset.sulalatPhoneUserEdited === "true") return;

        lockPhoneValueSetter(input);

        if (!isBareDialCode(input.value)) return;

        /* Set via prototype to avoid loops; do NOT fire events
           (Forms treats change as a cue to restore the dial code). */
        try {
          var protoDesc = Object.getOwnPropertyDescriptor(
            HTMLInputElement.prototype,
            "value"
          );
          if (protoDesc && protoDesc.set) protoDesc.set.call(input, "");
          else input.value = "";
        } catch (e) {
          input.value = "";
        }

        stripFilledLabel(input);
      });
    }

    function bindPhoneUserEditGuard() {
      var phones = form.querySelectorAll(
        'input[type="tel"], #phone_number, input[id*="phone" i]'
      );

      Array.prototype.forEach.call(phones, function (input) {
        lockPhoneValueSetter(input);

        if (input.dataset.sulalatPhoneGuard === "true") return;
        input.dataset.sulalatPhoneGuard = "true";

        function markEdited() {
          var val = (input.value || "").trim();
          if (val && !isBareDialCode(val)) {
            input.dataset.sulalatPhoneUserEdited = "true";
          } else if (isBareDialCode(val)) {
            try {
              var protoDesc = Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype,
                "value"
              );
              if (protoDesc && protoDesc.set) protoDesc.set.call(input, "");
              else input.value = "";
            } catch (e) {
              input.value = "";
            }
            stripFilledLabel(input);
          }
        }

        input.addEventListener("input", markEdited);
        input.addEventListener("change", markEdited);
        input.addEventListener("blur", markEdited);
        input.addEventListener("focus", function () {
          if (isBareDialCode(input.value)) {
            try {
              var protoDesc = Object.getOwnPropertyDescriptor(
                HTMLInputElement.prototype,
                "value"
              );
              if (protoDesc && protoDesc.set) protoDesc.set.call(input, "");
              else input.value = "";
            } catch (e) {
              input.value = "";
            }
            stripFilledLabel(input);
          }
        });
      });

      if (!form.dataset.sulalatPhoneClearTimer) {
        form.dataset.sulalatPhoneClearTimer = "true";
        var timer = setInterval(function () {
          clearDefaultPhoneCode();
          var stillWatching = false;
          Array.prototype.forEach.call(
            form.querySelectorAll(
              'input[type="tel"], #phone_number, input[id*="phone" i]'
            ),
            function (input) {
              if (input.dataset.sulalatPhoneUserEdited !== "true") {
                stillWatching = true;
              }
            }
          );
          if (!stillWatching) clearInterval(timer);
        }, 200);
      }
    }

    clearDefaultPhoneCode();
    bindPhoneUserEditGuard();


    /* =========================================
       PASSWORD EYE TOGGLE
       ========================================= */

    function initPasswordToggles() {

      findPasswordInputs(form).forEach(function (input) {

        /* Ensure it masks by default even if Forms used type=text */
        if (input.type !== "password" && !input.classList.contains("sulalat-password-revealed")) {
          input.type = "password";
        }

        input.setAttribute("data-sulalat-password-input", "");

        var fieldWrapper = input.closest(".sulalat-password-field") || input.closest(".sulalat-account-fields > *");
        if (fieldWrapper) fieldWrapper.classList.add("sulalat-password-field");

        var wrap = input.closest(".sulalat-password-wrap");
        if (!wrap) {
          wrap = document.createElement("div");
          wrap.className = "sulalat-password-wrap";
          input.parentNode.insertBefore(wrap, input);
          wrap.appendChild(input);
        }

        var btn = wrap.querySelector(".sulalat-password-toggle");
        if (btn) return;

        btn = document.createElement("button");
        btn.type = "button";
        btn.className = "sulalat-password-toggle";
        btn.setAttribute("aria-label", "Show password");
        btn.innerHTML =
          '<svg class="icon-show" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" stroke="currentColor" stroke-width="1.6"/>' +
          '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.6"/>' +
          "</svg>" +
          '<svg class="icon-hide" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<path d="M3 3l18 18M10.6 10.6A3 3 0 0012 15a3 3 0 002.4-4.8M9.9 5.1A10.4 10.4 0 0112 5c6.5 0 10 7 10 7a17.6 17.6 0 01-3.1 3.9M6.1 6.1A17.4 17.4 0 002 12s3.5 7 10 7c1.2 0 2.3-.2 3.4-.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>' +
          "</svg>";

        wrap.appendChild(btn);

        btn.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();

          var show = input.type === "password";
          input.type = show ? "text" : "password";
          input.classList.toggle("sulalat-password-revealed", show);
          btn.classList.toggle("is-visible", show);
          btn.setAttribute(
            "aria-label",
            show ? "Hide password" : "Show password"
          );
        });

      });

    }

    initPasswordToggles();


    /* =========================================
       TERMS / CHECKBOX ABOVE SUBMIT
       Forms disclaimer has no checkbox and its
       rich-text links often don't navigate.
       We build a reliable row ourselves.
       ========================================= */

    var POLICY_URL = "/policies/privacy-policy";

    function findDisclaimerElement(root) {
      var nodes = root.querySelectorAll("div, p, span, label, section");
      var best = null;
      var bestLen = Infinity;

      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        if (el.closest("[data-sulalat-terms-built]")) continue;

        var text = (el.textContent || "").replace(/\s+/g, " ").trim();
        var lower = text.toLowerCase();
        if (text.length < 20 || text.length > 350) continue;
        if (lower.indexOf("privacy") === -1) continue;
        if (lower.indexOf("terms") === -1 && lower.indexOf("agree") === -1) continue;
        if (el.querySelector('input:not([type="checkbox"]), button, select, textarea')) continue;

        if (text.length < bestLen) {
          bestLen = text.length;
          best = el;
        }
      }

      return best;
    }

    function hideOriginalDisclaimer() {
      var original = findDisclaimerElement(shadow) || findDisclaimerElement(form);
      if (!original) return;

      var hideTarget = original;
      while (
        hideTarget.parentElement &&
        hideTarget.parentElement !== form &&
        hideTarget.parentElement !== shadow &&
        (hideTarget.parentElement.textContent || "").replace(/\s+/g, " ").trim().length < 400 &&
        !hideTarget.parentElement.querySelector('button[type="submit"], input[type="email"], input[type="text"]')
      ) {
        hideTarget = hideTarget.parentElement;
      }

      hideTarget.setAttribute("data-sulalat-disclaimer-original", "true");
      hideTarget.style.setProperty("display", "none", "important");
    }

    function buildTermsRow() {
      var existing = form.querySelector("[data-sulalat-terms-built]");
      if (existing) return existing;

      var submit = form.querySelector('button[type="submit"]');
      if (!submit) return null;

      hideOriginalDisclaimer();

      var wrap = document.createElement("div");
      wrap.className = "sulalat-terms-field";
      wrap.setAttribute("data-sulalat-terms-built", "true");

      var row = document.createElement("div");
      row.className = "sulalat-terms-row";

      var checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.required = true;
      checkbox.setAttribute("data-sulalat-terms-checkbox", "true");
      checkbox.setAttribute("aria-label", "Agree to Terms and Privacy Policy");

      var text = document.createElement("div");
      text.className = "sulalat-terms-row__text";
      text.innerHTML =
        'By creating an account means you agree to the ' +
        '<a href="' + POLICY_URL + '" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>' +
        ', and our ' +
        '<a href="' + POLICY_URL + '" target="_blank" rel="noopener noreferrer">Privacy Policy</a>';

      row.appendChild(checkbox);
      row.appendChild(text);
      wrap.appendChild(row);
      form.insertBefore(wrap, submit);

      /* Keep link clicks from being swallowed by Forms handlers */
      wrap.addEventListener(
        "click",
        function (event) {
          var link = event.target && event.target.closest ? event.target.closest("a") : null;
          if (!link) return;
          event.stopPropagation();
          if (link.href) {
            event.preventDefault();
            window.open(link.href, "_blank", "noopener,noreferrer");
          }
        },
        true
      );

      return wrap;
    }

    function styleTermsRow(terms) {
      if (!terms) return;

      var box = terms.querySelector('input[type="checkbox"]');
      if (box) {
        box.style.setProperty("display", "inline-block", "important");
        box.style.setProperty("opacity", "1", "important");
        box.style.setProperty("visibility", "visible", "important");
        box.style.setProperty("position", "relative", "important");
        box.style.setProperty("width", "16px", "important");
        box.style.setProperty("height", "16px", "important");
        box.style.setProperty("cursor", "pointer", "important");
        box.style.setProperty("flex-shrink", "0", "important");
        box.style.setProperty("margin", "2px 0 0 0", "important");
      }

      Array.prototype.forEach.call(terms.querySelectorAll("a"), function (link) {
        if (!link.getAttribute("href") || link.getAttribute("href") === "#") {
          link.setAttribute("href", POLICY_URL);
        }
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        link.style.setProperty("color", "#53C295", "important");
        link.style.setProperty("text-decoration", "none", "important");
        link.style.setProperty("cursor", "pointer", "important");
        link.style.setProperty("pointer-events", "auto", "important");
      });
    }

    function positionTermsAboveSubmit() {
      var submit = form.querySelector('button[type="submit"]');
      if (!submit) return;

      var terms = buildTermsRow();
      styleTermsRow(terms);

      if (terms && terms.nextElementSibling !== submit) {
        form.insertBefore(terms, submit);
      }

      if (!form.dataset.sulalatTermsGuard) {
        form.dataset.sulalatTermsGuard = "true";
        form.addEventListener(
          "submit",
          function (event) {
            var agree = form.querySelector("[data-sulalat-terms-checkbox]");
            if (agree && !agree.checked) {
              event.preventDefault();
              event.stopPropagation();
              agree.focus();
            }
          },
          true
        );
      }
    }

    positionTermsAboveSubmit();


    /* =========================================
       VALIDATION MESSAGE FIX
       Moving fields into our grid detaches Forms
       error nodes. Re-attach under each invalid
       field and clarify generic copy.
       ========================================= */

    function fixEmailInputType() {
      var email = form.querySelector("#email, input[id*=\"email\" i]");
      if (!email) return;
      if (email.type !== "email" && !email.classList.contains("sulalat-password-revealed")) {
        email.type = "email";
        email.setAttribute("inputmode", "email");
        email.setAttribute("autocomplete", "email");
      }
    }

    function getFieldLabel(container, input) {
      if (!container && !input) return "Field";
      var label = container && container.querySelector("label");
      var text = label && label.textContent ? label.textContent.trim() : "";
      if (!text && input) {
        text = (input.getAttribute("aria-label") || input.placeholder || input.id || "").trim();
      }
      text = text.replace(/\s+/g, " ").replace(/\*+$/, "").trim();
      return text || "Field";
    }

    function resolveFieldContainer(input) {
      if (!input) return null;
      return (
        input.closest('[class*="formPhoneInputContainer"]') ||
        input.closest('[class*="formFieldContainer"]') ||
        input.closest(".sulalat-password-field") ||
        input.parentElement
      );
    }

    function getInvalidFieldContainers() {
      var containers = [];
      var seenContainers = new Set();
      var seenInputs = new Set();

      function addItem(input, preferredContainer) {
        if (!input || seenInputs.has(input)) return;
        var container = preferredContainer || resolveFieldContainer(input);
        if (!container || seenContainers.has(container)) return;
        seenInputs.add(input);
        seenContainers.add(container);
        containers.push({ container: container, input: input });
      }

      Array.prototype.forEach.call(
        form.querySelectorAll('[aria-invalid="true"]'),
        function (input) {
          addItem(input, resolveFieldContainer(input));
        }
      );

      Array.prototype.forEach.call(
        form.querySelectorAll('[class*="withError"]'),
        function (container) {
          var input = container.querySelector('input:not([type="checkbox"]), select, textarea');
          if (!input) return;
          addItem(input, resolveFieldContainer(input) || container);
        }
      );

      return containers;
    }

    function rewriteErrorText(errorEl, label, input) {
      var raw = (errorEl.textContent || "").trim();
      if (!raw) return;

      var lower = raw.toLowerCase();
      var isEmail = !!(input && (input.type === "email" || /email/i.test(input.id || "") || /email/i.test(label)));
      var isPhone = !!(input && (input.type === "tel" || /phone/i.test(input.id || "") || /phone/i.test(label)));

      if (isEmail && (lower === "email is invalid" || lower === "invalid email" || lower === "email is invalid.")) {
        errorEl.textContent = "Please enter a valid email address";
        return;
      }

      if (lower === "field is required" || lower === "this field is required" || lower === "required") {
        if (isPhone) {
          errorEl.textContent = "Phone number is required";
        } else if (isEmail) {
          errorEl.textContent = "E-mail Address is required";
        } else {
          errorEl.textContent = label + " is required";
        }
        return;
      }

      if (isEmail && lower === "email is required") {
        errorEl.textContent = "E-mail Address is required";
      }

      if (isPhone && (lower === "phone number is required" || lower === "phone is required")) {
        errorEl.textContent = "Phone number is required";
      }
    }

    function dedupeErrorsInContainer(container) {
      var errors = Array.prototype.slice.call(
        container.querySelectorAll('[class*="formError"], [class*="FormError"]')
      );
      if (errors.length < 2) return;

      var seen = new Set();
      errors.forEach(function (err, index) {
        var key = (err.textContent || "").trim().toLowerCase().replace(/\s+/g, " ");
        if (!key) {
          err.remove();
          return;
        }
        /* Treat "Phone Number is required" and "Phone number is required" as same */
        if (seen.has(key) || (key.indexOf("phone") !== -1 && key.indexOf("required") !== -1 && seen.has("__phone_required__"))) {
          err.remove();
          return;
        }
        if (key.indexOf("phone") !== -1 && key.indexOf("required") !== -1) {
          seen.add("__phone_required__");
          err.textContent = "Phone number is required";
        }
        seen.add(key);
      });
    }

    function relocateFormErrors() {
      fixEmailInputType();

      var invalid = getInvalidFieldContainers();
      if (!invalid.length) return;

      var orphanErrors = Array.prototype.filter.call(
        form.querySelectorAll('[class*="formError"], [class*="FormError"]'),
        function (err) {
          return !err.closest('[class*="formFieldContainer"], [class*="formPhoneInputContainer"], .sulalat-password-field');
        }
      );

      invalid.forEach(function (item) {
        var container = item.container;
        var input = item.input;
        var label = getFieldLabel(container, input);
        var existingErrors = container.querySelectorAll('[class*="formError"], [class*="FormError"]');
        var errorEl = existingErrors[0] || null;

        if (!errorEl && orphanErrors.length) {
          errorEl = orphanErrors.shift();
          container.appendChild(errorEl);
        }

        if (errorEl) {
          rewriteErrorText(errorEl, label, input);
          errorEl.style.setProperty("display", "block", "important");
          errorEl.style.setProperty("color", "#e02229", "important");
        }

        dedupeErrorsInContainer(container);
      });

      /* Drop any leftover orphan duplicates */
      orphanErrors.forEach(function (err) {
        err.remove();
      });
    }

    fixEmailInputType();
    relocateFormErrors();

    if (!shadow.__sulalatPasswordObserver) {
      shadow.__sulalatPasswordObserver = new MutationObserver(function () {
        initPasswordToggles();
        positionTermsAboveSubmit();
        fixEmailInputType();
        relocateFormErrors();
        clearDefaultPhoneCode();
        bindPhoneUserEditGuard();
      });
      shadow.__sulalatPasswordObserver.observe(shadow, {
        childList: true,
        subtree: true
      });
    }

    console.log(
      "Sulalat account form styling initialized"
    );

  }


  /* =========================================
     INITIAL LOAD
     ========================================= */

  initShopifyForm();

  


  /* =========================================
     SHOPIFY FORMS LOAD ASYNC
     ========================================= */

  const observer = new MutationObserver(function () {

    initShopifyForm();

  });


  observer.observe(document.body, {

    childList: true,
    subtree: true

  });

});

