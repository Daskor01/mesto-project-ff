import { closeModal } from "./modal"
import { createCard, removeCard, likeCard } from "./card"
import { cardList } from "../index.js"

//Элементы DOM
const nameElement = document.querySelector('.profile__title')
const descriptionElement = document.querySelector('.profile__description')
const formElement = document.forms['edit-profile']
const formAddCard = document.forms['new-place']
//Поля формы
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')

//Присваиваем поля форме
function fillForm() {
    nameInput.value = nameElement.textContent;
    jobInput.value = descriptionElement.textContent;
}

// Обработчик 'отправки' формы
function handleFormSubmit(evt) {
    //Отменяем отправку формы
    evt.preventDefault();

    //Обновляем поля и закрываем форму
    nameElement.textContent = nameInput.value
    descriptionElement.textContent = jobInput.value
    
    const modal = document.querySelector('.popup_type_edit')
    closeModal(modal)
}

function addNewCard(evt) {
    //Отменяем отправку формы
    evt.preventDefault();

    //Объект с данными новой карточки
    const obj = {}
    const nameElement = document.querySelector('.popup__input_type_card-name')
    const urlElement = document.querySelector('.popup__input_type_url')
    obj.name = nameElement.value
    obj.link = urlElement.value

    //Создаем карточку
    const newCard = createCard(obj, removeCard, likeCard)
    cardList.prepend(newCard)
    nameElement.value = '';
    urlElement.value = '';

    closeModal(document.querySelector('.popup_type_new-card'));
}

export {handleFormSubmit, formElement, fillForm, formAddCard, addNewCard}
