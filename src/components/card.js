//Создание карточки
function createCard (
  template, 
  obj, 
  handleLikeClick, 
  showImage, 
  userId, 
  handleDeleteClick
) {
  const cardElement = template.content.cloneNode(true)
  const card = cardElement.querySelector('.card')
  const cardImage = card.querySelector('.card__image')
  const cardTitle = card.querySelector('.card__title')
  const deleteButton = card.querySelector('.card__delete-button')
  const likeButton = card.querySelector('.card__like-button')
  const likeCounter = card.querySelector('.card__like-counter')

  cardImage.alt = obj.name
  cardImage.src = obj.link
  cardTitle.textContent = obj.name
  likeCounter.textContent = obj.likes.length

  if (obj.likes.some(user => user._id === userId)) {
    likeButton.classList.add('card__like-button_is-active')
  }

  cardImage.addEventListener('click', () => {
    showImage(obj.link, obj.name)
  })

  likeButton.addEventListener('click', () => {
    handleLikeClick(obj._id, likeButton, likeCounter)
  })

  if(obj.owner._id !== userId) {
    deleteButton.classList.add('card__delete-button_hidden')
  } else {
    deleteButton.addEventListener('click', () => {
      if (handleDeleteClick) {
        handleDeleteClick(obj._id, card)
      }
    })
  }

  return cardElement
}

//Удаление карточки
function removeCard(element) {
    if (element && element.remove) {
      element.remove()
    }
}

export {createCard, removeCard}


