import './index.css';
import Section from "../components/Section.js";
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import {
  apiConfig,
  formValidationOptions,
  container
} from '../utils/constants.js';

const editButton = container.querySelector('.profile__editbutton');
const popupName = container.querySelector('.popup__input_name');
const popupDescr = container.querySelector('.popup__input_descr');
const nameProfile = document.querySelector('.profile__name');
const descrProfile = document.querySelector('.profile__descr');
const addButton = document.querySelector('.profile__addbutton');
const formAdder = document.querySelector('.popup__add');
const formEditor = document.querySelector('.popup__edit');
const formConfirmation = document.querySelector('.popup__delete-confirmation');
const formAvatar = document.querySelector('.popup__avatar');
const linkAvatar = document.querySelector('.profile__avatar');
const formAvatarButton = document.querySelector('.profile__avatar-button');
const formElement = container.querySelector('.popup__form_profile');
const formElementSecond = container.querySelector('.popup__form_cards');
const formElementAvatar = container.querySelector('.popup__form_avatar');
const popupImg = document.querySelector('.popup__image');
const formSelectorAdder = formAdder.querySelector('form');
const formAvatarSelector = formAvatar.querySelector('form');

const api = new Api(apiConfig);

api.getUserInfo()
  .then((res) => {
    userData.setUserInfo(res);
  });

const popupImage = new PopupWithImage(popupImg);
popupImage.setEventListeners();

const authorizedUserId = api.authorizedUserId;

let defaultCardsList = {};

function renderCard(cardItem) {
  const newCard = new Card(authorizedUserId, cardItem, '#item-template', {
      handleCardClick: () => {
        popupImage.open(cardItem.name, cardItem.link)
      },
      likeCard: () => {
        api.likeCard(cardItem._id)
          .then((cardItem) => {
            newCard.renderLikeCounter(cardItem.likes);
            newCard.toggleLikeButton();
          })
      },
      dislikeCard: () => {
        api.dislikeCard(cardItem._id)
          .then((cardItem) => {
            newCard.renderLikeCounter(cardItem.likes);
            newCard.toggleLikeButton();
          })
      },
      deleteCard: () => {
        deleteCardSubmitForm.open();
        deleteCardSubmitForm.setSubmit(function () {
          api.deleteCard(newCard._id)
            .then(() => {
              newCard.deletePopupButton();
            })
        })
      }
    }
  // }
  )
  const cardElement = newCard.generateCard();
  defaultCardsList.addItem(cardElement);
}

const initialCards = () => {
  api.getInitialCards().then(res => {
    defaultCardsList = new Section({
    items: res,
    renderer: ((cardItem) => {
      renderCard(cardItem);
    })},
  '.elements'
);
    defaultCardsList.renderItems();
  })
}

initialCards();

const addForm = new PopupWithForm(formAdder, {
  handleFormSubmit: () => {
    const getInputValue = addForm.getInputValues();
    addForm.showSaveMessage();
    api.addNewCard(getInputValue)
      .then((cardItem) => {
        renderCard(cardItem);
      })
      .finally(() => {
        addForm.close();
        addForm.hideSaveMessage();
      });
  }
})

const userData = new UserInfo({
  _id: authorizedUserId,
  nameProfile: nameProfile,
  descrProfile: descrProfile,
  linkAvatar: linkAvatar
});

const editForm = new PopupWithForm(formEditor, {
  handleFormSubmit: () => {
    editForm.showSaveMessage();
    const getInputValue = editForm.getInputValues();
    api.setUserInfo(getInputValue)
      .then((data) => {
        userData.setUserInfo(data);
      })
      .finally(() => {
        editForm.close();
        editForm.hideSaveMessage();
      });
  }
});

const deleteCardSubmitForm = new PopupWithDelete(formConfirmation);

const changeAvatarForm = new PopupWithForm(formAvatar, {
  handleFormSubmit: () => {
    const getInputValue = changeAvatarForm.getInputValues();
    changeAvatarForm.showSaveMessage();
    api.changeAvatar(getInputValue)
      .then((data) => {
        userData.setUserInfo(data);
      })
      .finally(() => {
        changeAvatarForm.close();
        changeAvatarForm.hideSaveMessage();
      });
  }
})

editForm.setEventListeners();
addForm.setEventListeners();
deleteCardSubmitForm.setEventListeners();
changeAvatarForm.setEventListeners();

function openEditForm () {
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
  editForm.open();
}

const validateFormCard = new FormValidator(formValidationOptions, formElementSecond);
const validateFormProfile = new FormValidator(formValidationOptions, formElement);
const validateFormAvatar = new FormValidator(formValidationOptions, formElementAvatar);
validateFormCard.enableValidation();
validateFormProfile.enableValidation();
validateFormAvatar.enableValidation();

editButton.addEventListener('click', () => {
  validateFormProfile.clearError();
  const dataProfile = userData.getUserInfo();
  popupName.value = dataProfile.name;
  popupDescr.value = dataProfile.about;
  openEditForm();
});
addButton.addEventListener('click', () => {
  formSelectorAdder.reset();
  validateFormCard.clearError();
  addForm.open();
});
formAvatarButton.addEventListener('click', () => {
  formAvatarSelector.reset();
  validateFormAvatar.clearError();
  changeAvatarForm.open();
})