export default class FormValidator {
  constructor(formValidationOptions, formElem) {
    this._formElem = formElem;
    this._inputSelector = formValidationOptions.inputSelector;
    this._submitButtonSelector = formValidationOptions.submitButtonSelector;
    this._inactiveButtonClass = formValidationOptions.inactiveButtonClass;
    this._inputErrorClass = formValidationOptions.inputErrorClass;
    this._errorClass = formValidationOptions.errorClass;
  }

  _getErrorMessage (inputElem) {
    return document.querySelector(`#${inputElem.id}-error`);
}

  _showInputError(inputElem) {
    const errorElem = this._getErrorMessage(inputElem);
    errorElem.textContent = inputElem.validationMessage;
    errorElem.classList.add(this._errorClass);
    inputElem.classList.add(this._inputErrorClass);
    console.log('_showInputError');
  }

  _hideInputError(inputElem) {
    const errorElem = this._getErrorMessage(inputElem);
    errorElem.textContent = '';
    errorElem.classList.remove(this._errorClass);
    inputElem.classList.remove(this._inputErrorClass);
    console.log('_hideInputError');
  }

  _inputValidation(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  _toggleButtonState(formElem) {
    const buttonElement = formElem.querySelector(this._submitButtonSelector);
    if (!formElem.checkValidity())
      buttonElement.classList.add(this._inactiveButtonClass);
     else
       buttonElement.classList.remove(this._inactiveButtonClass);
}

  enableValidation () {
    const inputList = Array.from(this._formElem.querySelectorAll(this._inputSelector));
    inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this._inputValidation(inputElem);
        this._toggleButtonState(this._formElem)
      })
    });
  }

}