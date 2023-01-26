import lottie from 'lottie-web'

!(function incomeImages() {
   new lottie.loadAnimation({
      container: document.querySelector('.income__img-pc'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/desktop_new.json',
   })
   new lottie.loadAnimation({
      container: document.querySelector('.income__img-mob'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '../files/mobile_new.json',
   })
})()
