import Popup from "./Popup.js";

export default class PopupWithDelete extends Popup {
  constructor(popup) {
    super(popup);
    this._deleteConfirmationButton = this._popup.querySelector('.popup__confirm-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._deleteConfirmationButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
  }

  setSubmit(callback) {
    this._handleFormSubmit = callback;
  }
}