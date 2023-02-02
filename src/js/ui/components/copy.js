import { debounce } from '../base/utility.js'

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
