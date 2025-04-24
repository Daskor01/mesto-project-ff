import {closeModal} from "./modal"

//Элементы DOM
const nameElement = document.querySelector('.profile__title');
const descriptionElement = document.querySelector('.profile__description');
const formElement = document.forms['edit-profile'];
//Поля формы
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

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
    closeModal('#modal1')
}


export {handleFormSubmit, formElement, fillForm}
