import './index.css';

import {initialCards} from './components/cards.js'
import {createCard, removeCard} from './components/card.js'
import {openModal} from './components/modal.js'
import {handleFormSubmit, formElement} from './components/forms.js'


//Получаем элементы из DOM
const template = document.querySelector('#card-template')
const cardList = document.querySelector('.places__list')

//Добавление карточек в DOM
initialCards.forEach((obj) => {
  cardList.appendChild(createCard(obj, removeCard))
})

//Прослушиватели
document.querySelectorAll('.open-modal').forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.dataset.modalTarget;
    openModal(modalId);
  });
});

formElement.addEventListener('submit', handleFormSubmit);

export {template}
