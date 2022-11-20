import { popupAll } from "../utils/constants.js";

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

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа.
  setEventListeners () {
    const popupCloseButtons = this._popupSelector.querySelector('.popup__close-button');
    popupCloseButtons.addEventListener('click', () => {
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

}
