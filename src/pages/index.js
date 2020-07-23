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
  addButton,
  apiConfig,
  descrProfile,
  editButton,
  formAdder,
  formEditor,
  formConfirmation,
  formAvatar,
  formElement,
  formElementSecond,
  formSelectorAdder,
  formValidationOptions,
  nameProfile,
  popupDescr,
  popupImg,
  popupName,
  linkAvatar,
  formAvatarButton,
  formElementAvatar,
  formAvatarSelector,
} from '../utils/constants.js';

const api = new Api(apiConfig);

api.getUserInfo()
  .then((res) => {
    userData.setUserInfo(res);
  });

const popupImage = new PopupWithImage(popupImg);
popupImage.setEventListeners();

const authorizedUserId = api.authorizedUserId;

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

const defaultCardsList = new Section({
    renderer: ((cardItem) => {
      renderCard(cardItem);
    })},
  '.elements'
);

api.getInitialCards()
  .then((res) => {
    defaultCardsList.renderItems(res);
  });

const addForm = new PopupWithForm(formAdder, {
  handleFormSubmit: () => {
    const getInputValue = addForm.getInputValues();
    addForm.showSaveMessage();
    api.addNewCard(getInputValue)
      .then((cardItem) => {
        renderCard(cardItem);
        addForm.hideSaveMessage();
      })
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
        editForm.hideSaveMessage();
      })
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
        changeAvatarForm.hideSaveMessage();
      })
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