//Scripts========================================================================================================================================================
import Lottie from 'lottie-web'
import { debounce } from '../base/utility.js'
//JSON========================================================================================================================================================
import incomePcJson from '../../../files/incomDesctop.json'
import incomeMobJson from '../../../files/incomMobile.json'
import aboutRocket from '../../../files/roket.json'
import referralRockets from '../../../files/rokets.json'

!(function incomeImages() {
   const incomePc = document.querySelector('.income__img-pc')
   const incomeMob = document.querySelector('.income__img-mob')
   incomePc &&
      new Lottie.loadAnimation({
         container: incomePc,
         renderer: 'svg',
         loop: true,
         autoplay: true,
         animationData: incomePcJson,
      })
   incomeMob &&
      new Lottie.loadAnimation({
         container: incomeMob,
         renderer: 'svg',
         loop: true,
         autoplay: true,
         animationData: incomeMobJson,
      })
})()

!(function initAboutRocket() {
   const rocketBox = document.querySelector('.landing-about__rocket-animation')
   const rocket =
      rocketBox &&
      new Lottie.loadAnimation({
         container: rocketBox,
         renderer: 'canvas',
         autoplay: false,
         loop: false,
         animationData: aboutRocket,
      })

   const stopRocket = debounce(() => rocket.stop(), 1800)
   const rocketEl = document.querySelector('.landing-about__rocket-animation')
   rocketEl &&
      rocketEl.addEventListener('click', (el) => {
         rocket.goToAndPlay(28, false)
         stopRocket()
      })
})()

!(function initReferralRockets() {
   const block = document.querySelector('.landing-referral__rokets')
   block &&
      new Lottie.loadAnimation({
         container: block,
         renderer: 'canvas',
         loop: true,
         autoplay: true,
         animationData: referralRockets,
      })
})()
