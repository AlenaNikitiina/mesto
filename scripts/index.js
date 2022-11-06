import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateSelector, initialCards, setting } from "./constants.js";

// Обработчик «отправки» формы
function submitHandlerForm (evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;

  closePopup(popupEdit); //вызвали функцию которая закрывает форму при сохранении
};

// Функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция закрытия попапов по нажатию на Escape
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedNowPopup = document.querySelector('.popup_opened')
    closePopup(openedNowPopup);
  }
};

// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия

  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;

  profileValidation.removeValidationErrors(); // вызвали метод чтобы форма всегда при открытии была чистой от ошибок поля
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);

  formAdd.reset(); // очисти импуты формы
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});

// Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  })
});


//// Создания карточек
// Функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link, templateSelector, openPopup);
    fotoCards.append(newCard.createCard()); //добавили элемент в DOM
  });
};

render();

// Функция создает новую карточку от человека,и отправки формы
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  addCard(titleValue, linkValue);  // вызвали функцию которая добавит новую карточку
  closePopup(popupAdd);  //вызвали функцию которая закрывает форму при сохранении
};

// Функция добавляет новую карточку в начало сайта
function addCard (name, link) {
  const newCard = new Card(name, link, templateSelector, openPopup);
  fotoCards.prepend(newCard.createCard()); //добавили элемент в DOM
};


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', submitHandlerForm);
formAdd.addEventListener('submit', createNewCard);


//// Kлассы
const profileValidation = new FormValidator(setting, formEdit);
const newCardValidation = new FormValidator(setting, formAdd);

profileValidation.enableValidation();
newCardValidation.enableValidation();
