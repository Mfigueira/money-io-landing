///////////////////////////////////////
////// EXPERIMENTAL JS
///////////////////////////////////////

// // CHANGING STYLES FOR THE :root SELECTOR - GLOBAL CSS VARIABLES
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // WORKING WITH ATTRIBUTTES FROM HTML
// const logo = document.querySelector('.nav__logo');
// logo.alt = 'App logo';
// logo.setAttribute('alt', 'MoneyIO logo');
// console.log(logo.src);
// // !==
// console.log(logo.getAttribute('src'));
// console.log(logo.dataset.versionNumber);

// // SCROLL BEHAVIORS
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', e => {
//   // DOM Node coordinates
//   const s1coords = section1.getBoundingClientRect();

//   // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
//   // console.log(
//   //   'height/width viewport',
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );

//   // SCROLL WITHOUT TRANSITION
//   // window.scrollTo(
//   //   s1coords.left + window.pageXOffset,
//   //   s1coords.top + window.pageYOffset
//   // );

//   // SCROLL WITH TRANSITION - OLD WAY, OLD BROWSERS
//   // window.scrollTo({
//   //   left: s1coords.left + window.pageXOffset,
//   //   top: s1coords.top + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });

//   section1.scrollIntoView({ behavior: 'smooth' });
// });
