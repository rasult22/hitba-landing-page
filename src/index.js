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
  mobileMenu()
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
  const windowWidth = window.innerWidth
  return
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


function mobileMenu () {
  var menu = document.querySelector('.mobile-menu')
  var burger = document.querySelector('.page-header__burger')
  var close = document.querySelector('.mobile-menu__header .close')
  var link = document.querySelectorAll('.mobile-menu .menu__item')
  burger.addEventListener('click', function () {
    menu.classList.add('d-block')
  })

  window.addEventListener('scroll', async function (e) {
    if(window.scrollY > 612) {
      document.querySelector('.page-header').classList.add('page-header--background')
    } else {
      document.querySelector('.page-header').classList.remove('page-header--background')
    }
  })
  
  link.forEach(function (x) {
    x.addEventListener('click', closeFn)
  })
  close.addEventListener('click', closeFn)

  function closeFn () {
    menu.classList.remove('d-block')
  }
}