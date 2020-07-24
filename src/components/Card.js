export default class Card {
  constructor(authorizedUserId, {name, link, _id, likes, owner}, cardSelector, {handleCardClick, likeCard, dislikeCard, deleteCard}) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._authorizedUserId = authorizedUserId;
    this._owner = owner;
    this._likes = likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
    this._deleteCard = deleteCard;
    this._element = this._getTemplate();
    this._checkboxElement = this._element.querySelector('.item__checkbox');
    this._deleteButtonElement = this._element.querySelector('.item__delete-button');
    this._imageElement = this._element.querySelector('.item__image');
    this._titleElement = this._element.querySelector('.item__title');
    this._likeCounter = this._element.querySelector('.item__like-counter');
  }

  _getTemplate() {
    return document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.item')
        .cloneNode(true);
  }

  generateCard() {
    this._titleElement.textContent = this._name;
    this._imageElement.src = this._link;
    this._element.id = this._id;
    this._likeCounter.textContent = `${this._likes.length}`;
    if (this._checkUserActivityLike()) {
      this._checkboxElement.classList.add('item__checkbox_active')
    }
    if (!this._checkUserOwnershipCard()) {
      this._deleteButtonElement.style.display = 'none';
    }
    this._setEventListeners();
    return this._element;
  }

  toggleLikeButton = () => {
    this._checkboxElement.classList.toggle('item__checkbox_active');
  }

  _renderLikeButton = () => {
    if (!this._checkboxElement.classList.contains('item__checkbox_active')) {
      this._likeCard()
    } else {
      this._dislikeCard()
    }
  }

  renderLikeCounter(arr) {
    this._likeCounter.textContent = arr.length;
  }

  deletePopupButton = () => {
    this._element.remove();
    this._element = null;
  }

  _handleCardClickListener = () => {
    this._handleCardClick(this._name, this._link);
  }

  _checkUserActivityLike() {
    return this._likes.some(like => like._id === this._authorizedUserId);
  }

  _checkUserOwnershipCard() {
    return this._owner._id === this._authorizedUserId;
  }

  _setEventListeners() {
    this._checkboxElement.addEventListener('click', this._renderLikeButton);
    this._deleteButtonElement.addEventListener('click', () => {
      this._deleteCard(this._element)
    });
    this._imageElement.addEventListener('click', this._handleCardClickListener);
  }
}