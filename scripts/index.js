import Card from './Card.js';
import FormValidator from "./FormValidator.js";

const container = document.querySelector('.root');
const popup = container.querySelector('.popup');
const editButton = container.querySelector('.profile__editbutton');
const popupName = container.querySelector('.popup__input_name');
const popupDescr = container.querySelector('.popup__input_descr');
const nameProfile = container.querySelector('.profile__name');
const descrProfile = container.querySelector('.profile__descr');
const closeButton = container.querySelector('.popup__close-button');
const closeButtonCards = container.querySelector('.popup__close-button_cards');
const itemContainer = document.querySelector('.elements');
const addButton = document.querySelector('.profile__addbutton');
const formAdder = container.querySelector('.popup__add');
const formElement = container.querySelector('.popup__form_profile');
const formElementSecond = container.querySelector('.popup__form_cards');
const newItemName = document.querySelector('.popup__input_placename');
const newItemLink = document.querySelector('.popup__input_link');
const elements = document.querySelector('.elements');
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
];

function getPopupValues() {
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
}

function popupToggle() {
  popup.classList.toggle('popup_opened');
}

function openForm() {
  popupToggle();
  getPopupValues();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  descrProfile.textContent = popupDescr.value;
  popupToggle();
}

function addFormToggle() {
  formAdder.classList.toggle('popup_opened');
  newItemName.value = '';
  newItemLink.value = '';
}

function cardSubmit (evt) {
  evt.preventDefault();
  const item = {
    name: newItemName.value,
    link: newItemLink.value
  }
  const card = new Card (item, '#item-template').generateCard();
  elements.prepend(card);
  addFormToggle();
}

export function closeButtons() {
  const closeButtonArray = document.querySelectorAll('.popup__close-button');
  closeButtonArray.forEach(item => item.addEventListener('click', function (event) {
    const eventTarget = event.target.parentElement.parentElement;
    eventTarget.classList.remove('popup_opened');
  }));
}

initialCards.forEach((itemElement) => {
  const card = new Card(itemElement, '.item__template');
  const cardElement = card.generateCard();
  itemContainer.prepend(cardElement);
});

const popupCloseOverlay = Array.from(document.querySelectorAll('.popup'));
popupCloseOverlay.forEach(element => {
  element.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      evt.target.classList.remove('popup_opened');
    }
  });
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
    element.classList.remove('popup_opened');
    }
  });
});

editButton.addEventListener('click', openForm);
addButton.addEventListener('click', addFormToggle);

closeButton.addEventListener('click', closeButtons);
closeButtonCards.addEventListener('click', closeButtons);

formElement.addEventListener('submit', formSubmitHandler);
formElementSecond.addEventListener('submit', cardSubmit);

const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validateFormCard = new FormValidator(formValidationOptions, formElementSecond);
const validateFormProfile = new FormValidator(formValidationOptions, formElement);
validateFormCard.enableValidation();
validateFormProfile.enableValidation();