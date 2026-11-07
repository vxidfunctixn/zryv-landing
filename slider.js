const slider = document.querySelector('[data-slider]');

if (slider) {
  const slides = [...slider.querySelectorAll('.product-slide')];
  const dots = [...slider.querySelectorAll('[data-slide]')];
  const status = slider.querySelector('.slider-status');
  let current = 0;
  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('.lightbox-image');

  function updatePreview() {
    const image = slides[current].querySelector('img');
    lightboxImage.src = slides[current].href;
    lightboxImage.alt = image.alt;
    lightbox.setAttribute('aria-label', `Podgląd ${current + 1} z ${slides.length} — ${dots[current].getAttribute('aria-label')}`);
  }

  function enlarge() {
    updatePreview();
    lightbox.showModal();
  }

  slides.forEach((slide) => slide.addEventListener('click', (event) => {
    event.preventDefault();
    enlarge();
  }));
  slider.querySelector('[data-enlarge]').addEventListener('click', enlarge);
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.querySelector('[data-lightbox-prev]').addEventListener('click', () => show(current - 1));
  lightbox.querySelector('[data-lightbox-next]').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
      dots[i].setAttribute('aria-pressed', String(active));
    });
    status.textContent = `${current + 1} / ${slides.length} — ${dots[current].getAttribute('aria-label')}`;
    if (lightbox.open) updatePreview();
  }

  slider.querySelector('[data-prev]').addEventListener('click', () => show(current - 1));
  slider.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
  dots.forEach((dot, index) => dot.addEventListener('click', () => show(index)));
  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
      if (event.target.matches('.product-slide')) slides[current].focus();
    }
  });
}
