const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-39',
  headers: {
    authorization: 'daa398e8-348d-4f2b-b428-75865f0182fc',
    'Content-Type': 'application/json'
  }
}

//Обрабатываем данные
const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`)
  }
  return res.json()
}

//Загрузка инфо о пользователе
export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(res => {
    return getResponseData(res)
    })
}


//Обновляем данные пользователя
export const updateUserProfile = (userData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userData.name,
      about: userData.about
    })
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Обновляем аватар пользователя
export const updateUserImage = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: url,
    })
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Загрузка карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Добавляем новую карточку на сервер
export const addNewCardToServer = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: {
      ...config.headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link
    })
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Удаляем карточку с сервера
export const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Добавляем лайк карточке
export const addCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

//Удаляем лайк с карточки
export const removeCardLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(res => {
    return getResponseData(res)
  })
}

