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
const initialCards = [
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
let newItemName = document.querySelector('.popup__input_placename');
let newItemLink = document.querySelector('.popup__input_link');

function getInput() {
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
}

function openForm() {
  popup.classList.toggle('popup_opened');
  getInput();
}
editButton.addEventListener('click', openForm);

function closeForm() {
  popup.classList.toggle('popup_opened');
}
closeButton.addEventListener('click', closeForm);

  function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = popupName.value;
    descrProfile.textContent = popupDescr.value;
    closeForm();
  }
formElement.addEventListener('submit', formSubmitHandler);

function closeButtons() {
  let closeButtonArray = document.querySelectorAll('.popup__close-button');
  console.log(closeButtonArray);
  closeButtonArray.forEach(item => item.addEventListener('click', closeButtonEvent));
}

function closeButtonEvent(event) {
  let eventTarget = event.target.parentElement.parentElement;
  console.log(eventTarget);
  eventTarget.classList.remove('popup_opened');
}

function getCard (name, link) {
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
  itemContainer.append(itemElement);
}

initialCards.forEach(function (itemElement) {
  getCard(itemElement.name, itemElement.link);
});

addButton.addEventListener('click', openAdder);

function openAdder() {
  formAdder.classList.toggle('popup_opened');
}

function addCard () {
  let itemElement = itemTemplate.cloneNode(true);
  let itemImage = itemElement.querySelector('.item__image');
  itemImage.src = newItemLink.value;
  // itemElement.querySelector('.item__image').src = newItemLink.value;
  itemElement.querySelector('.item__title').textContent = newItemName.value;
  itemImage.addEventListener('click', function (evt) {
    imagePopup.classList.toggle('popup_opened');
    imagePic.src = newItemLink.value;
    imageName.textContent = newItemName.value;
    closeButtons();
  });
  itemElement.querySelector('.item__checkbox').addEventListener('click', function (evt) {
    evt.target.classList.toggle('item__checkbox_active');
  });
  itemElement.querySelector('.item__delete-button').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  });
  itemContainer.prepend(itemElement);
}

function cardSubmit (evt) {
  evt.preventDefault();
  addCard();
  closeFormCards();
}

formElementSecond.addEventListener('submit', cardSubmit);

function closeFormCards() {
  formAdder.classList.toggle('popup_opened');
}

closeButtonCards.addEventListener('click', closeFormCards);

