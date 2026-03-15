/**
 * Lion Street Learning — main.js
 * Handles: mobile nav, sticky header, scroll reveal, FAQ accordion, counter animation
 */

(function () {
  'use strict';

  // ── Element references ──────────────────────────────────
  const nav         = document.getElementById('main-nav');
  const hamburger   = document.querySelector('.nav__hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');

  // ── Mobile Navigation Toggle ────────────────────────────
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on mobile link click
    mobileMenu.querySelectorAll('.nav__mobile-link').forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (
        mobileMenu.classList.contains('open') &&
        !nav.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
        hamburger.focus();
      }
    });
  }

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // ── Sticky / Scrolled Nav ───────────────────────────────
  if (nav) {
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on load
  }

  // ── Active Nav Link (based on current page) ─────────────
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link, .nav__mobile-link').forEach(link => {
    const href = link.getAttribute('href');
    // Skip CTA links (e.g. #contact)
    if (!href || href.startsWith('#')) return;
    const linkFile = href.split('/').pop().split('#')[0];
    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Scroll Reveal (Intersection Observer) ───────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── FAQ Accordion ────────────────────────────────────────
  document.querySelectorAll('.faq__question').forEach(question => {
    question.addEventListener('click', () => {
      const item   = question.closest('.faq__item');
      const answer = item.querySelector('.faq__answer');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.faq__item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq__answer').hidden = true;
        openItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isOpen) {
        item.classList.add('open');
        answer.hidden = false;
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ── Animated Counter ─────────────────────────────────────
  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const steps    = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      el.textContent = current + suffix;
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stats__number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  // ── Smooth Scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = nav ? nav.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Contact Form — Web3Forms submission ──────────────────
  const form        = document.querySelector('.contact-form');
  const modal       = document.getElementById('success-modal');
  const modalClose  = document.getElementById('modal-close');
  const modalCta    = document.getElementById('modal-cta');

  function openModal() {
    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add('visible'));
    document.body.style.overflow = 'hidden';
    modalCta.focus();
  }

  function closeModal() {
    modal.classList.remove('visible');
    document.body.style.overflow = '';
    setTimeout(() => { modal.hidden = true; }, 300);
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCta)   modalCta.addEventListener('click', closeModal);

  // Close on backdrop click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending…';

      try {
        const data = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: data,
        });

        const result = await response.json();

        if (result.success) {
          form.reset();
          openModal();
        } else {
          throw new Error(result.message || 'Submission failed.');
        }
      } catch (err) {
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Something went wrong — please try again.';
        submitBtn.style.backgroundColor = '#e05252';
        console.error('Form error:', err);
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 5000);
        return;
      }

      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    });
  }

})();
