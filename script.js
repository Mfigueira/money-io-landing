'use strict';

////// SELECTORS
const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const allSections = document.querySelectorAll('.section');
const imgTargets = document.querySelectorAll('img[data-src]');

/////// MODALS
const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener(
  'keydown',
  e => e.key === 'Escape' && !modal.classList.contains('hidden') && closeModal()
);

/////// PAGE NAVIGATIONS
btnScrollTo.addEventListener('click', () =>
  section1.scrollIntoView({ behavior: 'smooth' })
);

// event delegation - bubbling (e.target is where the event originated)
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // matching strategy
  e.target.classList.contains('nav__link') &&
    document
      .querySelector(e.target.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
});

/////// TABS COMPONENT
tabsContainer.addEventListener('click', e => {
  e.preventDefault();
  // traverse DOM to get the button even when clicking on the span node inside the button
  const clicked = e.target.closest('.operations__tab');

  // Guard clause (modern and cleaner)
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////// MENU FADE NAVIGATION
const handleLinksHover = (e, opacity) => {
  e.preventDefault();
  const link = e.target;
  if (link.classList.contains('nav__link')) {
    const sibilings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav--logo');
    [...sibilings, logo].forEach(
      el => el !== link && (el.style.opacity = opacity)
    );
  }
};
nav.addEventListener('mouseover', e => handleLinksHover(e, 0.5));
nav.addEventListener('mouseout', e => handleLinksHover(e, 1));

/////// STICKY NAVIGATION

// OLD WAY
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', () => {
//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// MORE EFFICIENT
const handleStickyNav = entries => {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(handleStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
});

headerObserver.observe(header);

// reveal sections
const revealSection = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/////// Lazy loading images for improved performance
imgTargets.forEach(img => {
  img.src = img.dataset.src;
  img.addEventListener('load', () => img.classList.remove('lazy-img'));
});

///////////////////////////////////////
// Slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = () => {
    slides.forEach((_, i) =>
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      )
    );
  };

  const activateDot = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = slide =>
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );

  const nextSlide = () => {
    curSlide = curSlide === maxSlide - 1 ? 0 : ++curSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = () => {
    curSlide = curSlide === 0 ? maxSlide - 1 : --curSlide;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  // Init
  (() => {
    goToSlide(0);
    createDots();
    activateDot(0);
  })();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', e => {
    e.key === 'ArrowLeft' && prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', e => {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
