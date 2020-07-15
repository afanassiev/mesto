export default class Card {
  constructor(data, cardSelector, {handleCardClick}) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.item')
        .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.item__title').textContent = this._name;
    this._element.querySelector('.item__image').src = this._link;
    this._setEventListeners();
    return this._element;
  }

  _toggleLikeButton() {
    this._element.querySelector('.item__checkbox').classList.toggle('item__checkbox_active');
  }

  _deletePopupButton() {
    this._element.remove();
    this._element.removeEventListener('click', this._setEventListeners());
    this._element = null;
  }

  _setEventListeners() {
    this._element.querySelector('.item__checkbox').addEventListener('click', () => {
      this._toggleLikeButton();
    });
    this._element.querySelector('.item__delete-button').addEventListener('click', () => {
      this._deletePopupButton();
    });
    this._element.querySelector('.item__image').addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}