const burger = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}
