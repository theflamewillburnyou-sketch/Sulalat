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
      var heading = section.querySelector('h2');
      var subtitle = section.querySelector('p');

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

      if (subtitle) {
        gsap.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.25,
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
