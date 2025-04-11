//Создание карточки
function createCard(obj, removeCard) {
  const template = document.querySelector('#card-template').content;
  const cardElement = template.cloneNode(true);
  const card = cardElement.querySelector('.card'); 

  card.querySelector('.card__image').src = obj.link;
  card.querySelector('.card__image').alt = obj.name;
  card.querySelector('.card__title').textContent = obj.name;
  
  card.querySelector('.card__delete-button').addEventListener('click', () => {
    removeCard(card);
  });

  return cardElement;
}

//Добавление карточек в DOM
initialCards.forEach((obj) => {
  document.querySelector('.places__list').appendChild(createCard(obj, removeCard))
})

//Удаление карточки
function removeCard(element) {
    if (element && element.remove) {
        element.remove()
    } else {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element)
        }
    }
}


