//Открываем модалку
function openModal(modal) {
  modal.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeByEsc)
} 

//Закрываем по нажатию клавиши Esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_is-opened')
    closeModal(openedPopup)
  }
} 

//Закрываем модалку
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeByEsc)
}

export {openModal, closeModal}

