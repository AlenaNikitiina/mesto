import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor (popupSelector, callBackSubmitForm) {
    super(popupSelector); //  селектора попапа
    this._callbackSubmitForm = callBackSubmitForm; // колбэк сабмита формы

    this._formInputs = Array.from(this._popup.querySelectorAll('.form__input')); // сделали руками массив из всех импутов
    this._popupForm = this._popup.querySelector('.popup__form');

    //
    this._button = this._popup.querySelector('button[type="submit"]');
    this._buttonDefaultText = this._button.textContent;

  };

  // метод, который собирает данные из всех полей формы
  _getInputValues () {
    const inputValues = {}; // сделали пустой обьект
    // в него добавляем значения всех полей и присваиваем значение
    this._formInputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  };

  // + добавлять обработчик сабмита формы родителю
  setEventListeners () {
    super.setEventListeners(); // метод родителя
    this._popupForm.addEventListener('submit', this._submit.bind(this)); // добавляем обработчик сабмита формы
  };

  //
  _submit (evt) {
    evt.preventDefault();

    this._callbackSubmitForm(this._getInputValues());
    this.close();
  };

  //
  close () {
    super.close(); // вызвали родительский + допишем свой
    this._popupForm.reset(); // сбрасываем текст в инпутах формы
  };

  //ч к
  renderLoading(isSending) {
    this._button.textContent = isSending ? 'Сохранение...' : this._buttonDefaultText;
  }
}
