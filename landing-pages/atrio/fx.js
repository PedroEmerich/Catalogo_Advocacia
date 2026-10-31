/*
 * Átrio — interações decorativas.
 * Luz dourada que acompanha o cursor no hero, numerais romanos que deslizam com a rolagem
 * e atalhos do hero que já abrem a aba da área escolhida.
 * Sem este arquivo, a página fica completa e estática.
 */
(() => {
  'use strict';

  // Atalhos "01 Trabalhista…" do hero selecionam a aba correspondente.
  document.querySelectorAll('[data-area-link]').forEach((link) => {
    link.addEventListener('click', () => document.getElementById(link.dataset.areaLink)?.click());
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const hero = document.querySelector('[data-spotlight]');
  const glow = hero?.querySelector('.hero__glow');
  if (hero && glow && window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', (event) => {
      const rect = hero.getBoundingClientRect();
      glow.style.setProperty('--x', `${((event.clientX - rect.left) / rect.width) * 100}%`);
      glow.style.setProperty('--y', `${((event.clientY - rect.top) / rect.height) * 100}%`);
    });
  }

  const numerals = Array.from(document.querySelectorAll('[data-drift]'));
  if (!numerals.length) return;

  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    numerals.forEach((el) => {
      const rect = el.parentElement.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1 … 1 enquanto atravessa a tela
      el.style.setProperty('--drift', `${Math.max(-1, Math.min(1, progress)) * 40}px`);
    });
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
})();
