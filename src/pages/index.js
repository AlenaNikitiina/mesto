import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupZoom, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateSelector, initialCards, setting } from "../utils/constants.js";
import './index.css';

// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  editPopup.open(); // вызываю метод открытия из класса Popup
  //old
  //nameInput.value = titleName.textContent;
  //jobInput.value = titleJob.textContent;

  //new
  const profileInfo = infoAboutUser.getUserInfo(); // вызвали метод из класса UserInfo
  nameInput.value = profileInfo.profileName;
  jobInput.value = profileInfo.profileAboutInfo;

  profileValidation.removeValidationErrors(); // вызвали метод чтобы форма всегда при открытии была чистой от ошибок поля
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  addFotoPopup.open(); //

  formAdd.reset(); // очисти импуты формы
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});



//// Создания карточек

// Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  //const newCard = new Card(name, link, templateSelector, handleCardClick); //handlePreview вызвать?
  cardsSection.addItem((new Card(name, link, templateSelector, handlerPreview)).createCard(), false);
};

// Функция создает новую карточку от человека,и отправки формы
function createNewCard (evt) {
  evt.preventDefault();

  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  addCard(titleValue, linkValue);  // вызвали функцию которая добавит новую карточку
  addFotoPopup.close();  //вызвали функцию которая закрывает форму при сохранении
};

//
function handlerPreview(name, link) {
  popupWithZoomPhoto.open(name, link);
  popupWithZoomPhoto.setEventListeners();
};

//
function handlerSubmitProfile(data) {
  infoAboutUser.setUserInfo(data.nickName, data.about);
}

//
function handlerSubmitForm(data) {
  addCard(data.title, data.link);
}


//// экзм Kлассов валидации
const profileValidation = new FormValidator(setting, formEdit); // экземпляр Класса
const newCardValidation = new FormValidator(setting, formAdd); // экземпляр Класса

profileValidation.enableValidation();
newCardValidation.enableValidation();

//// экзм Классов попапов
const editPopup = new PopupWithForm(popupEdit, handlerSubmitProfile);
const addFotoPopup = new PopupWithForm(popupAdd, handlerSubmitForm);

editPopup.setEventListeners();
addFotoPopup.setEventListeners();

//// экзм класса Section (создания карточки)
const cardsSection = new Section ({
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(item.name, item.link, templateSelector, handlerPreview);
      cardsSection.addItem(newCard.createCard(), true);
    }
  }, '.elements__list'
);
cardsSection.rendererAllItems(); // метод, кот отвечает за отрисовку всех элементов из класса Section


//// экзм класса UserInfo
const infoAboutUser = new UserInfo( {nameSelector: '.profile__name', aboutInfoSelector: '.profile__job'} )

//// экзм класса PopupWithImage
const popupWithZoomPhoto = new PopupWithImage(popupZoom)
