//Показываем ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
  inputElement.classList.add(config.inputErrorClass)
  errorElement.textContent = errorMessage
  errorElement.classList.add(config.errorClass)
}

//Скрываем ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`)
  inputElement.classList.remove(config.inputErrorClass)
  errorElement.textContent = ''
  errorElement.classList.remove(config.errorClass)
}

//Функция валидации форм
function checkInputValidity(formElement, inputElement, config) {
  inputElement.setCustomValidity('')

  if (inputElement.dataset.errorMessage && inputElement.validity.patternMismatch) {
    const message = inputElement.dataset.errorMessage
    inputElement.setCustomValidity(message)
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config)
  } else {
    hideInputError(formElement, inputElement, config)
  }
}

//Проверка на невалидные поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid)
}

//Меняем состояние кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass)
    buttonElement.disabled = true
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass)
    buttonElement.disabled = false
  }
}

//'Вешаем' слушатели на поля
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  toggleButtonState(inputList, buttonElement, config)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config)
      toggleButtonState(inputList, buttonElement, config)
    })
  })
}

//Активируем валидацию форм
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    setEventListeners(formElement, config)
  })
}

//Удаляем ошибки
function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector))
  const buttonElement = formElement.querySelector(config.submitButtonSelector)

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config)
  })

  toggleButtonState(inputList, buttonElement, config)
}

export {clearValidation, enableValidation}