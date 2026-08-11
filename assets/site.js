/* Centro Estética Barcelona — JS mínimo (nav, scroll header, reveals, año) */
(function () {
  'use strict';
  var doc = document;

  /* --- header sticky con borde al hacer scroll --- */
  var header = doc.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* --- menú hamburguesa --- */
  var toggle = doc.querySelector('.nav-toggle');
  var nav = doc.getElementById('nav-principal');
  var closeNav = function () {
    if (!nav) return;
    nav.classList.remove('is-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    doc.body.style.overflow = '';
  };
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      doc.body.style.overflow = open && window.innerWidth <= 1024 ? 'hidden' : '';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* --- desplegables del menú --- */
  Array.prototype.forEach.call(doc.querySelectorAll('.nav-drop-toggle'), function (btn) {
    var parent = btn.closest('.nav-dropdown');
    btn.addEventListener('click', function () {
      var open = parent.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  doc.addEventListener('click', function (e) {
    if (e.target.closest('.nav-dropdown')) return;
    Array.prototype.forEach.call(doc.querySelectorAll('.nav-dropdown.is-open'), function (d) {
      d.classList.remove('is-open');
      var b = d.querySelector('.nav-drop-toggle');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  });

  /* --- animaciones de entrada --- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var items = doc.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    Array.prototype.forEach.call(items, function (el) { io.observe(el); });
  }

  /* --- año dinámico --- */
  var y = doc.getElementById('footerYear');
  if (y) y.textContent = new Date().getFullYear();
})();
