import { popupAll } from "./constants";

export class Popup {
  constructor (popupAll) {
    this.popupAll = popupAll;
  }

  // Функция открытия попапов
  openPopup () {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
  }

  // Функция закрытия попапов
  closePopup () {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  }

  // метод, который содержит логику закрытия попапа клавишей Esc.
  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
      const openedNowPopup = document.querySelector('.popup_opened')
      closePopup(openedNowPopup);
    }
  };

  //который добавляет слушатель клика иконке закрытия попапа.
  setEventListeners (evt) {
    popupCloseButtons.addEventListener ('click', (evt) => {
      this.closePopup;
    });
  }

  // Закрыть попапы нажав на оверлей или крестик
  //popupAll.forEach((item) => {
    //item.addEventListener('mousedown', (evt) => {
      //if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        //closePopup(item); }
    //})
  //});

}
