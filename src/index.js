require('./styles/main.css')
import landingOrder from './js/form'
import Swiper, {Navigation} from 'swiper';
import { applyPhoneMaskToInputElement } from './js/input-masking'

window.addEventListener('load', (event) => {
  var input1 = document.querySelector('#phone-input-1')
  var input2 = document.querySelector('#phone-input-2')
  applyPhoneMaskToInputElement(input1)
  applyPhoneMaskToInputElement(input2)
  
  var form1 = document.querySelector('#form-1')
  var form2 = document.querySelector('#form-2')

  form1.addEventListener('submit', phoneSubmitHandler)
  form2.addEventListener('submit', phoneSubmitHandler)

  alertSettings()
  window.swiper = initSwiper()
});

function phoneSubmitHandler (e) {
  e.preventDefault()
  var phoneNumber = this.querySelector('input').value
  
  if(phoneNumber) {
    landingOrder(phoneNumber).then(function() {
      showAlert()
    }).catch(e => {
      console.error(e)
    })
  }
}

function showAlert () {
  document.querySelector('.success-alert').classList.toggle('d-none')
}
function alertSettings() {
  var alertEl = document.querySelector('.success-alert')
  document.querySelector('.success-alert__overlay')
    .addEventListener('click', function () {
      showAlert()
    })
  document.querySelector('.success-alert__btn')
    .addEventListener('click', function () {
      showAlert()
    })
}

function initSwiper () {
  Swiper.use([Navigation])
  var swiper = new Swiper('.team-swiper', {
    slidesPerView: 2,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
  // swiper.slideTo()
  return swiper
}
