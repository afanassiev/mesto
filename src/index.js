import './pages/index.css';
import Section from "./components/Section.js";
import Card from './components/Card.js';
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import {
  initialCards,
  container,
  editButton,
  popupName,
  popupDescr,
  nameProfile,
  descrProfile,
  addButton,
  formAdder,
  formEditor,
  formElement,
  formElementSecond,
  formValidationOptions,
  popupImg,
  formSelectorAdder
} from './utils/constants.js';

const popupImage = new PopupWithImage(popupImg);
popupImage.setEventListeners();

initialCards.reverse();

function createInitialCards(cardItem) {
  const initialCard = new Card(cardItem, '#item-template', {
    handleCardClick: () => {
      popupImage.open(cardItem.name, cardItem.link);
    }
  });
  const cardElement = initialCard.generateCard();
  defaultCardsList.addItem(cardElement);
}

const defaultCardsList = new Section({
  items: initialCards,
  renderer: ((cardItem) => {
    createInitialCards(cardItem);
  })},
  '.elements'
);

defaultCardsList.renderItems();

const addForm = new PopupWithForm(formAdder, {
  handleFormSubmit: (item) => {
    const newCard = {
      name: item.placeNameInput,
      link: item.urlInput
    }
    createInitialCards(newCard);
  }
})

const userData = new UserInfo({
  nameProfile: nameProfile,
  descrProfile: descrProfile });

const editForm = new PopupWithForm(formEditor, {
  handleFormSubmit: (item) => {
    userData.setUserInfo(item);
  }
});

editForm.setEventListeners();
addForm.setEventListeners();

function openEditForm () {
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
  editForm.open();
}

editButton.addEventListener('click', openEditForm);
addButton.addEventListener('click', () => {
  formSelectorAdder.reset();
  addForm.open();
});

const validateFormCard = new FormValidator(formValidationOptions, formElementSecond);
const validateFormProfile = new FormValidator(formValidationOptions, formElement);
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
