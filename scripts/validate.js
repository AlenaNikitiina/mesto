const setting = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorClassActiv: 'form__input-error_active',
  submitButtonSelector: '.form__submit',
  buttonElementInactiv: 'form__submit_inactive',
}


//// Валидация
// 1 Функция, которая добавляет класс с ошибкой
const showInputError = (formElementAll, inputElement, errorMessage, setting) => {
  const errorElement = formElementAll.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add(setting.inputErrorClass);  // добавьте класс ошибки элементу input
  errorElement.textContent = errorMessage;
  errorElement.classList.add(setting.inputErrorClassActiv); // Показываем сообщение об ошибке
}

// 2 Функция, которая удаляет класс с ошибкой
const hideInputError = (formElementAll, inputElement, setting) => {
  // Находим элемент ошибки
  const errorElement = formElementAll.querySelector(`.${inputElement.id}-error`); // нашли ошибку из спана на основе уникального класса
  inputElement.classList.remove(setting.inputErrorClass);
  errorElement.classList.remove(setting.inputErrorClassActiv); // Скрываем сообщение об ошибке
  errorElement.textContent = ''; // Очистим ошибку
}

// 3 Функция, которая проверяет валидность поля
const isValid = (formElementAll, inputElement, setting) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажи ошибку
    showInputError(formElementAll, inputElement, inputElement.validationMessage, setting); // получает параметром форму, в которой находится проверяемое поле, и само это поле
  } else {
    // Если проходит, скрой
    hideInputError(formElementAll, inputElement, setting);
  }
}

// 7 Функция кот вкл/откл кнопку. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement, setting) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList, setting)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(setting.buttonElementInactiv); // сделай кнопку неактивной
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(setting.buttonElementInactiv); // сделай кнопку активной
  }
}

// 4 функция кот добавляет слушатель событий всем полям ввода внутри формы
const setEventListeners = (formElementAll, setting) => {
  const inputList = Array.from(formElementAll.querySelectorAll(setting.inputSelector)); // Находим все поля внутри формы, сделаем из них массив
  const buttonElement = formElementAll.querySelector(setting.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, setting); // Вызовем ее, чтобы не ждать ввода данных в поля

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      isValid(formElementAll, inputElement, setting); // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
      toggleButtonState(inputList, buttonElement, setting); // Вызовем ее и передадим ей массив полей и кнопку
    });
  });
};

// 5 функция которая найдёт и переберёт все формы на странице
const enableValidation = (setting) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  // Переберём его
  formList.forEach((formElementAll) => {
    setEventListeners(formElementAll, setting); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

// 6 функция которая проверит все инпуты в форме валидное/нет, принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция вернёт true
  })
};

enableValidation (setting);
