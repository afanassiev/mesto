const container = document.querySelector('.root');
const popup = container.querySelector('.popup');
const editButton = container.querySelector('.profile__editbutton');
const popupName = container.querySelector('.popup__name');
const popupDescr = container.querySelector('.popup__descr');
const nameProfile = container.querySelector('.profile__name');
const descrProfile = container.querySelector('.profile__descr');
const closeButton = container.querySelector('.popup__close-button');
const saveButton = container.querySelector('.popup__savebutton');

function openForm() {
  popup.classList.add('popup_opened');
  popupName.value = nameProfile.textContent;
  popupDescr.value = descrProfile.textContent;
  container.classList.add('root_scroll-hidden');
}

editButton.addEventListener('click', openForm);

function closeForm() {
  popup.classList.toggle('popup_opened');
  container.classList.toggle('root_scroll-hidden');
}

closeButton.addEventListener('click', closeForm);

let formElement = container.querySelector('.popup__form');

  function formSubmitHandler (evt) {
    evt.preventDefault();
    let nameInput = container.querySelector('.popup__name');
    let jobInput = container.querySelector('.popup__descr');
    let name = nameInput.value;
    let job = jobInput.value;
    let profileName = container.querySelector('.profile__name');
    let profileDescr = container.querySelector('.profile__descr');
    profileName.textContent = name;
    profileDescr.textContent = job;
  }

formElement.addEventListener('submit', formSubmitHandler);
saveButton.addEventListener('click', closeForm);