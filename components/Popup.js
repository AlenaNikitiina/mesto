import { popupCloseButtons } from "../utils/constants.js";

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
      //const openedNowPopup = document.querySelector('.popup_opened')
      this.closePopup();
    }
  };

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа.
  setEventListeners (evt) {
    popupCloseButtons.addEventListener ('click', (evt) => {
      this.closePopup();
    });
  }

  // Закрыть попапы нажав на оверлей или крестик


}
