'use strict';

///////////////////////////////////////
////// APP JS
///////////////////////////////////////

////// SELECTORS
const header = document.querySelector('header');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

/////// COOKIES BANNER
const message = document.createElement('div');
message.classList.add('cookie-message');
message.style.backgroundColor = '#37383d';
message.innerHTML = `We use cookies for improved functionality and analytics.
  <button class="btn btn--close-cookie">Got it!</button>`;
header.before(message);
message.style.height = `${
  Number.parseInt(getComputedStyle(message).height) + 20
}px`;
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

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
