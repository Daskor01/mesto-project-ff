import './index.css';

import { initialCards } from './components/cards.js'
import { createCard, removeCard, likeCard } from './components/card.js'
import { openModal } from './components/modal.js'
import { handleFormSubmit, formElement, formAddCard, addNewCard } from './components/forms.js'


//Получаем элементы из DOM
const template = document.querySelector('#card-template')
const cardList = document.querySelector('.places__list')

const editButton = document.querySelector('.profile__edit-button')
const addCardButton = document.querySelector('.profile__add-button')

//Добавление карточек в DOM
initialCards.forEach((obj) => {
  cardList.appendChild(createCard(obj, removeCard, likeCard))
})

//Прослушиватели

editButton.addEventListener('click', () => {
  openModal('.popup_type_edit')
})

addCardButton.addEventListener('click', () => {
  openModal('.popup_type_new-card')
})

formElement.addEventListener('submit', handleFormSubmit);
formAddCard.addEventListener('submit', addNewCard);


export {template, cardList}
