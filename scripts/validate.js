const showInputError = (formElem, inputElem, errorMessage) => {
  const errorElem = formElem.querySelector(`#${inputElem.id}-error`);
  inputElem.classList.add('popup__input_type_error');
  errorElem.textContent = errorMessage;
  errorElem.classList.add('popup__error_visible');
};

const hideInputError = (formElem, inputElem) => {
  const errorElem = formElem.querySelector(`#${inputElem.id}-error`);
  inputElem.classList.remove('popup__input_type_error');
  errorElem.classList.remove('popup__error_visible');
  errorElem.textContent = '';
};

const inputValidation = (formElem, inputElem) => {
    if (!inputElem.validity.valid) {
    showInputError(formElem, inputElem, inputElem.validationMessage);
  } else {
    hideInputError(formElem, inputElem);
  }
};

const setEventListeners = (formElem) => {
  const inputList = Array.from(formElem.querySelectorAll('.popup__input'));
  const buttonElement = formElem.querySelector('.popup__savebutton');
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElem) => {
    inputElem.addEventListener('input', function () {
      inputValidation(formElem, inputElem);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElem) => {
    formElem.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElem);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElem) => {
    return !inputElem.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__savebutton_disabled');
  } else {
    buttonElement.classList.remove('popup__savebutton_disabled');
  }
}