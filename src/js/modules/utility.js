export function debounce(fn, timeout = 300) {
   let timerId = null
   return (...rest) => {
      clearTimeout(timerId)
      timerId = setTimeout(() => fn(...rest), timeout)
   }
}
