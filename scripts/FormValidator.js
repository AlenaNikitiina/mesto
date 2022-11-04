export class FormValidator {
  constructor(selectors_setting, form_to_valid,) {
    this._selectors_setting = selectors_setting;
    this._form_to_valid = form_to_valid;
    // formElementAll = это теперь this._element_to_valid
    // setting = это теперь this._selectors_setting
  }

  // Метод, который вкл валидацию формы
  enableValidation() {
    this._setEventListeners();
  }

  // Метод, который добавляет класс с ошибкой импуту
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._form_to_valid.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._selectors_setting.inputErrorClass);  // добавьте класс ошибки элементу input
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors_setting.inputErrorClassActiv); // Показываем сообщение об ошибке
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError (inputElement) {
    // Находим элемент ошибки
    const errorElement = this._form_to_valid.querySelector(`.${inputElement.id}-error`); // нашли ошибку из спана на основе уникального класса
    inputElement.classList.remove(this._selectors_setting.inputErrorClass);
    errorElement.classList.remove(this._selectors_setting.inputErrorClassActiv); // Скрываем сообщение об ошибке
    errorElement.textContent = ''; // Очистим ошибку
  }

  // Метод, который проверяет валидность поля
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажи ошибку
      this._showInputError(inputElement, inputElement.validationMessage); // получает параметром форму, в которой находится проверяемое поле, и само это поле
    } else {
      // Если проходит, скрой
      this._hideInputError(inputElement);
    }
  }

  // Метод, кот вкл/откл кнопку.
  _toggleButtonState () {
    this.disableSubmitButton();
  }

  // 6 Метод, которая проверит все инпуты в форме валидное/нет, принимает массив полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция вернёт true
    })
  }

  // 4 Метод, который добавляет слушатель событий всем полям ввода внутри формы
  _setEventListeners() {
    this._inputList = Array.from(this._form_to_valid.querySelectorAll(this._selectors_setting.inputSelector)); // Находим все поля внутри формы, сделаем из них массив
    this._buttonElement = this._form_to_valid.querySelector(this._selectors_setting.submitButtonSelector);
    this._toggleButtonState(); // Вызовем ее, чтобы не ждать ввода данных в поля

    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement); // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
        this._toggleButtonState(); // Вызовем ее и передадим ей массив полей и кнопку
      });
    });
  }

  // Метод который делает кнопку не активной. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  disableSubmitButton () {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._selectors_setting.buttonElementInactiv); // сделай кнопку неактивной
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._selectors_setting.buttonElementInactiv); // сделай кнопку активной
    }
  }

  // Метод для очистки ошибок и управления кнопкой
  removeValidationErrors () {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) // очищаем ошибки
    });
}

};
