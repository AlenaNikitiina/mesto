import { popupCloseButtons } from "./constants.js";

export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
  }

  // Метод открытия попапов
  openPopup () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Метод закрытия попапов
  closePopup () {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  // Метод, закрывает попап клавишей Esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      const openedNowPopup = document.querySelector('.popup_opened')
      this.closePopup(openedNowPopup);
    }
  };

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа.
  setEventListeners (evt) {
    popupCloseButtons.addEventListener ('click', (evt) => {
      this.closePopup();
    });
  }


 /*
  // Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      addFotoPopup.closePopup();
    }
  })
});
  */


}
