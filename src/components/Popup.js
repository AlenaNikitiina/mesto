import { popupAll } from "../utils/constants.js";

export class Popup {
  constructor (popupSelector) {
    this._popupSelector = popupSelector;
    this._popup = document.querySelectorAll('.popup');

    this._handleEscClose = this._handleEscClose.bind(this); //  привязали 1 раз
  };

  // Метод открытия попапов
  open () {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); // передаем и удаляем ссылку
  };

  // Метод закрытия попапов
  close () {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  };

  // Метод, закрывает попап по нажатию на Esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  };

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа
  setEventListeners () {
    const popupCloseButtons = this._popupSelector.querySelector('.popup__close-button');
    popupCloseButtons.addEventListener('click', () => {
      this.close();
    });

    // клик вне формы
    this._popup.forEach((item) => {
      item.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      })
    });
  };

}
