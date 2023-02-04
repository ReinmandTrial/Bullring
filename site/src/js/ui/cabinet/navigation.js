import { menuClose } from '../base/utility.js'

!(function cabinetNavigation() {
   const navListBtnEl = document.querySelectorAll('[data-nav-cabinet-btn]')
   const navListBodyEl = document.querySelectorAll('[data-cabinet-body]')
   const referalBtn = document.querySelector('[data-link="2"]')

   if (navListBtnEl && navListBodyEl && referalBtn) {
      navListBtnEl.forEach((btn) => {
         btn.addEventListener('click', (el) => {
            if (el.target.hasAttribute('data-nav-cabinet-btn') && !el.target.classList.contains('_active-nav')) {
               resetCabinet(navListBtnEl, '_active-nav')
               resetCabinet(navListBodyEl, '_active-body')
               btn.classList.add('_active-nav')
               const curBody = document.querySelector(`[data-cabinet-body = '${btn.dataset.navCabinetBtn}']`)
               curBody.classList.add('_active-body')
               menuClose()
            }
         })
      })
      referalBtn.addEventListener('click', () => {
         resetCabinet(navListBtnEl, '_active-nav')
         resetCabinet(navListBodyEl, '_active-body')
         document.querySelector('[data-nav-cabinet-btn = "2"]').classList.add('_active-nav')
         document.querySelector('[data-cabinet-body = "2"]').classList.add('_active-body')
      })
   }

   function resetCabinet(arr, state) {
      arr.forEach((btn) => {
         btn.classList.remove(state)
      })
   }
})()
