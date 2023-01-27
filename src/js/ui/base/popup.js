import { bodyUnlock, bodyLock } from '../base/utility.js'
import { reinvesSlider } from '../cabinet/cabinetPopups.js'
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
   if (isHasClass(el.target, 'popup__close-btn', 'popup', 'popup__body', 'popup-buttons__cancel')) {
      closePopup()
      reinvesSlider.disable()
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
export function isHasClass(el, ...arg) {
   for (let i = 0; i < arg.length; i++) {
      if (!el.classList.contains(arg[i])) continue
      return arg[i]
   }
}
