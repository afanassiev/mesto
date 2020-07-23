import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, {handleFormSubmit}) {
    super(popup);
    this._handleFormSubmit = handleFormSubmit;
    this._itemElement = this._popup.querySelector('.popup__form');
    this._saveButton = this._popup.querySelector('.popup__savebutton');
    this._saveButtonText = this._saveButton.textContent;
  }

  getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.getInputValues());
      this.close();
    })
  }

  showSaveMessage () {
    this._saveButton.textContent = "Сохранение...";
  }

  hideSaveMessage() {
    this._saveButton.textContent = this._saveButtonText;
  }

  close() {
    super.close();
    this._itemElement.reset();
  }
}