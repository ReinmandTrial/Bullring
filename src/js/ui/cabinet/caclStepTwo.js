import Hammer from 'hammerjs'

!(function calcStepTwoInit() {
   const compaundingEl = document.querySelector('.second-step')
   if (!compaundingEl) return

   const compInputList = document.querySelectorAll('.compaunding-item__input')
   const compValueEl = document.querySelector('.second-step__value')
   const compMobilePersentEL = document.querySelector('.second-step__mobile-percent')
   const hammerManager = new Hammer.Manager(compaundingEl)
   hammerManager.add(new Hammer.Swipe())

   let curCompVal = 5

   render()

   compInputList.forEach((input) => {
      input.addEventListener('click', (el) => {
         curCompVal = el.target.dataset.compId
         render()
      })
   })
   window.addEventListener('resize', (el) => {
      if (el.target.innerWidth > 575) {
         compInputList.forEach((el) => {
            el.disabled = false
         })
      } else {
         compInputList.forEach((el) => {
            el.disabled = true
         })
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
