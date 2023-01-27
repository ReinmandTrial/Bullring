//Navigation========================================================================================================================================================
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
pageNavigation()
//========================================================================================================================================================
