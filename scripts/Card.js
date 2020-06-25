import {closeButtons, popupCloseEsc} from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
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

  _toggleImagePopup() {
    document.querySelector('.popup__image').classList.toggle('popup_opened');
    document.querySelector('.popup__image-pic').src = this._link;
    document.querySelector('.popup__image-name').textContent = this._name;
    document.querySelector('.popup__close-button_image').addEventListener('click', closeButtons);
    document.addEventListener('keydown', popupCloseEsc);
  }

  _toggleLikeButton() {
    this._element.querySelector('.item__checkbox').classList.toggle('item__checkbox_active');
  }

  _deletePopupButton() {
    this._element.remove();
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
      this._toggleImagePopup();
    });
  }
}