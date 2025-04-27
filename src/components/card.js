//Элементы формы добавления карточек
const addCardForm = {
  form: document.forms['new-place'],
  url: document.querySelector('.popup__input_type_url'),
  name: document.querySelector('.popup__input_type_card-name')
}

//Контейнер с карточками
const cardList = document.querySelector('.places__list')

//Модалка
const modals = {
  addCard: document.querySelector('.popup_type_new-card')
}

//Создание карточки
function createCard(template, obj, removeCard, likeCard, showImage) {
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
    }
}

//Функция лайка
function likeCard(element) {
  element.classList.toggle('card__like-button_is-active')
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


export {createCard, removeCard, likeCard, addNewCard}


