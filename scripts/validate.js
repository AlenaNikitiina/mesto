const setting = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorClassActiv: 'form__input-error_active',
  submitButtonSelector: '.form__submit',
  buttonElementInactiv: 'form__submit_inactive',
}

let validators = []
class FormValidator {
  constructor(selectors_setting, element_to_valid) {
    this._selectors_setting = selectors_setting;
    this._element_to_valid = element_to_valid;
  }

  enableValidation() {
    // formElementAll - это теперь this._element_to_valid
    // setting = это теперь this._selectors_setting
    this._setEventListeners();
  }

  // метод, который добавляет класс с ошибкой
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._element_to_valid.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._selectors_setting.inputErrorClass);  // добавьте класс ошибки элементу input
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._selectors_setting.inputErrorClassActiv); // Показываем сообщение об ошибке
  }

  // метод, который удаляет класс с ошибкой
  _hideInputError (inputElement) {
    // Находим элемент ошибки
    const errorElement = this._element_to_valid.querySelector(`.${inputElement.id}-error`); // нашли ошибку из спана на основе уникального класса
    inputElement.classList.remove(this._selectors_setting.inputErrorClass);
    errorElement.classList.remove(this._selectors_setting.inputErrorClassActiv); // Скрываем сообщение об ошибке
    errorElement.textContent = ''; // Очистим ошибку
  }

  // метод, который проверяет валидность поля
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажи ошибку
      this._showInputError(inputElement, inputElement.validationMessage); // получает параметром форму, в которой находится проверяемое поле, и само это поле
    } else {
      // Если проходит, скрой
      this._hideInputError(inputElement);
    }
  }

  // метод, кот вкл/откл кнопку. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
  _toggleButtonState (inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._selectors_setting.buttonElementInactiv); // сделай кнопку неактивной
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._selectors_setting.buttonElementInactiv); // сделай кнопку активной
    }
  }

  // 6 Функция которая проверит все инпуты в форме валидное/нет, принимает массив полей
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция вернёт true
    })
  }

  // 4 метод, который добавляет слушатель событий всем полям ввода внутри формы
  _setEventListeners() {
    const inputList = Array.from(this._element_to_valid.querySelectorAll(this._selectors_setting.inputSelector)); // Находим все поля внутри формы, сделаем из них массив
    const buttonElement = this._element_to_valid.querySelector(this._selectors_setting.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement); // Вызовем ее, чтобы не ждать ввода данных в поля
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement); // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
        this._toggleButtonState(inputList, buttonElement); // Вызовем ее и передадим ей массив полей и кнопку
      });
    });
  }
};


// 5 Функция которая найдёт и переберёт все формы на странице
const findEnableValidation = (setting) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  // Переберём его
  formList.forEach((formElementAll) => {
    newValidator = new FormValidator(setting, formElementAll);
    newValidator.enableValidation();
    validators.push(newValidator);
    //setEventListeners(formElementAll, setting); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};


findEnableValidation (setting);
