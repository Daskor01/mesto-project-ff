import {template} from "../index.js"

//Создание карточки
function createCard(obj, removeCard) {
  const cardElement = template.content.cloneNode(true)
  const card = cardElement.querySelector('.card')
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const deleteButton = card.querySelector('.card__delete-button')

  cardImage.alt = obj.name
  cardImage.src = obj.link
  cardTitle.textContent = obj.name

  deleteButton.addEventListener('click', () => {
    removeCard(card)
  })

  return cardElement
}

//Удаление карточки
function removeCard(element) {
    if (element && element.remove) {
        element.remove()
    } else {
      element.closest('.card').remove()
    }
}

//Функция лайка
function likeCard() {
  //
}

export {createCard, removeCard}