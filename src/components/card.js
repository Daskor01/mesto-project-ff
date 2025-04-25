import { template } from "../index.js"
import { showImage } from "./modal.js"

//Создание карточки
function createCard(obj, removeCard, likeCard) {
  const cardElement = template.content.cloneNode(true)
  const card = cardElement.querySelector('.card')
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const deleteButton = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button')

  cardImage.alt = obj.name
  cardImage.src = obj.link
  cardTitle.textContent = obj.name

  cardImage.addEventListener('click', () => {
    showImage(obj.link, obj.name)
  })

  likeButton.addEventListener('click', () => {
    likeCard(likeButton)
  })

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
function likeCard(element) {
  element.classList.toggle('card__like-button_is-active')
}


export {createCard, removeCard, likeCard, showImage}


