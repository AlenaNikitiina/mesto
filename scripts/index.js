// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Про открытие и закрытие попапа
const popupEdit = document.querySelector('.popup_edit');// нашли попапы
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
// Находим поля формы в DOM, в которых можно изменения писать
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
const titleInput = document.querySelector('.titleInput'); //из инпутов
const linkInput = document.querySelector('.linkInput');
// куда будут заноситься изменения имени и работы
const titleName = document.querySelector('.titleName');
const titleJob = document.querySelector('.titleJob');
// кнопки открытия и закрытия попапов (трех)
const buttonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
const buttonOpenAdd = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const popupCloseButtons = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик
// Шесть карточек «из коробки»
const list = document.querySelector('.elements__list'); // получаем элемент. ul
const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
//zoom попап
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
// валидация
//const formElement = document.querySelector('.form'); // нашли тег form
const formInput = document.querySelector('.form__input'); // нашли ипрут
const formError = formElement.querySelector(`.${formInput.id}-error`); // нашли ошибку из спанаю элемент ошибки на основе уникального класса


// Обработчик «отправки» формы и evt.preventDefault - убирает перезагрузку страницы
function submitHandlerForm (evt) {
  evt.preventDefault();

  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupEdit);
}

// функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}
// функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// функция закрыть попапы по нажатию на кнопку крестик
popupCloseButtons.forEach(button => {
  button.addEventListener('click', () =>
  closePopup(button.closest('.popup')));
});

// функции Открыть форму попапов по нажатию на кнопку
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  });
buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});


// Основаная функция. которая создает карточку с линками и именами из массива выше
function createCard(name, link) {
  const newHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
  //наполняем содержимым
  newHtmlElement.querySelector('.element__title').textContent = name;
  const fotoZoomOpen = newHtmlElement.querySelector('.element__foto'); // открыть попап зум картинки
  fotoZoomOpen.src = link;
  fotoZoomOpen.alt = name;

  //лайк
  const buttonLike = newHtmlElement.querySelector('.element__like'); // нашли кнопку лайка
  buttonLike.addEventListener('click', (item) => {
    likeIt(buttonLike);
  });
  //функция постановки лайка
  function likeIt (item) {
  item.classList.toggle('element__like_active');
  };
  //мусорка
  const trashButton = newHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
  trashButton.addEventListener("click", (evt) => {
    const currentPhoto =  evt.target.closest('.elements__card');
    currentPhoto.remove();
  });
  // увелечение фотографий
  fotoZoomOpen.addEventListener('click', function (evt) {
    const picture = evt.target;
    popupImage.src = picture.src;
    popupImage.alt = picture.alt;
    popupFigcaption.textContent = picture.alt;
    openPopup(popupZoom);
  });

  return newHtmlElement;
}

// функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    list.append(createCard(item.name, item.link)); //добавили элемент в DOM
  });
}
render();

// функция отправки формы и создает новую карточку от человека
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;
  // вызвали функцию которая добавит новую карточку
  addCard(titleValue, linkValue)
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupAdd);
}

// функция добавления новой карточки в начало сайта
function addCard(name, link) {
  const newCard = createCard(name, link);
  list.prepend(newCard); //добавили элемент в DOM
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener('submit', submitHandlerForm);
popupAdd.addEventListener('submit', createNewCard);



/////////////////// 6

// 1 Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add('form__input_type_error');  // добавьте класс ошибки элементу input
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active'); // Показываем сообщение об ошибке
}

// 2 Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active'); // Скрываем сообщение об ошибке
  errorElement.textContent = ''; // Очистим ошибку
}

// 3 Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage); // showInputError получает параметром форму, в которой находится проверяемое поле, и само это поле
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
}



// 7 Функция кот вкл откл кнопку. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive'); // сделай кнопку неактивной
  } else {
    buttonElement.classList.remove('form__submit_inactive'); // сделай кнопку активной
  }
};


// 4 Пусть слушатель событий добавится всем полям ввода внутри формы.
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));  // Находим все поля внутри формы, сделаем из них массив
  const buttonElement = formElement.querySelector('.form__submit');
  toggleButtonState(inputList, buttonElement);  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement); // Внутри колбэка вызовем isValid,передав ей форму и проверяемый элемент
      toggleButtonState(inputList, buttonElement); // Вызовем toggleButtonState и передадим ей массив полей и кнопку
    });
  });
};


// 5 функция которая найдёт и переберёт все формы на странице
const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // Переберём его
  formList.forEach((formElement) => {
    setEventListeners(formElement); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};


/*
// 5 функция которая найдёт и переберёт все формы на странице
const enableValidation = (setting) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(setting.formInput));
  // Переберём его
  formList.forEach((formElement) => {
    setEventListeners(formElement, setting); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};
enableValidation(setting);
*/


enableValidation();
// 6 функция которая проверит все инпуты в форме валидное/нет, принимает массив полей
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция вернёт true
  })
};

/*
// 7 Функция кот вкл откл кнопку. принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('form__submit_inactive'); // сделай кнопку неактивной
  } else {
    buttonElement.classList.remove('form__submit_inactive'); // сделай кнопку активной
  }
};
*/
// 8 функция закрытия попапов по нажатию на Escape
function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedNowPopup = document.querySelector('.popup_opened')
    closePopup(openedNowPopup);
  }
}

//work
// 9 функция закрыть попап тыкнув на оверлей
function closeByOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

/*
// 9 функция закрыть попап тыкнув на оверлей
function closeByOverlay (evt) {
  if (evt.target.classList.contains(setting.a)) {
    closePopup(evt.target);
  }
}
*/

document.addEventListener('click', closeByOverlay);
//document.removeEventListener('click', closeByOverlay);

