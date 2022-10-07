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
}
// функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
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







///////////////////6

 const formEdit = document.forms.form_edit; //нашли формы
 const formAdd = document.forms.form_add;
 const formInput =formElement.querySelector('.popup__input');

 /*
 // Функция, которая добавляет класс с ошибкой ????
const showInputError = (element) => {
  element.classList.add('error');
  element.classList.add('popup__input_type_error');
};
// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove('error');
};

//функция проверяет formInput на корректность введённых данных и вызывает hideError и showError
const checkInputValidity = () => {
  if (formInput.validity.valid) {
    hideInputError(formInput);
  } else {
    showInputError(formInput);
  }
}


//4//функция которая добавляет или убирает классы кнопке
function setSubmitButton (button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`);
  } else {
    button.removeAttribute('disabled', true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }


  const enableValidation = (setting) => {
    const formList = document.querySelectorAll(setting.formSelector);
    setEventListener(formElement, setting);
  }

*/

//4//функция которая добавляет или убирает классы кнопке
function setSubmitButton (button, state) {
  if (state) {
    button.removeAttribute('disabled');
    button.classList.add(`popup__button_valid`);
    button.classList.remove(`popup__button_invalid`);
  } else {
    button.removeAttribute('disabled', true);
    button.classList.add(`popup__button_invalid`);
    button.classList.remove(`popup__button_valid`);
  }}

//3/// функция проверяет каждый наш импут на валидность
function isValid (input) {
  const errorSpan = input.parentNode.querySelector(`#${input.id}-error`); //конретный спан найдется
  errorSpan.textContent = input.validationMessage; //из браузера будет текст ошибок
  isValid(input);
  //input.setCustomValidity(''); //очищает спан если написали правильный текст
}

//2///функция которая проверяет, что мы написали в импутах и соответствувет ли оно инлайн валидациии форм
function handlerValidateInput (evt) {
  const currentForm = evt.target; //нашли конкретную ф в которой работаем
  const submitButton =  currentForm.querySelector('.popup__save-button'); // нашли кнопку она сабмит
  //вызвали другую ф
  isValid(evt.target);
  if (currentForm.checkValidity()) {
    setSubmitButton(submitButton, true)
  } else {
    setSubmitButton(submitButton, false)
  }
}

//1///функция отправляет форму в которой находимся. Отвечает за submit
function sendForm (evt) {
  evt.preventDefault();
  const currentForm = evt.target; //нашли конкретную форму в которой работаем сейчас
  //валидна ли форма?
  if (currentForm.checkValidity()) {
    console.log('Форма успешно отправлена');
    //currentForm.reset(); //удалили введенные данные Сейчас мне это не нужно, может в карточке исп
  } else {
    //showInputError(formInput);
    console.log('Что-то пошло не так');
  }
}

formEdit.addEventListener('submit', sendForm); //отправлять форму
formEdit.addEventListener('input', handlerValidateInput); //валидирование внутри импутов
formAdd.addEventListener('submit', sendForm);
formAdd.addEventListener('input', handlerValidateInput);

function enableValidation(toValid) {
// здесь должна быть какая-то вал
  handlerValidateInput(toValid.submitButtonSelector)
}

settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(settings);

