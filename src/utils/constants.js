export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const container = document.querySelector('.root');
export const editButton = container.querySelector('.profile__editbutton');
export const popupName = container.querySelector('.popup__input_name');
export const popupDescr = container.querySelector('.popup__input_descr');
export const nameProfile = document.querySelector('.profile__name');
export const descrProfile = document.querySelector('.profile__descr');
export const addButton = document.querySelector('.profile__addbutton');
export const formAdder = document.querySelector('.popup__add');
export const formEditor = document.querySelector('.popup__edit');
export const formElement = container.querySelector('.popup__form_profile');
export const formElementSecond = container.querySelector('.popup__form_cards');
export const popupImg = document.querySelector('.popup__image');
export const formSelectorAdder = formAdder.querySelector('form');
export const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorSpan: '.popup__error'
};