import { popupAll, popupCloseButtons } from "../utils/constants.js";

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

  // Метод, закрывает попап по нажатию на Esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  };

  /*
  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа.
  setEventListeners (evt) {
    popupCloseButtons.addEventListener('click', (evt) => {
      this.closePopup();
    });
  }
  */

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа.
  setEventListeners () {
    const buttonClose = this._popupSelector.querySelector('.popup__close-button');
    buttonClose.addEventListener('click', () => {
      this.closePopup();
    });
    // клик вне формы
    popupAll.forEach((item) => {
      item.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
          this.closePopup();
        }
      })
    });
  }

  /*
  // Закрыть попапы нажав на оверлей или крестик
  popupAll.forEach((item) => {
    item.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
        const popupToClose = new Popup(item);
        popupToClose.closePopup();
    })
  });
  */

}
