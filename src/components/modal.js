import { fillForm } from "./forms"

//Открываем модалку
function openModal(ElementClass) {
  const modal = document.querySelector(ElementClass)
  const closeButton = modal.querySelector('.popup__close')

  modal.classList.add('popup_is-opened')
  
  fillForm()

  //Закрываем по нажатию клавиши Esc
  document.addEventListener('keydown', (event) => {
    if(event.key === 'Escape') {
      closeModal(modal)
    }
  })

  //Закрываем модалку по клику вне
  modal.addEventListener('click', (event) => {
    const modalContent = modal.querySelector('.popup__content')
    const clickInside = modalContent.contains(event.target)
    if(!clickInside) {
      closeModal(modal)
    }
  })

  //Закрываем по кнопке
  closeButton.addEventListener('click', () => {
    closeModal(modal)
  })
}

//Закрываем модалку
function closeModal(modal) {
  modal.classList.add('popup_is-animated')
  modal.classList.remove('popup_is-opened')
}

//Функция просмотра изображения
function showImage(link, name) {
  const modalImage = document.querySelector('.popup__image')
  const modalText = document.querySelector('.popup__caption')

  modalImage.src = link
  modalText.textContent = name

  openModal('.popup_type_image')
}

export {openModal, closeModal, showImage}