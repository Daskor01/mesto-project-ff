import './index.css'

import { createCard, removeCard, isLikedCard, updatedCardLike } from './components/card.js'
import { openModal, closeModal} from './components/modal.js'
import { enableValidation, clearValidation } from './components/validation.js'
import { 
  getUserInfo, getInitialCards, 
  updateUserProfile, updateUserImage,
  addNewCardToServer, deleteCardFromServer, 
  removeCardLike, addCardLike 
} from './components/api.js'

//Получаем элементы из DOM
const template = document.querySelector('#card-template')
const cardList = document.querySelector('.places__list')
const popups = document.querySelectorAll('.popup')

//Модалки
const modals = {
  edit: document.querySelector('.popup_type_edit'),
  addCard: document.querySelector('.popup_type_new-card'),
  showImage: document.querySelector('.popup_type_image'),
  confirm: document.querySelector('.popup_confirm'),
  profileImage: document.querySelector('.popup_new-image')
}

//Элементы модалок
const modalEdit = {
  openButton: document.querySelector('.profile__edit-button'),
  closeButton: modals.edit.querySelector('.popup__close'),
  saveButton: modals.edit.querySelector('.popup__button')
}

const modalAddCard = {
  openButton: document.querySelector('.profile__add-button'),
  closeButton: modals.addCard.querySelector('.popup__close'),
  saveButton: modals.addCard.querySelector('.popup__button')
}

const modalShowImage = {
  image: document.querySelector('.popup__image'),
  text: document.querySelector('.popup__caption'),
  closeButton: modals.showImage.querySelector('.popup__close')
}

const modalConfirm = {
  confirmButton: document.querySelector('.popup_confirm__button')
}

const modalProfileImage = {
  saveButton: modals.profileImage.querySelector('.popup__button')
}


//Формы
const forms = {
  addCard: document.forms['new-place'],
  edit: document.forms['edit-profile'],
  profileImage: document.forms['new-image']
}

//Элементы форм
const addCardForm = {
  form: document.forms['new-place'],
  url: document.querySelector('.popup__input_type_url'),
  name: document.querySelector('.popup__input_type_card-name')
}

const profile = {
  name: document.querySelector('.profile__title'),
  description: document.querySelector('.profile__description'),
  image: document.querySelector('.profile__image'),
  overlay: document.querySelector('.profile__overlay')
}

const editForm = {
  form: document.forms['edit-profile'],
  nameInput: document.querySelector('.popup__input_type_name'),
  jobInput: document.querySelector('.popup__input_type_description')
}

//Объект настроек валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

//Отрисовываем страницу

//Переменная для id текущего пользователя
let currentUserId = null

async function initialPage() {
  try {
    //Получаем данные
    const [userData, initialCards] = await Promise.all([
      getUserInfo(),
      getInitialCards()
    ])

    currentUserId = userData._id

    //Устанавливаем данные пользователя
    profile.name.textContent = userData.name
    profile.description.textContent = userData.about
    profile.image.src = userData.avatar

    //Отрисовываем карточки
    renderCards(initialCards)
    
  } catch (error) {
    console.error("Ошибка инициализации:", error)
  }
}

initialPage()

function renderCards(cards) {
  cardList.innerHTML = ''

  //Проверяем что получили массив
  if (Array.isArray(cards)) {
    cards.forEach(card => {
      cardList.appendChild(
        createCard(
          template, 
          card,
          handleLikeClick, showImage, 
          currentUserId,
          handleDeleteClick,
        )
      )
    })
  } else {
    console.error("Ожидался массив карточек, получено:", cards)
  }
}

//Прослушиватели

//Открываем по клику на кнопку
modalEdit.openButton.addEventListener('click', () => {
  fillForm()
  openModal(modals.edit)
  clearValidation(forms.edit, validationConfig)
})

modalAddCard.openButton.addEventListener('click', () => {
  openModal(modals.addCard)
  addCardForm.form.reset()
  clearValidation(forms.addCard, validationConfig)
})

profile.overlay.addEventListener('click', () => {
  openModal(modals.profileImage)
})

//Удаляем карточку
let cardIdToDelete = null
let cardElementToDelete = null

function handleDeleteClick(cardId, cardElement) {
  cardIdToDelete = cardId
  cardElementToDelete = cardElement
  openModal(modals.confirm)
}

modalConfirm.confirmButton.addEventListener('click', () => {
  if (cardIdToDelete && cardElementToDelete) {
    setLoadingState(modalConfirm.confirmButton, true, 'Удаление...')
    deleteCardFromServer(cardIdToDelete)
    .then(() => {
      removeCard(cardElementToDelete)
      closeModal(modals.confirm)
    })
    .catch(err => {
      console.error('Ошибка при удалении карточки:', err)
    })
    .finally(() => {
      setLoadingState(modalConfirm.confirmButton, false)
    })
  } 
})

//Лайк карточки
function handleLikeClick(cardId, cardElement) {
  const isLiked = isLikedCard(cardElement)
  const toggleLike = isLiked ? removeCardLike : addCardLike

  toggleLike(cardId)
    .then((card) => {
      updatedCardLike(cardElement, card.likes)
    })
    .catch((err) => {
      console.error('Ошибка при лайке карточки:', err)
    })
}

//Закрываем окна
popups.forEach((popup) => {
  const closeButton = popup.querySelector('.popup__close')

  //Закрываем по клику на кнопку
  closeButton.addEventListener('click', () => closeModal(popup))

  //Закрываем модалку по клику вне
  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) {
      closeModal(popup)
    }  
  })

  //Анимация окон
  popup.classList.add('popup_is-animated')
})

//Отправляем формы
forms.edit.addEventListener('submit', submitEditForm)

forms.addCard.addEventListener('submit', (evt) => {
  addNewCard(evt, template, showImage, closeModal)
})

forms.profileImage.addEventListener('submit', (evt) => {
  evt.preventDefault()

  const url = forms.profileImage.link.value

  setLoadingState(modalProfileImage.saveButton, true, 'Сохранение...')

  updateUserImage(url)
  .then(url => {
    profile.image.src = url.avatar
    closeModal(modals.profileImage)
  })
  .catch((err) => {
    console.error('Ошибка при обновлении изображения:', err)
  })
  .finally(() => {
    setLoadingState(modalProfileImage.saveButton, false)
  })
})

//Функция просмотра изображения
function showImage(link, name) {
  modalShowImage.image.src = link
  modalShowImage.image.alt = name
  modalShowImage.text.textContent = name
  openModal(modals.showImage)
}

//Создаем новую карточку
function addNewCard (
  evt, 
  template, 
  showImage, 
  closeModal
) {

  evt.preventDefault()

  //Объект с данными новой карточки
  const newCardData = {
    name: addCardForm.name.value,
    link: addCardForm.url.value
  }

  setLoadingState(modalAddCard.saveButton, true, 'Сохранение...')

  addNewCardToServer(newCardData)
    .then((cardFromServer) => {
      const newCard = createCard(
        template,
        cardFromServer,
        handleLikeClick,
        showImage,
        currentUserId,
        handleDeleteClick
      )

      cardList.prepend(newCard)
      addCardForm.form.reset()
      closeModal(modals.addCard)
    })
    .catch((err) => {
      console.error('Ошибка при добавлении карточки:', err)
    })
    .finally(() => {
      setLoadingState(modalAddCard.saveButton, false)
    })
}

//Присваиваем поля форме
function fillForm() {
  editForm.nameInput.value = profile.name.textContent
  editForm.jobInput.value = profile.description.textContent
}

// Обработчик 'отправки' формы
function submitEditForm(evt) {
  evt.preventDefault()

  const newUserData = {
    name: editForm.nameInput.value,
    about: editForm.jobInput.value
  }

  setLoadingState(modalEdit.saveButton, true, 'Сохранение...')

  updateUserProfile(newUserData)
  .then((user) => {
    profile.name.textContent = user.name
    profile.description.textContent = user.about
    closeModal(modals.edit)
  })
  .catch((err) => {
    console.error('Ошибка при обновлении профиля:', err)
  })
  .finally(() => {
    setLoadingState(modalEdit.saveButton, false)
  })
}

//Вызываем валидацию форм
enableValidation(validationConfig)

//Состояние кнопки загрузки
function setLoadingState(button, isLoading, loadingText = 'Сохранение...') {
  if (!button) return

  if (isLoading) {
    button.dataset.originalText = button.textContent
    button.textContent = loadingText
    button.disabled = true
  } else {
    button.textContent = button.dataset.originalText || 'Сохранить'
    button.disabled = false
  }
}
