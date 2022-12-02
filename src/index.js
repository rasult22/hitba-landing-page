require('./styles/main.css')
import landingOrder from './js/form'
import Swiper, { Navigation } from 'swiper';
import 'swiper/css'
import { applyPhoneMaskToInputElement } from './js/input-masking'

import localeKzData from "./locale/kz"
import localeRuData from "./locale/ru"


window.addEventListener('load', (event) => {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    window.document.addEventListener('touchmove', function (e) {
      if (e.scale !== 1) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  initLocale()
  initForms()
  alertSettings()
  downloadAppHandler()
  window.swiper = initSwiper()
  mobileMenu()
  smoothScroll()
});

function initForms() {
  const langSelectEl = document.querySelector("#lang-select");
  const langMobileSelectEl = document.querySelector("#lang-mobile-select");

  langSelectEl.value = localStorage.getItem("lang") || "ru";
  langMobileSelectEl.value = localStorage.getItem("lang") || "ru";

  langSelectEl.addEventListener("change", setLocale);
  langMobileSelectEl.addEventListener("change", setLocale);
}

function downloadAppHandler() {
  var downloads = document.querySelectorAll('.download-app-icon')

  downloads.forEach(el => {
    el.addEventListener('click', function (e) {
      toggleDownloadAlert()
    })
  })
  document.querySelector('.success-alert__overlay--2')
    .addEventListener('click', function () {
      toggleDownloadAlert()
    })
  document.querySelector('.success-alert__btn--2')
    .addEventListener('click', function () {
      toggleDownloadAlert()
    })
}

function phoneSubmitHandler(e) {
  e.preventDefault()
  var phoneNumber = this.querySelector('input').value

  if (phoneNumber) {
    landingOrder(phoneNumber).then(function () {
      toggleAlert()
    }).catch(e => {
      console.error(e)
    })
  }
}

function toggleDownloadAlert() {
  document.querySelector('.inform-alert').classList.toggle('d-none')
}
function toggleAlert() {
  document.querySelector('.success-alert').classList.toggle('d-none')
}
function alertSettings() {
  var alertEl = document.querySelector('.success-alert')
  document.querySelector('.success-alert__overlay--1')
    .addEventListener('click', function () {
      toggleAlert()
    })
  document.querySelector('.success-alert__btn--1')
    .addEventListener('click', function () {
      toggleAlert()
    })
}

function initSwiper() {
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

function mobileMenu() {
  var menu = document.querySelector('.mobile-menu')
  var burger = document.querySelector('.page-header__burger')
  var close = document.querySelector('.mobile-menu__header .close')
  var link = document.querySelectorAll('.mobile-menu .menu__item')
  burger.addEventListener('click', function () {
    menu.classList.add('d-block')
  })

  window.addEventListener('scroll', async function (e) {
    if (window.scrollY > 612) {
      document.querySelector('.page-header').classList.add('page-header--background')
    } else {
      document.querySelector('.page-header').classList.remove('page-header--background')
    }
  })

  link.forEach(function (x) {
    x.addEventListener('click', closeFn)
  })
  close.addEventListener('click', closeFn)

  function closeFn(e) {
    if (e.target.id === "lang-mobile-select") return
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

function smoothScroll() {
  var links = document.querySelectorAll('.menu__item a')
  var links2 = document.querySelectorAll('.footer-list__item a')

  links.forEach(function (x) {
    x.addEventListener('click', clickHandler)
  })
  links2.forEach(function (x) {
    x.addEventListener('click', clickHandler)
  })
}


function setLocale(e) {
  localStorage.setItem("lang", e.target.value)

  initLocale();
}

function initLocale() {
  const elements = document.querySelectorAll("[data-locale-id]");
  const currentLang = localStorage.getItem("lang") || "ru";

  elements.forEach(el => {
    if (!el?.dataset?.localeId) return;
    const key = el.dataset.localeId;

    if (currentLang === "ru") {
      el.textContent = localeRuData[key];
    } else if (currentLang === "kz") {
      el.textContent = localeKzData[key] || localeRuData[key]; // if kz translation is not available
    } else {
      // default ru
      el.textContent = localeRuData[key];
    }


  })
}