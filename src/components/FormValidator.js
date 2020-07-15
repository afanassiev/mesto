export default class FormValidator {
  constructor(formValidationOptions, formElem) {
    this._formElem = formElem;
    // this._formValidationOptions = formValidationOptions;
    this._inputSelector = formValidationOptions.inputSelector;
    this._submitButtonSelector = formValidationOptions.submitButtonSelector;
    this._inactiveButtonClass = formValidationOptions.inactiveButtonClass;
    this._inputErrorClass = formValidationOptions.inputErrorClass;
    this._errorClass = formValidationOptions.errorClass;
    this._errorSpanSelector = formValidationOptions.errorSpan;
    this._inputList = Array.from(this._formElem.querySelectorAll(this._inputSelector));
    this._spanList = Array.from(this._formElem.querySelectorAll(this._errorSpanSelector));
  }

  _getErrorMessage (inputElem) {
    return this._formElem.querySelector(`#${inputElem.id}-error`);
}

  _showInputError(inputElem) {
    const errorElem = this._getErrorMessage(inputElem);
    errorElem.textContent = inputElem.validationMessage;
    errorElem.classList.add(this._errorClass);
    inputElem.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElem) {
    const errorElem = this._getErrorMessage(inputElem);
    errorElem.textContent = '';
    errorElem.classList.remove(this._errorClass);
    inputElem.classList.remove(this._inputErrorClass);
  }

  _inputValidation(inputElem) {
    if (!inputElem.validity.valid) {
      this._showInputError(inputElem, inputElem.validationMessage);
    } else {
      this._hideInputError(inputElem);
    }
  }

  _toggleButtonState() {
    const buttonElement = this._formElem.querySelector(this._submitButtonSelector);
    if (!this._formElem.checkValidity())
      buttonElement.classList.add(this._inactiveButtonClass);
     else
       buttonElement.classList.remove(this._inactiveButtonClass);
}

  clearError() {
    this._inputList.forEach((inputElem) => {
      if (inputElem.classList.contains(this._inputErrorClass)) {
        inputElem.classList.remove(this._inputErrorClass);
      }
    });
    this._spanList.forEach((error) => {
      error.classList.remove(this._errorClass);
      error.textContent = '';
    });
    this._toggleButtonState();
  }

  enableValidation () {
    this._inputList.forEach((inputElem) => {
      inputElem.addEventListener('input', () => {
        this._inputValidation(inputElem);
        this._toggleButtonState(this._formElem)
      })
    });
  }
}