import './index.css';

import { initialCards } from './components/cards.js'
import { createCard, likeCard, removeCard, addNewCard } from './components/card.js'
import { openModal, submitEditForm, fillForm, closeModal, closeByOutside} from './components/modal.js'


//Получаем элементы из DOM
const template = document.querySelector('#card-template')
const cardList = document.querySelector('.places__list')

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

//Закрываем по клику на кнопку
modalEdit.closeButton.addEventListener('click', () => {
  closeModal(modals.edit)
})

modalAddCard.closeButton.addEventListener('click', () => {
  closeModal(modals.addCard)
})

modalShowImage.closeButton.addEventListener('click', () => {
  closeModal(modals.showImage)
})

//Закрываем модалку по клику вне
modals.edit.addEventListener('click', (event) => {
  closeByOutside(event)
})

modals.addCard.addEventListener('click', (event) => {
  closeByOutside(event)
})

modals.showImage.addEventListener('click', (event) => {
  closeByOutside(event)
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