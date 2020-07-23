export const container = document.querySelector('.root');
export const editButton = container.querySelector('.profile__editbutton');
export const popupName = container.querySelector('.popup__input_name');
export const popupDescr = container.querySelector('.popup__input_descr');
export const nameProfile = document.querySelector('.profile__name');
export const descrProfile = document.querySelector('.profile__descr');
export const addButton = document.querySelector('.profile__addbutton');
export const formAdder = document.querySelector('.popup__add');
export const formEditor = document.querySelector('.popup__edit');
export const formConfirmation = document.querySelector('.popup__delete-confirmation');
export const formAvatar = document.querySelector('.popup__avatar');
export const linkAvatar = document.querySelector('.profile__avatar');
export const formAvatarButton = document.querySelector('.profile__avatar-button');
export const formElement = container.querySelector('.popup__form_profile');
export const formElementSecond = container.querySelector('.popup__form_cards');
export const formElementAvatar = container.querySelector('.popup__form_avatar');
export const popupImg = document.querySelector('.popup__image');
export const formSelectorAdder = formAdder.querySelector('form');
export const formAvatarSelector = formAvatar.querySelector('form');
export const formValidationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__savebutton',
  inactiveButtonClass: 'popup__savebutton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  errorSpan: '.popup__error'
};

export const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-13/',
  authorizedUserId: '36b7746313f131617c443126',
  headers: {
    authorization: '9bf88dfb-94a4-43bc-a7b7-687a025522ae',
    'Content-Type': 'application/json'
  }
}