const allPaginations = document.querySelectorAll('[data-pagination]')
allPaginations.length &&
   allPaginations.forEach((pagination) => {
      initPagination(pagination)
   })

function initPagination(block) {
   const dataList = block.querySelector('[data-pagination-list]')
   const nav = block.querySelector('[data-pagination-nav]')
   const navList = block.querySelector('[data-pagination-nav-list]')
   const lengthPart = 5
   let activePart = 0

   const CLASS = {
      ITEM: 'paginations__item',
      ARROW: 'paginations__arrow',
      ACTIVE: '_active',
      HIDE: '_hide',
   }
   const SELECTOR = {
      ACTIVE_ITEM: '.paginations__item._active',
   }
   const ATTR = {
      PAG_PART: 'data-pag-part',
      PAG_PREV: 'data-pag-prev',
      PAG_NEXT: 'data-pag-next',
   }
   const EL = {
      ARROW_PREV: null,
      ARROW_NEXT: null,
   }
   let data = [...dataList.children]
   let chunks = SplitParts(data, lengthPart)

   RenderChunks(0)
   RenderPagination()

   //========================================================================================================================================================
   nav.addEventListener('click', (e) => {
      e.preventDefault()
      let item = e.target
      if (item.classList.contains(CLASS.ITEM)) onItemClick(item)
      if (item.classList.contains(CLASS.ARROW)) onArrowsClick(item)
      disableUnnecessaryArrows()
      hideOverPages()
   })
   //========================================================================================================================================================
   function SplitParts(arr) {
      if (arr.length > lengthPart) {
         const _chunks = []
         for (let i = 0; i < arr.length; i += lengthPart) {
            _chunks.push(arr.slice(i, i + lengthPart))
         }
         return _chunks
      } else return [arr]
   }
   function RenderChunks(part) {
      if (part >= 0 && part < chunks.length) {
         dataList.innerHTML = ''
         chunks[part].map((elem) => {
            return dataList.append(elem)
         })
      } else return false
   }
   function RenderPagination() {
      if (chunks.length > 1) {
         nav.style.display = 'flex'
         chunks.map((e, i) =>
            navList.insertAdjacentHTML(
               'beforeend',
               ` <li 
                      data-goto="#activeDepositsList"  
                      data-goto-top="250" 
                      class="paginations__item  ${i === 0 ? '_active' : ''}" 
                      data-pag-part="${i}" >
                         ${i + 1}
                   </li>`
            )
         )
         renderArrow()
      }
      hideOverPages()
      disableUnnecessaryArrows()
   }
   function hideOverPages() {
      const active = navList.querySelector(SELECTOR.ACTIVE_ITEM)
      if (navList) {
         let items = [...navList.children]
         if (items.length > 5) {
            items.forEach((item) => item.classList.add(CLASS.HIDE))
            items[0].classList.remove(CLASS.HIDE)
            if (active.previousElementSibling) {
               active.previousElementSibling.classList.remove(CLASS.HIDE)
            }
            active.classList.remove(CLASS.HIDE)
            if (active.nextElementSibling) {
               active.nextElementSibling.classList.remove(CLASS.HIDE)
            }
            items[items.length - 1].classList.remove(CLASS.HIDE)
         }
      }
   }
   function onArrowsClick(item) {
      const active = navList.querySelector(SELECTOR.ACTIVE_ITEM)
      activePart = item.hasAttribute(ATTR.PAG_PREV) ? activePart - 1 : activePart + 1
      active.classList.remove(CLASS.ACTIVE)
      navList.querySelector(`[${ATTR.PAG_PART} = '${activePart}']`).classList.add(CLASS.ACTIVE)
      RenderChunks(activePart)
   }
   function onItemClick(item) {
      const active = navList.querySelector(SELECTOR.ACTIVE_ITEM)
      active.classList.remove(CLASS.ACTIVE)
      item.classList.add(CLASS.ACTIVE)
      activePart = +item.dataset.pagPart
      RenderChunks(activePart)
   }
   function disableUnnecessaryArrows() {
      if (EL.ARROW_PREV.hasAttribute('disabled')) EL.ARROW_PREV.removeAttribute('disabled')
      if (EL.ARROW_NEXT.hasAttribute('disabled')) EL.ARROW_NEXT.removeAttribute('disabled')
      if (activePart === 0) EL.ARROW_PREV.setAttribute('disabled', true)
      if (activePart === chunks.length - 1) EL.ARROW_NEXT.setAttribute('disabled', true)
   }
   function renderArrow() {
      nav.insertAdjacentHTML(
         'afterbegin',
         `<button
            data-goto="#activeDepositsList"
            data-goto-top="230"
            data-pag-prev
            type="button"
            class="paginations__arrow _icon-arrow-left">
         </button>`
      )
      nav.insertAdjacentHTML(
         'beforeend',
         `<button
            data-goto="#activeDepositsList"
            data-goto-top="230"
            data-pag-next
            type="button"
            class="paginations__arrow _icon-arrow-right">
         </button>`
      )
      EL.ARROW_PREV = block.querySelector(`[${ATTR.PAG_PREV}]`)
      EL.ARROW_NEXT = block.querySelector(`[${ATTR.PAG_NEXT}]`)
   }
}
