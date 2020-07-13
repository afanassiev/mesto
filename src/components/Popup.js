export default class Popup {
  constructor(popupSelector) {
    this._itemElement = popupSelector;
  }

  open() {
    this._itemElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('click', this._handleOverlayClose);
  }

  close() {
    this._itemElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('click', this._handleOverlayClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  setEventListeners() {
    const closeButton = this._itemElement.querySelector('.popup__close-button');
    closeButton.addEventListener('click', () => {
      this.close();
    });
  }
}