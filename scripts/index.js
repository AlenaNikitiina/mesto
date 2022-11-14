import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateSelector, initialCards, setting } from "../utils/constants.js";


// Обработчик «отправки» формы
function submitHandlerForm (evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;

  editPopup.closePopup(); //вызвали функцию которая закрывает форму при сохранении
};

// Функция должна открывать попап с картинкой при клике на карточку
const handleCardClick = (selector) => {
  const newPopup = new Popup(selector); // создаём экз
  newPopup.openPopup();
}


// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  editPopup.openPopup(); // вызываю функцию открытия

  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;

  profileValidation.removeValidationErrors(); // вызвали метод чтобы форма всегда при открытии была чистой от ошибок поля
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  addFotoPopup.openPopup(); //

  formAdd.reset(); // очисти импуты формы
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});

// Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      const popupToClose = new Popup(item);
      popupToClose.closePopup();
    }
  })
});

/*
// OLD Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);}
  })
});
*/


//// Создания карточек

/*
// Функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link, templateSelector, handleCardClick);
    fotoCards.append(newCard.createCard()); //добавили элемент в DOM
  });
};
render();
*/

// Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  const newCard = new Card(name, link, templateSelector, handleCardClick);
  fotoCards.prepend(newCard.createCard()); //добавили элемент в DOM
};

// Функция создает новую карточку от человека,и отправки формы
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  addCard(titleValue, linkValue);  // вызвали функцию которая добавит новую карточку
  addFotoPopup.closePopup();  //вызвали функцию которая закрывает форму при сохранении
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', submitHandlerForm);
formAdd.addEventListener('submit', createNewCard);


// Kлассы валидации
const profileValidation = new FormValidator(setting, formEdit); // экземпляр Класса
const newCardValidation = new FormValidator(setting, formAdd); // экземпляр Класса

profileValidation.enableValidation();
newCardValidation.enableValidation();

// Классы попапов
const editPopup = new Popup(popupEdit); // экземпляр Класса, редактирования
const addFotoPopup = new Popup(popupAdd); // экземпляр Класса, добавления


// Класс создания карточки
// экзм класса Section
const createNewCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.link, templateSelector, handleCardClick);
    createNewCards.addItem(newCard.createCard());
  }
}, '.elements__list'
);

createNewCards.rendererAllItems();

