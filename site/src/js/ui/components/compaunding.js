import Hammer from 'hammerjs'

!(function initCompaunding() {
   const compaundinEl = document.querySelector('.compaunding')
   if (!compaundinEl) return
   //Start
   const swipeBlock = document.querySelector('[data-swipe-block]')
   const mobilePersent = document.querySelector('.second-step__mobile-percent')
   const progress = compaundinEl.querySelector('.compaunding__progress')
   const dotsListEl = Array.from(compaundinEl.querySelectorAll('.compaunding__dot'))
   const hammerManager = new Hammer.Manager(swipeBlock)
   hammerManager.add(new Hammer.Swipe())

   let activeDot = 4

   render()

   compaundinEl.addEventListener('click', (el) => {
      if (el.target.classList.contains('compaunding__dot')) {
         activeDot = +el.target.dataset.dotId
         render()
      }
   })
   hammerManager.on('swipeleft', () => {
      if (window.matchMedia('(max-width: 991px)').matches && activeDot > 0 && activeDot != 0) {
         activeDot--
         render()
      }
   })
   hammerManager.on('swiperight', () => {
      if (window.matchMedia('(max-width: 991px)').matches && activeDot < 10 && activeDot != 10) {
         activeDot++
         render()
      }
   })

   function render() {
      for (let i = 0; i < dotsListEl.length; i++) {
         if (+dotsListEl[i].dataset.dotId <= activeDot) {
            dotsListEl[i].classList.add('_active')
         } else {
            dotsListEl[i].classList.remove('_active')
         }
      }
      const activeEl = dotsListEl.find((dot) => +dot.dataset.dotId === activeDot)
      const activeVal = activeEl.dataset.dotVal
      progress.style.width = activeVal
      mobilePersent && (mobilePersent.textContent = activeVal)
   }
})()

