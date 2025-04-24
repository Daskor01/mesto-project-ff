import { fillForm } from "./forms"

//Открываем модалку
function openModal(modalId) {
  const modal = document.querySelector(modalId)
  const closeButton = modal.querySelector('.popup__close')

  modal.classList.add('popup_is-opened')
  
  fillForm()

  //Закрываем по нажатию клавиши Esc
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      closeModal(modalId)
    }
  })

  //Закрываем модалку по клику вне
  modal.addEventListener('click', (event) => {
    const modalContent = modal.querySelector('.popup__content')
    const clickInside = modalContent.contains(event.target)
    if(!clickInside) {
      closeModal(modalId)
    }
  })

  //Закрываем по кнопке
  closeButton.addEventListener('click', () => {
    closeModal(modalId)
  })
}

//Закрываем модалку
function closeModal (modalId) {
  const modal = document.querySelector(modalId)
  modal.classList.add('popup_is-animated')
  modal.classList.remove('popup_is-opened')
}

export {openModal, closeModal}