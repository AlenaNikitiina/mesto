class PopupWithImage extends Popup {
  constructor () {

  }

  // Функция открытия попапов
  openPopup () {
    item.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
    }

}
