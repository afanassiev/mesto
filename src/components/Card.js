export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._checkboxElement = this._element.querySelector('.item__checkbox');
    this._deleteButtonElement = this._element.querySelector('.item__delete-button');
    this._imageElement = this._element.querySelector('.item__image');
  }

  _getTemplate() {
    return document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.item')
        .cloneNode(true);
  }

  generateCard() {
    this._element.querySelector('.item__title').textContent = this._name;
    this._element.querySelector('.item__image').src = this._link;
    this._setEventListeners();
    return this._element;
  }

  _toggleLikeButton = (evt) => {
    this._checkboxElement.classList.toggle('item__checkbox_active');
  }

  _deletePopupButton = (evt) => {
    this._element.remove();
    this._removeEventListeners();
    this._element = null;
  }

  _handleCardClickListener = (evt) => {
    this._handleCardClick(this._name, this._link);
  }

  _setEventListeners() {
    this._checkboxElement.addEventListener('click', this._toggleLikeButton);
    this._deleteButtonElement.addEventListener('click', this._deletePopupButton);
    this._imageElement.addEventListener('click', this._handleCardClickListener);
  }

  _removeEventListeners() {
    this._checkboxElement.removeEventListener('click', this._toggleLikeButton);
    this._deleteButtonElement.removeEventListener('click', this._deletePopupButton);
    this._imageElement.removeEventListener('click', this._handleCardClickListener);
  }
}