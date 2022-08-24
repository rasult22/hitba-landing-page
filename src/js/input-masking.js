
import IMask from 'imask'
export function applyPhoneMaskToInputElement(domInputElement) {
  IMask(domInputElement, {
    mask: '+{7}(000)000-00-00'
  })
}