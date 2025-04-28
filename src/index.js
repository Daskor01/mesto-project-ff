import './index.css';

import { initialCards } from './components/cards.js'
import { createCard, likeCard, removeCard } from './components/card.js'
import { openModal, closeModal} from './components/modal.js'


//Получаем элементы из DOM
const template = document.querySelector('#card-template')
const cardList = document.querySelector('.places__list')
const popups = document.querySelectorAll('.popup')

//Модалки
const modals = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  showImage: document.querySelector('.popup_type_image')
}

//Элементы модалок
const modalEdit = {
  openButton: document.querySelector('.profile__edit-button'),
  closeButton: modals.edit.querySelector('.popup__close')
}

const modalAddCard = {
  openButton: document.querySelector('.profile__add-button'),
  closeButton: modals.addCard.querySelector('.popup__close')
}

const modalShowImage = {
  image: document.querySelector('.popup__image'),
  text: document.querySelector('.popup__caption'),
  closeButton: modals.showImage.querySelector('.popup__close')
}

//Формы
const forms = {
  addCard: document.forms['new-place'],
  edit: document.forms['edit-profile']
}

//Элементы форм
const addCardForm = {
  form: document.forms['new-place'],
  url: document.querySelector('.popup__input_type_url'),
  name: document.querySelector('.popup__input_type_card-name')
}

const profile = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description')
}

const editForm = {
  form: document.forms['edit-profile'],
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description')
}

//Добавление карточек в DOM
initialCards.forEach((obj) => {
  cardList.appendChild(createCard(template, obj, removeCard, likeCard, showImage))
})

//Прослушиватели

//Открываем по клику на кнопку
modalEdit.openButton.addEventListener('click', () => {
  openModal(modals.edit)
  fillForm()
})

modalAddCard.openButton.addEventListener('click', () => {
  openModal(modals.addCard)
})

//Закрываем окна
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close')

  //Закрываем по клику на кнопку
  closeButton.addEventListener('click', () => closeModal(popup))

  //Закрываем модалку по клику вне
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup)
    }  
  })

  //Анимация окон
  popup.classList.add('popup_is-animated')
})

//Отправляем формы
forms.edit.addEventListener('submit', submitEditForm)

forms.addCard.addEventListener('submit', (evt) => {
  addNewCard(evt, template, showImage, closeModal)
});

//Функция просмотра изображения
function showImage(link, name) {
  modalShowImage.image.src = link
  modalShowImage.image.alt = name
  modalShowImage.text.textContent = name
  openModal(modals.showImage)
}

//Создаем новую карточку
function addNewCard(evt, template, showImage, closeModal) {
  //Отменяем отправку формы
  evt.preventDefault()

  //Объект с данными новой карточки
  const newCardData = {
    name: addCardForm.name.value,
    link: addCardForm.url.value
  }

  //Новая карточка
  const newCard = createCard(
    template, 
    newCardData, 
    removeCard, 
    likeCard, 
    showImage
  )

  cardList.prepend(newCard)

  addCardForm.form.reset()

  closeModal(modals.addCard)
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