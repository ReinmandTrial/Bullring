import { bodyUnlock, bodyLock } from '../base/utility.js'
import { reinvesSlider } from '../cabinet/reinvestPopup.js'
import { isHasClass } from '../base/utility.js'
const allPopupsBtn = document.querySelectorAll('[data-popup]')
const allPopups = document.querySelectorAll('.popup')

if (allPopups.length) {
   allPopupsBtn.forEach((btn) => {
      btn.addEventListener('click', () => runOpen(btn))
   })

   allPopups.forEach((popup) => {
      popup.addEventListener('click', runClose)
   })
}
export function runOpen(btn) {
   if (btn.dataset.popup === 'reinvestPopup') {
      reinvesSlider.enable()
   }
   openPopup(btn.dataset.popup)
}
export function runClose(el) {
   if (el.target.querySelector('#reinvestPopup') || el.target.closest('#reinvestPopup')) reinvesSlider.disable()
   if (isHasClass(el.target, 'popup__close-btn', 'popup', 'popup__body', 'popup-buttons__cancel')) {
      closePopup()
   }
}
export function openPopup(id) {
   document.getElementById(id).classList.add('_popup-open')
   bodyLock()
}
export function closePopup(mode) {
   if (mode) return allPopups.forEach((popup) => popup.classList.remove('_popup-open'))
   allPopups.forEach((popup) => popup.classList.remove('_popup-open'))
   bodyUnlock()
}
