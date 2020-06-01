const container = document.querySelector('.root');
const popup = container.querySelector('.popup');
const editButton = container.querySelector('.profile__editbutton');
const popupName = container.querySelector('.popup__input_name');
const popupDescr = container.querySelector('.popup__input_descr');
const nameProfile = container.querySelector('.profile__name');
const descrProfile = container.querySelector('.profile__descr');
const closeButton = container.querySelector('.popup__close-button');
const closeButtonCards = container.querySelector('.popup__close-button_cards');
const imagePopup = container.querySelector('.popup__image');
const imagePic = container.querySelector('.popup__image-pic');
const imageName = container.querySelector('.popup__image-name');
const itemContainer = document.querySelector('.elements');
const itemTemplate = document.querySelector('.item__template').content;
const addButton = document.querySelector('.profile__addbutton');
const formAdder = container.querySelector('.popup__add');
const formElement = container.querySelector('.popup__form_profile');
const formElementSecond = container.querySelector('.popup__form_cards');
const newItemName = document.querySelector('.popup__input_placename');
const newItemLink = document.querySelector('.popup__input_link');
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

function getInput() {
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
}

function popupToggle() {
  (popup.classList.toggle('popup_opened'));
}

function openForm() {
  popupToggle();
  getInput();
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = popupName.value;
  descrProfile.textContent = popupDescr.value;
  popupToggle();
}

function addFormToggle() {
  formAdder.classList.toggle('popup_opened');
}

function cardSubmit (evt) {
  evt.preventDefault();
  addCard(newItemName.value, newItemLink.value);
  addFormToggle();
}

function closeButtons() {
  let closeButtonArray = document.querySelectorAll('.popup__close-button');
  closeButtonArray.forEach(item => item.addEventListener('click', function (event) {
    let eventTarget = event.target.parentElement.parentElement;
    eventTarget.classList.remove('popup_opened');
  }));
}

function addCard (name, link) {
  let itemElement = itemTemplate.cloneNode(true);
  let itemImage = itemElement.querySelector('.item__image');
  itemImage.src = link;
  itemImage.addEventListener('click', function (evt) {
    imagePopup.classList.toggle('popup_opened');
    imagePic.src = link;
    imageName.textContent = name;
    closeButtons();
  });
  itemElement.querySelector('.item__title').textContent = name;
  itemElement.querySelector('.item__checkbox').addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__checkbox_active');
  });
  itemElement.querySelector('.item__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  itemContainer.prepend(itemElement);
}

initialCards.forEach(function (itemElement) {
  addCard(itemElement.name, itemElement.link);
});

editButton.addEventListener('click', openForm);
addButton.addEventListener('click', addFormToggle);

closeButton.addEventListener('click', closeButtons);
closeButtonCards.addEventListener('click', closeButtons);

formElement.addEventListener('submit', formSubmitHandler);
formElementSecond.addEventListener('submit', cardSubmit);