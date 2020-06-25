export function closeButtons(event) {
    const eventTarget = event.target.parentElement.parentElement;
    eventTarget.classList.remove('popup_opened');
}

export function popupCloseEsc (evt) {
    const popupOpened = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        popupOpened.classList.remove('popup_opened');
        this.removeEventListener('keydown', popupCloseEsc);
    }
}