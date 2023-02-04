export let bodyLockStatus = true

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
export let bodyLockToggle = (delay = 300) => {
   if (document.documentElement.classList.contains('lock')) {
      bodyUnlock(delay)
   } else {
      bodyLock(delay)
   }
}
export let bodyUnlock = (delay = 300) => {
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
export let bodyLock = (delay = 300) => {
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
export function isHasClass(el, ...arg) {
   for (let i = 0; i < arg.length; i++) {
      if (!el.classList.contains(arg[i])) continue
      return arg[i]
   }
}
export function pageNavigation() {
   // data-goto - Куда ехать
   // data-goto-header - Учитывать Хедер
   // data-goto-top - На сколько не докрутить
   document.addEventListener('click', pageNavigationAction)
   function pageNavigationAction(e) {
      if (e.type === 'click') {
         const targetElement = e.target
         if (targetElement.closest('[data-goto]')) {
            const gotoLink = targetElement.closest('[data-goto]')
            const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : ''
            const noHeader = gotoLink.hasAttribute('data-goto-header') ? true : false
            const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500
            const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0
            gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop)
            e.preventDefault()
         }
      }
   }
}
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
   const targetBlockElement = document.querySelector(targetBlock)
   if (targetBlockElement) {
      let headerItem = ''
      let headerItemHeight = 0
      if (noHeader) {
         headerItem = 'header.header'
         const headerElement = document.querySelector(headerItem)
         if (!headerElement.classList.contains('_header-scroll')) {
            headerElement.style.cssText = `transition-duration: 0s;`
            headerElement.classList.add('_header-scroll')
            headerItemHeight = headerElement.offsetHeight
            headerElement.classList.remove('_header-scroll')
            setTimeout(() => {
               headerElement.style.cssText = ``
            }, 0)
         } else {
            headerItemHeight = headerElement.offsetHeight
         }
      }
      document.documentElement.classList.contains('menu-open') ? menuClose() : null

      let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY
      targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition
      targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition
      window.scrollTo({
         top: targetBlockElementPosition,
         behavior: 'smooth',
      })
   }
}
export function showMore() {
   window.addEventListener('load', function (e) {
      const showMoreBlocks = document.querySelectorAll('[data-showmore]')
      let showMoreBlocksRegular
      let mdQueriesArray
      if (showMoreBlocks.length) {
         showMoreBlocksRegular = Array.from(showMoreBlocks).filter(function (item, index, self) {
            return !item.dataset.showmoreMedia
         })
         showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null

         document.addEventListener('click', showMoreActions)
         window.addEventListener('resize', showMoreActions)
         mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia')
         if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach((mdQueriesItem) => {
               // Подія
               mdQueriesItem.matchMedia.addEventListener('change', function () {
                  initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
               })
            })
            initItemsMedia(mdQueriesArray)
         }
      }
      function initItemsMedia(mdQueriesArray) {
         mdQueriesArray.forEach((mdQueriesItem) => {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
         })
      }
      function initItems(showMoreBlocks, matchMedia) {
         showMoreBlocks.forEach((showMoreBlock) => {
            initItem(showMoreBlock, matchMedia)
         })
      }
      function initItem(showMoreBlock, matchMedia = false) {
         showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock
         let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]')
         let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]')
         showMoreContent = Array.from(showMoreContent).filter((item) => item.closest('[data-showmore]') === showMoreBlock)[0]
         showMoreButton = Array.from(showMoreButton).filter((item) => item.closest('[data-showmore]') === showMoreBlock)[0]
         const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
         if (matchMedia.matches || !matchMedia) {
            if (hiddenHeight < getOriginalHeight(showMoreContent)) {
               _slideUp(showMoreContent, 0, hiddenHeight)
               showMoreButton.hidden = false
            } else {
               _slideDown(showMoreContent, 0, hiddenHeight)
               showMoreButton.hidden = true
            }
         } else {
            _slideDown(showMoreContent, 0, hiddenHeight)
            showMoreButton.hidden = true
         }
      }
      function getHeight(showMoreBlock, showMoreContent) {
         let hiddenHeight = 0
         const showMoreType = showMoreBlock.dataset.showmore ? showMoreBlock.dataset.showmore : 'size'
         if (showMoreType === 'items') {
            const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 3
            const showMoreItems = showMoreContent.children
            for (let index = 1; index < showMoreItems.length; index++) {
               const showMoreItem = showMoreItems[index - 1]
               hiddenHeight += showMoreItem.offsetHeight
               if (index == showMoreTypeValue) break
            }
         } else {
            const showMoreTypeValue = showMoreContent.dataset.showmoreContent ? showMoreContent.dataset.showmoreContent : 150
            hiddenHeight = showMoreTypeValue
         }
         return hiddenHeight
      }
      function getOriginalHeight(showMoreContent) {
         let parentHidden
         let hiddenHeight = showMoreContent.offsetHeight
         showMoreContent.style.removeProperty('height')
         if (showMoreContent.closest(`[hidden]`)) {
            parentHidden = showMoreContent.closest(`[hidden]`)
            parentHidden.hidden = false
         }
         let originalHeight = showMoreContent.offsetHeight
         parentHidden ? (parentHidden.hidden = true) : null
         showMoreContent.style.height = `${hiddenHeight}px`
         return originalHeight
      }
      function showMoreActions(e) {
         const targetEvent = e.target
         const targetType = e.type
         if (targetType === 'click') {
            if (targetEvent.closest('[data-showmore-button]')) {
               const showMoreButton = targetEvent.closest('[data-showmore-button]')
               const showMoreBlock = showMoreButton.closest('[data-showmore]')
               const showMoreContent = showMoreBlock.querySelector('[data-showmore-content]')
               const showMoreSpeed = showMoreBlock.dataset.showmoreButton ? showMoreBlock.dataset.showmoreButton : '500'
               const hiddenHeight = getHeight(showMoreBlock, showMoreContent)
               if (!showMoreContent.classList.contains('_slide')) {
                  showMoreBlock.classList.contains('_showmore-active')
                     ? _slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
                     : _slideDown(showMoreContent, showMoreSpeed, hiddenHeight)
                  showMoreBlock.classList.toggle('_showmore-active')
               }
            }
         } else if (targetType === 'resize') {
            showMoreBlocksRegular && showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null
            mdQueriesArray && mdQueriesArray.length ? initItemsMedia(mdQueriesArray) : null
         }
      }
   })
}
export let _slideUp = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = `${target.offsetHeight}px`
      target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = showmore ? `${showmore}px` : `0px`
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      window.setTimeout(() => {
         target.hidden = !showmore ? true : false
         !showmore ? target.style.removeProperty('height') : null
         target.style.removeProperty('padding-top')
         target.style.removeProperty('padding-bottom')
         target.style.removeProperty('margin-top')
         target.style.removeProperty('margin-bottom')
         !showmore ? target.style.removeProperty('overflow') : null
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
         document.dispatchEvent(
            new CustomEvent('slideUpDone', {
               detail: {
                  target: target,
               },
            })
         )
      }, duration)
   }
}
export let _slideDown = (target, duration = 500, showmore = 0) => {
   if (!target.classList.contains('_slide')) {
      target.classList.add('_slide')
      target.hidden = target.hidden ? false : null
      showmore ? target.style.removeProperty('height') : null
      let height = target.offsetHeight
      target.style.overflow = 'hidden'
      target.style.height = showmore ? `${showmore}px` : `0px`
      target.style.paddingTop = 0
      target.style.paddingBottom = 0
      target.style.marginTop = 0
      target.style.marginBottom = 0
      target.offsetHeight
      target.style.transitionProperty = 'height, margin, padding'
      target.style.transitionDuration = duration + 'ms'
      target.style.height = height + 'px'
      target.style.removeProperty('padding-top')
      target.style.removeProperty('padding-bottom')
      target.style.removeProperty('margin-top')
      target.style.removeProperty('margin-bottom')
      window.setTimeout(() => {
         target.style.removeProperty('height')
         target.style.removeProperty('overflow')
         target.style.removeProperty('transition-duration')
         target.style.removeProperty('transition-property')
         target.classList.remove('_slide')
         document.dispatchEvent(
            new CustomEvent('slideDownDone', {
               detail: {
                  target: target,
               },
            })
         )
      }, duration)
   }
}
export let _slideToggle = (target, duration = 500) => {
   if (target.hidden) {
      return _slideDown(target, duration)
   } else {
      return _slideUp(target, duration)
   }
}
export function uniqArray(array) {
   return array.filter(function (item, index, self) {
      return self.indexOf(item) === index
   })
}
export function dataMediaQueries(array, dataSetValue) {
   const media = Array.from(array).filter(function (item, index, self) {
      if (item.dataset[dataSetValue]) {
         return item.dataset[dataSetValue].split(',')[0]
      }
   })
   if (media.length) {
      const breakpointsArray = []
      media.forEach((item) => {
         const params = item.dataset[dataSetValue]
         const breakpoint = {}
         const paramsArray = params.split(',')
         breakpoint.value = paramsArray[0]
         breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max'
         breakpoint.item = item
         breakpointsArray.push(breakpoint)
      })
      let mdQueries = breakpointsArray.map(function (item) {
         return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type
      })
      mdQueries = uniqArray(mdQueries)
      const mdQueriesArray = []

      if (mdQueries.length) {
         mdQueries.forEach((breakpoint) => {
            const paramsArray = breakpoint.split(',')
            const mediaBreakpoint = paramsArray[1]
            const mediaType = paramsArray[2]
            const matchMedia = window.matchMedia(paramsArray[0])
            const itemsArray = breakpointsArray.filter(function (item) {
               if (item.value === mediaBreakpoint && item.type === mediaType) {
                  return true
               }
            })
            mdQueriesArray.push({
               itemsArray,
               matchMedia,
            })
         })
         return mdQueriesArray
      }
   }
}
