export default class Api {
  constructor(apiConfig) {
    this.url = apiConfig.baseUrl;
    this.headers = apiConfig.headers;
    this.authorizedUserId = apiConfig.authorizedUserId;
  }

  _resultHandler(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  _errorHandler = (err) => {
    console.log(err);
  }

  getUserInfo() {
    return fetch(`${this.url}users/me`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  setUserInfo(data) {
    return fetch(`${this.url}users/me`,
      {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: data.profileNameInput,
          about: data.profileDescrInput
      })
    })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  getInitialCards() {
    return fetch(`${this.url}cards`,
      {
        method: 'GET',
        headers: this.headers
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  addNewCard(item) {
    return fetch(`${this.url}cards`,
      {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: item.placeNameInput,
          link: item.urlInput
        })
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  likeCard(cardId) {
    return fetch(`${this.url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  dislikeCard(cardId) {
    return fetch(`${this.url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
      })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  deleteCard(cardId) {
    return fetch(`${this.url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(this._resultHandler)
      .catch(this._errorHandler)
  }

  changeAvatar(avatar) {
    return fetch(`${this.url}users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar.urlAvatar
      })
    })
        .then(this._resultHandler)
        .catch(this._errorHandler)
  }
}

