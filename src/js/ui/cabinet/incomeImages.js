import lottie from 'lottie-web'
import incomePcJson from '../../../files/incomDesctop.json'
import incomeMobJson from '../../../files/incomMobile.json'

!(function incomeImages() {
   new lottie.loadAnimation({
      container: document.querySelector('.income__img-pc'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: incomePcJson,
   })
   new lottie.loadAnimation({
      container: document.querySelector('.income__img-mob'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: incomeMobJson,
   })
})()
