import { Popup } from "./Popup"

export class PopupWithForm extends Popup {
  constructor (popupSelector, callBackSubmitForm) {
    super(popupSelector); //  селектора попапа
    this._callbackSubmitForm = callBackSubmitForm; // колбэк сабмита формы

  }

  // метод, который собирает данные всех полей формы
  _getInputValues () {
    c
  }

  // добавлять обработчик сабмита формы.
  setEventListeners () {
    super.setEventListeners (); // наследуем + допишем родительский

  }

  close () {
    super.closePopup(); // наследуем + допишем родительский
    this._a.reset();
  }
}
