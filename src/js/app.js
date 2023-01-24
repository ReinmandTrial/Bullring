//Подключение стилей======================================================================================================================================
import '../scss/style.scss'
//========================================================================================================================================================
import * as utility from './modules/utility.js'
import './modules/cabinet.js'
import lottie from 'lottie-web'

utility.isWebp()
utility.menuInit()

// const animEle = document.querySelector('.animation')

// const ltan = new lottie.loadAnimation({
//    container: animEle, // the dom element that will contain the animation
//    renderer: 'svg',
//    loop: true,
//    autoplay: true,
//    path: '../files/desktop_new.json', // the path to the animation json
// })
// const ltanm = new lottie.loadAnimation({
//    container: animEle, // the dom element that will contain the animation
//    renderer: 'svg',
//    loop: true,
//    autoplay: true,
//    path: '../files/mobile_new.json', // the path to the animation json
// })
