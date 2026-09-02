const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer) {
  document.body.classList.add('has-custom-cursor');

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  let ringX = 0;
  let ringY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    dot.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
  });

  function animateRing() {
    ringX += (targetX - ringX) * 0.18;
    ringY += (targetY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  const interactiveSelector = 'a, button, input, textarea, [data-cursor-hover]';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('is-active');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('is-active');
    }
  });
}
