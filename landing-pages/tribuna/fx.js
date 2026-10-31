/*
 * Tribuna — interações decorativas.
 * A balança do hero pende para o lado do cursor e volta ao equilíbrio quando ele sai;
 * sem mouse, ela oscila de leve com a rolagem. Sem este arquivo, a página fica completa e estática.
 */
(() => {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scale = document.querySelector('[data-scale]');
  if (!scale) return;

  const beam = scale.querySelector('[data-scale-beam]');
  const pans = Array.from(scale.querySelectorAll('[data-scale-pan]'));
  const MAX_TILT = 9; // graus

  // Os pratos giram ao contrário do travessão para continuarem pendurados na vertical.
  const tilt = (degrees) => {
    beam.style.transform = `rotate(${degrees}deg)`;
    pans.forEach((pan) => {
      pan.style.transform = `rotate(${-degrees}deg)`;
    });
  };

  const hero = scale.closest('.hero');
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (finePointer && hero) {
    hero.addEventListener('pointermove', (event) => {
      const rect = scale.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const distance = (event.clientX - center) / (window.innerWidth / 2);
      tilt(Math.max(-1, Math.min(1, distance)) * MAX_TILT);
    });
    hero.addEventListener('pointerleave', () => tilt(0));
  } else {
    let ticking = false;
    window.addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          tilt(Math.sin(window.scrollY / 120) * (MAX_TILT / 2));
          ticking = false;
        });
      },
      { passive: true }
    );
  }
})();
