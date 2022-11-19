import { Popup } from "./Popup.js"

export class PopupWithForm extends Popup {
  constructor (popupSelector, callBackSubmitForm) {
    super(popupSelector); //  селектора попапа
    this._callbackSubmitForm = callBackSubmitForm; // колбэк сабмита формы

    this._formInputs = Array.from(this._popupSelector.querySelectorAll('.form__input')); ///// ???
    this._popupForm = this._popupSelector.querySelector('.form');
  }

  // метод, который собирает данные всех полей формы
  _getInputValues () {
    inputValues = {};
    this._formInputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  // + добавлять обработчик сабмита формы родителю
  setEventListeners () {
    super.setEventListeners(); // метод родителя
    // добавляем обработчик сабмита формы
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callBackSubmitForm(this._getInputValues());
      //
      this.closePopup();
    })
  }

  //
  close () {
    super.closePopup(); // вызвали родительский + допишем свой
    this._popupForm.reset(); // сбрасываем текст в инпутах формы
  }

}



/*
  // добавлять обработчик сабмита формы.
  setEventListeners (evt) {
    super.setEventListeners (evt); // вызвали родительский + допишем свой
    console.log("----");
    this._popupForm.addEventListener('submit', this._callbackSubmitForm);
  }

/*
  setEventListeners() { //обработчик сабмита формы.
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
    });
  }
*/
