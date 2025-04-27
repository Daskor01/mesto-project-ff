//Элементы формы профиля
const profile = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

//Модалки
const modals = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  showImage: document.querySelector('.popup_type_image')
}

//Добавляем анимации всем модалкам
Object.values(modals).forEach(modal => {
  modal.classList.add('popup_is-animated')
})

//Элементы формы
const editForm = {
  form: document.forms['edit-profile'],
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description')
}

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

//Закрываем по клику вне
function closeByOutside(evt) {
    if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget)
  }
}

//Закрываем модалку
function closeModal(modal) {
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown', closeByEsc)
}

//Присваиваем поля форме
function fillForm() {
  editForm.nameInput.value = profile.name.textContent;
  editForm.jobInput.value = profile.description.textContent;
}

// Обработчик 'отправки' формы
function submitEditForm(evt) {
  //Отменяем отправку формы
  evt.preventDefault();

  //Обновляем поля и закрываем форму
  profile.name.textContent = editForm.nameInput.value
  profile.description.textContent = editForm.jobInput.value
    
  closeModal(modals.edit)
}

export {openModal, closeModal, submitEditForm, fillForm, closeByOutside}

