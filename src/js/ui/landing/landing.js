import Swiper, { Pagination } from 'swiper'

//LandingCalsSLider========================================================================================================================================================
!(function initLandinCalcSlider() {
   const swiperEl = document.querySelector('.landing-calc__first-step-slider')
   if (swiperEl) {
      new Swiper(swiperEl, {
         modules: [Pagination],
         speed: 300,
         grabCursor: true,
         watchOverflow: true,
         slidesPerView: 5,
         spaceBetween: 15,
         breakpoints: {
            0: {
               slidesPerView: 1.1,
               spaceBetween: 15,
               centeredSlides: true,
            },
            575: {
               slidesPerView: 2,
               spaceBetween: 15,
            },
            767.98: {
               spaceBetween: 0,
               slidesPerView: 10,
            },
         },
         pagination: {
            type: 'bullets',
            el: '.landing-calc__first-step-slider-bullets',
         },
      })
   }
})()

