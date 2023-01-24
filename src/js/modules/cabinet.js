import { debounce } from './utility.js'
import Hammer from 'hammerjs'

!(function copyRefLink() {
   const copuBlock = document.querySelectorAll('[data-copy-block]')
   copuBlock &&
      copuBlock.forEach((block) => {
         const copyBtn = block.querySelector('[data-copy-btn]')
         block.addEventListener('click', (el) => {
            if (el.target.hasAttribute('data-copy-btn')) {
               const copuValEl = block.querySelector('[data-copy-val]')
               navigator.clipboard.writeText(copuValEl.textContent)
               debCopy(copyBtn)
            }
         })
      })
   const debCopy = debounce((btn) => {
      btn.classList.add('_copied')
      setTimeout(() => {
         btn.classList.remove('_copied')
      }, 1000)
   })
})()

!(function calcStepTwoInit() {
   const compaundingEl = document.querySelector('.second-step')
   const compInputList = document.querySelectorAll('.compaunding-item__input')
   const compValueEl = document.querySelector('.second-step__value')
   const compMobilePersentEL = document.querySelector('.second-step__mobile-percent')
   const hammerManager = new Hammer.Manager(compaundingEl)
   hammerManager.add(new Hammer.Swipe())

   let curCompVal = 5

   render()

   compInputList &&
      compInputList.forEach((input) => {
         input.addEventListener('click', (el) => {
            curCompVal = el.target.dataset.compId
            render()
         })

         if (window.matchMedia('(max-width:575px)').matches) {
            input.disabled = true
         } else {
            input.disabled = false
         }
      })
   hammerManager.on('swipeleft', () => {
      if (window.matchMedia('(max-width: 767px)').matches && curCompVal > 1) {
         curCompVal--
         render()
      }
   })
   hammerManager.on('swiperight', () => {
      if (window.matchMedia('(max-width: 767px)').matches && curCompVal < 11) {
         curCompVal++
         render()
      }
   })
   function render() {
      for (let i = 0; i < 11; i++) {
         if (i < curCompVal) {
            compInputList[i].checked = true
         } else {
            compInputList[i].checked = false
         }
      }
      setMobilePercent()
      setCompVal()
   }
   function setMobilePercent() {
      compMobilePersentEL.textContent = document.querySelector(`[data-comp-id="${curCompVal}"]`).value
   }
   function setCompVal() {
      compValueEl.textContent = document.querySelector(`[data-comp-id="${curCompVal}"]`).dataset.compVal
   }
})()
