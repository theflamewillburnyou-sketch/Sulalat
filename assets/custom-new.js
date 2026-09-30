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

  const BLOCK_SELECTOR =
    "#shopify-block-AY3hpdVFSOENGeEpOW__forms_inline_XiaxHt";

  function initShopifyForm() {
    const block = document.querySelector(BLOCK_SELECTOR);

    if (!block) {
      setTimeout(initShopifyForm, 300);
      return;
    }

    const formEmbed = block.querySelector("shopify-forms-embed");

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
           PHONE COUNTRY CODE
           ===================================== */

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

      label:has(input:focus) {
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

          margin: 0 8px 0 0 !important;

          padding: 0 !important;

          border: 1px solid #D5D5D5 !important;
          border-radius: 2px !important;

          background: #ffffff !important;

          box-sizing: border-box !important;

          cursor: pointer !important;
        }


        input[type="checkbox"]:checked {
          border-color: #53C295 !important;
          background: #ffffff !important;
        }


        input[type="checkbox"]:checked::after {
          content: "" !important;

          position: absolute !important;

          left: 4px !important;
          top: 1px !important;

          width: 4px !important;
          height: 8px !important;

          border: solid #53C295 !important;

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

        a {
          color: #53C295 !important;
          text-decoration: none !important;
        }


        a:hover {
          color: #53C295 !important;
          text-decoration: underline !important;
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

        .sulalat-terms-field {
          width: 100% !important;

          margin-top: 26px !important;

          grid-column: 1 / -1 !important;
        }

        ._formDisclaimer_jnbzb_38 {
          color: #141211 !important;
          font-size: 16px !important;
          line-height: 24px !important;
          letter-spacing: -0.01em !important;
          text-decoration: none !important;
          font-family: Roboto, sans-serif;
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

          const passwordInput =
            wrapper.querySelector('input[type="password"]');


          if (passwordInput) {

            wrapper.classList.add(
              "sulalat-password-field"
            );

          }


          grid.appendChild(wrapper);

        });

      }

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

