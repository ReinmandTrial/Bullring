import Hammer from 'hammerjs'

const compList = document.querySelectorAll('[data-comp]')

compList &&
   compList.forEach((comp) => {
      initCompaunding(comp)
   })

function initCompaunding(comp) {
   const compVal = comp.querySelector('[data-comp-val]')
   const progress = comp.querySelector('.compaunding__progress')
   const dotsListEl = Array.from(comp.querySelectorAll('.compaunding__dot'))
   const hammerManager = new Hammer.Manager(comp)
   hammerManager.add(new Hammer.Swipe())

   let activeDot = 4

   render()

   comp.addEventListener('click', (el) => {
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

   compVal.addEventListener('input', (el) => {
      const t = el.target
      const val = t.value.replace(/[^\d.]/g, '')
      val > 100 ? (t.value = val.slice(0, -1)) : (t.value = val)
      if (val[0] == 0) t.value = 0
      if (val <= 100) activeDot = Math.trunc(val / 10)
      render(1, t.value)
   })
   compVal.addEventListener('blur', (el) => {
      if (el.target.value === '') {
         el.target.value = '0%'
         return
      }
      if (el.target.value[el.target.value.length - 1] !== '%') {
         el.target.value = el.target.value + '%'
      }
   })
   compVal.addEventListener('focus', (el) => {
      el.target.value = el.target.value.replace(/[/%$]/g, '')
   })

   function render(mode, val) {
      for (let i = 0; i < dotsListEl.length; i++) {
         if (+dotsListEl[i].dataset.dotId <= activeDot) {
            dotsListEl[i].classList.add('_active')
         } else {
            dotsListEl[i].classList.remove('_active')
         }
      }
      const activeEl = dotsListEl.find((dot) => +dot.dataset.dotId === activeDot)
      const activeVal = activeEl.dataset.dotVal
      mode ? (progress.style.width = val + '%') : (progress.style.width = activeVal + '%')
      if (!mode) compVal.value = activeVal + '%'
   }
}
