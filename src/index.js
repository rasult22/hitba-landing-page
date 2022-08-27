require('./styles/main.css')
import landingOrder from './js/form'
import { applyPhoneMaskToInputElement } from './js/input-masking'

window.addEventListener('load', (event) => {
  const input1 = document.querySelector('#phone-input-1')
  const input2 = document.querySelector('#phone-input-2')
  applyPhoneMaskToInputElement(input1)
  applyPhoneMaskToInputElement(input2)
  
  const form1 = document.querySelector('#form-1')
  const form2 = document.querySelector('#form-2')

  form1.addEventListener('submit', phoneSubmitHandler)
  form2.addEventListener('submit', phoneSubmitHandler)

  alertSettings()
});

function phoneSubmitHandler (e) {
  e.preventDefault()
  const phoneNumber = this.querySelector('input').value
  
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
  const alertEl = document.querySelector('.success-alert')
  document.querySelector('.success-alert__overlay').addEventListener('click', function () {
    showAlert()
  })
  document.querySelector('.success-alert__btn').addEventListener('click', function () {
    showAlert()
  })
}
