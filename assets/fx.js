/*
 * Interações da página: balança com física de mola no hero (segue o cursor),
 * cena de rolagem em que provas, lei e estratégia equilibram a balança,
 * estante de livros que reage ao cursor e abre no artigo da lei,
 * luz que acompanha o cursor e barra de progresso de leitura.
 * Sem este arquivo, a página continua completa: a balança aparece equilibrada
 * e todos os artigos ficam visíveis.
 */
(() => {
  'use strict';

  const root = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  root.classList.add('fx');

  /* Estante de livros (funcional: roda mesmo com "reduzir movimento") ---- */

  const shelf = document.querySelector('[data-shelf]');
  if (shelf) {
    const books = Array.from(shelf.querySelectorAll('[data-book]'));
    const pages = books.map((book) => document.getElementById(book.dataset.book));

    const open = (index) => {
      books.forEach((book, i) => {
        const active = i === index;
        book.setAttribute('aria-pressed', String(active));
        if (active) book.style.removeProperty('--lift');
        pages[i].hidden = !active;
      });
    };
    books.forEach((book, i) => book.addEventListener('click', () => open(i)));

    // Os livros se inclinam e sobem conforme o cursor passa por perto.
    if (finePointer && !reduceMotion) {
      const RANGE = 150;
      shelf.addEventListener('pointermove', (event) => {
        books.forEach((book) => {
          const rect = book.getBoundingClientRect();
          const offset = event.clientX - (rect.left + rect.width / 2);
          const near = Math.max(0, 1 - Math.abs(offset) / RANGE);
          book.style.setProperty('--tilt', `${clamp(offset / RANGE, -1, 1) * -4 * near}deg`);
          if (book.getAttribute('aria-pressed') !== 'true') book.style.setProperty('--lift', (near * 18).toFixed(1));
        });
      });
      shelf.addEventListener('pointerleave', () => {
        books.forEach((book) => {
          book.style.removeProperty('--tilt');
          book.style.removeProperty('--lift');
        });
      });
    }
  }

  if (reduceMotion) return;

  /* Progresso de leitura no cabeçalho ------------------------------------ */

  const progress = document.querySelector('[data-progress]');

  /* Balança com física de mola ------------------------------------------- */

  // Cada balança tem um travessão (data-beam) que gira no ponto de apoio e
  // pratos (data-pan) que giram ao contrário para continuarem pendurados,
  // com um leve balanço que acompanha a velocidade do travessão.
  const createScale = (svg, pivot) => {
    const beam = svg.querySelector('[data-beam]');
    const pans = Array.from(svg.querySelectorAll('[data-pan]'));
    const state = { angle: 0, velocity: 0, target: 0, swing: 0, swingVelocity: 0 };

    const step = (dt) => {
      const acceleration = 90 * (state.target - state.angle) - 9 * state.velocity;
      state.velocity += acceleration * dt;
      state.angle += state.velocity * dt;

      const swingTarget = clamp(-state.velocity * 0.12, -14, 14);
      const swingAcceleration = 60 * (swingTarget - state.swing) - 6 * state.swingVelocity;
      state.swingVelocity += swingAcceleration * dt;
      state.swing += state.swingVelocity * dt;

      beam.setAttribute('transform', `rotate(${state.angle.toFixed(3)} ${pivot[0]} ${pivot[1]})`);
      pans.forEach((pan) => pan.setAttribute('transform', `rotate(${(-state.angle + state.swing).toFixed(3)})`));
    };

    return { state, step };
  };

  const loops = new Set();
  let last = performance.now();
  const tick = (now) => {
    const dt = Math.min((now - last) / 1000, 1 / 30);
    last = now;
    loops.forEach((loop) => loop(dt, now));
    requestAnimationFrame(tick);
  };

  // Só anima o que está na tela.
  const runWhileVisible = (element, loop) => {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? loops.add(loop) : loops.delete(loop)));
    }).observe(element);
  };

  /* Hero: a balança pende para o lado do cursor -------------------------- */

  const hero = document.querySelector('[data-hero]');
  const heroSvg = document.querySelector('[data-scale="hero"]');
  if (hero && heroSvg) {
    const scale = createScale(heroSvg, [200, 74]);
    const glow = hero.querySelector('.hero__glow');
    let pointerActive = false;

    if (finePointer) {
      hero.addEventListener('pointermove', (event) => {
        pointerActive = true;
        const rect = heroSvg.getBoundingClientRect();
        const offset = (event.clientX - (rect.left + rect.width / 2)) / (window.innerWidth / 2);
        scale.state.target = clamp(offset, -1, 1) * 13;

        const heroRect = hero.getBoundingClientRect();
        glow?.style.setProperty('--x', `${((event.clientX - heroRect.left) / heroRect.width) * 100}%`);
        glow?.style.setProperty('--y', `${((event.clientY - heroRect.top) / heroRect.height) * 100}%`);
      });
      hero.addEventListener('pointerleave', () => {
        pointerActive = false;
        scale.state.target = 0;
      });
      // Um clique "empurra" a balança.
      heroSvg.closest('.hero__scale').addEventListener('click', () => {
        scale.state.velocity += scale.state.angle >= 0 ? -60 : 60;
      });
    }

    runWhileVisible(hero, (dt, now) => {
      // Sem cursor (celular ou mouse fora), a balança oscila de leve, como se respirasse.
      if (!pointerActive) scale.state.target = Math.sin(now / 1400) * 4;
      scale.step(dt);
    });
  }

  /* Cena de rolagem: provas, lei e estratégia equilibram a balança ------- */

  const scene = document.querySelector('[data-balance]');
  const sceneSvg = document.querySelector('[data-scale="scene"]');
  if (scene && sceneSvg) {
    const scale = createScale(sceneSvg, [200, 74]);
    const weights = Array.from(sceneSvg.querySelectorAll('[data-weight]'));
    const steps = Array.from(scene.querySelectorAll('[data-balance-step]'));
    const MAX_TILT = -16; // negativo: o prato esquerdo (o problema) fica embaixo
    const easeOutBack = (t) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;

    runWhileVisible(scene, (dt) => {
      const rect = scene.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 0 ? clamp(-rect.top / travel, 0, 1) : 1;

      let placed = 0;
      weights.forEach((weight, i) => {
        const t = clamp((p - (0.16 + i * 0.24)) / 0.14, 0, 1);
        placed += t;
        weight.setAttribute('transform', `translate(0 ${(-(1 - easeOutBack(t)) * 260).toFixed(1)})`);
        weight.style.opacity = t > 0 ? 1 : 0;
      });

      const active = weights.filter((_, i) => p >= 0.16 + i * 0.24).length;
      steps.forEach((stepEl, i) => {
        stepEl.classList.toggle('is-active', i === active);
        stepEl.classList.toggle('is-done', i < active);
      });

      scale.state.target = MAX_TILT * (1 - placed / weights.length);
      scale.step(dt);
    });
  }

  /* Barra de progresso ---------------------------------------------------- */

  if (progress) {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
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
  }

  requestAnimationFrame(tick);
})();
