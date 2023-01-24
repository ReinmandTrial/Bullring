export function isWebp() {
   // Проверка поддержки webp
   function testWebP(callback) {
      let webP = new Image()
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2)
      }
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
   }
   testWebP(function (support) {
      let className = support === true ? 'webp' : 'no-webp'
      document.documentElement.classList.add(className)
   })
}
export function addLoadedClass() {
   if (!document.documentElement.classList.contains('loading')) {
      window.addEventListener('load', function () {
         setTimeout(function () {
            document.documentElement.classList.add('loaded')
         }, 0)
      })
   }
}
export function menuInit() {
   if (document.querySelector('.icon-menu')) {
      document.addEventListener('click', function (e) {
         if (bodyLockStatus && e.target.closest('.icon-menu')) {
            bodyLockToggle()
            document.documentElement.classList.toggle('menu-open')
         }
      })
   }
}
export function menuOpen() {
   bodyLock()
   document.documentElement.classList.add('menu-open')
}
export function menuClose() {
   bodyUnlock()
   document.documentElement.classList.remove('menu-open')
}
export let bodyLockStatus = true
export let bodyLockToggle = (delay = 500) => {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay)
   } else {
      bodyLock(delay)
   }
}
export let bodyUnlock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      setTimeout(() => {
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index]
            el.style.paddingRight = '0px'
         }
         body.style.paddingRight = '0px'
         document.documentElement.classList.remove('lock')
      }, delay)
      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
export let bodyLock = (delay = 500) => {
   let body = document.querySelector('body')
   if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll('[data-lp]')
      for (let index = 0; index < lock_padding.length; index++) {
         const el = lock_padding[index]
         el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      }
      body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
      document.documentElement.classList.add('lock')

      bodyLockStatus = false
      setTimeout(function () {
         bodyLockStatus = true
      }, delay)
   }
}
export function debounce(fn, timeout = 300) {
   let timerId = null
   return (...rest) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => fn(...rest), timeout)
   }
}
