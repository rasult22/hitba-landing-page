require('./styles/main.css')
import landingOrder from './js/form'
import Swiper, {Navigation} from 'swiper';
import 'swiper/css'
import { applyPhoneMaskToInputElement } from './js/input-masking'

window.addEventListener('load', (event) => {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener('touchmove', e => {
      if(e.scale !== 1) {
        e.preventDefault();
      }
    }, {passive: false});
  }
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
  smoothScroll()
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
  var slidesPerView = 5
  var spaceBetween = 10
  if (window.innerWidth < 700) {
    slidesPerView = 1.4
    spaceBetween = 30
  }
  Swiper.use([Navigation])
  var swiper = new Swiper('.team-swiper', {
    slidesPerView: slidesPerView,
    spaceBetween,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })
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

  function closeFn (e) {
    menu.classList.remove('d-block')
  }
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;
 
  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}

function smoothScroll () {
  var links = document.querySelectorAll('.menu__item a')

  links.forEach(function (x) {
    x.addEventListener('click', clickHandler)
  })
}