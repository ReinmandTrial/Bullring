import Swiper, { Pagination } from 'swiper'
import { openPopup, closePopup } from '../base/popup.js'

//ReivestSlider========================================================================================================================================================
export const reinvesSlider = new Swiper('.reivest-popup__slider', {
   modules: [Pagination],
   speed: 800,
   grabCursor: true,
   watchOverflow: true,
   slidesPerView: 5,
   spaceBetween: 15,
   breakpoints: {
      0: {
         slidesPerView: 1,
         spaceBetween: 15,
      },
      575: {
         slidesPerView: 2,
         spaceBetween: 15,
      },
      767: {
         spaceBetween: 0,
         slidesPerView: 10,
      },
   },
   pagination: {
      type: 'bullets',
      el: '.reivest-popup__pagination',
   },
})
reinvesSlider.disable()
//SwichPopup========================================================================================================================================================
const makeReinveBtn = document.querySelector('.withdrawal-big-popup__reinvest')
makeReinveBtn &&
   makeReinveBtn.addEventListener('click', () => {
      closePopup('withoutUnlock')
      openPopup('reinvestPopup')
      reinvesSlider.enable()
   })