import { isHasClass } from '../base/utility.js'

const langBlockEl = document.querySelector('.languages')
langBlockEl &&
   !(function initLang() {
      langBlockEl.addEventListener('click', (el) => {
         if (el.target.classList.contains('languages__head')) {
            langBlockEl.classList.toggle('_open-lang')
         }
         if (el.target.classList.contains('languages__item')) {
            langBlockEl.querySelector('.languages__item._active').classList.remove('_active')
            el.target.classList.add('_active')
            langBlockEl.classList.remove('_open-lang')
         }
      })
      document.addEventListener('click', (el) => {
         if (!isHasClass(el.target, 'languages', 'languages__head', 'languages__body', 'languages__item')) {
            langBlockEl.classList.remove('_open-lang')
         }
      })
   })()
