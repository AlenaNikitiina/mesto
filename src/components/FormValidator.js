export class FormValidator {
  constructor(selectorsSetting, formToValid,) {
    this._selectorsSetting = selectorsSetting;
    this.formToValid = formToValid;
    // setting = это теперь this._selectorsSetting
    // formElementAll = это теперь this.formToValid (и это любая форма которую передаем при созд нов класса экземпляра)
    this._inputList = Array.from(this.formToValid.querySelectorAll(this._selectorsSetting.inputSelector)); // Находим все поля внутри формы, сделаем из них массив
    this._buttonElement = this.formToValid.querySelector(this._selectorsSetting.submitButtonSelector);
  }

  // Метод, который вкл валидацию формы
  enableValidation() {
    this._setEventListeners();
  }

  // Метод, который добавляет класс с ошибкой импуту
  _showInputError (inputElement, errorMessage) {
    const errorElement = this.formToValid.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._selectorsSetting.inputErrorClass);  // добавьте класс ошибки элементу input
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectorsSetting.inputErrorClassActiv); // Показываем сообщение об ошибке
  }

  // Метод, который удаляет класс с ошибкой
  _hideInputError (inputElement) {
    // Находим элемент ошибки
    const errorElement = this.formToValid.querySelector(`.${inputElement.id}-error`); // нашли ошибку из спана на основе уникального класса
    inputElement.classList.remove(this._selectorsSetting.inputErrorClass);
    errorElement.classList.remove(this._selectorsSetting.inputErrorClassActiv); // Скрываем сообщение об ошибке
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

  // Метод который делает кнопку не активной. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState () {
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._selectorsSetting.buttonElementInactiv); // сделай кнопку неактивной
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._selectorsSetting.buttonElementInactiv); // сделай кнопку активной
    }
  }

  // 6 Метод, которая проверит все инпуты в форме валидное/нет, принимает массив полей
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция вернёт true
    })
  }

  // 4 Метод, который добавляет слушатель событий всем полям ввода внутри формы
  _setEventListeners() {
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

  // Метод для очистки ошибок и управления кнопкой
  removeValidationErrors () {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement) // очищаем ошибки
    });
  }

};
