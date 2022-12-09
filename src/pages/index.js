import '../pages/index.css';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { formEdit, formAdd, popupDeleteConfirm, trashButton, nameInput , jobInput, buttonOpenEdit, buttonOpenAdd, templateSelector, setting } from "../utils/constants.js";


//// экзмпляр апи
const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    "Content-type": 'application/json'
  }
});

//// экзм класса UserInfo
const infoAboutUser = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__job',
  userAvatar : '.profile__avatar'
});

//// экзм класса Section (создания карточки)
const cardsSection = new Section ({
  renderer: (item) => {
    cardsSection.addItem(createCard(item.name, item.link), true); //
  }
  }, '.elements__list'
);

// Получили чужие карточки загруженные с сервера
api.getAllCards()
  .then((result) => {
    cardsSection.rendererAllItems(result);
  })
  .catch(err => {
    console.log("getAllCards(): mistake", err);
});


// Это получение исходной информации о пользователе
api.getUserInfo()
  .then((result) => {
    infoAboutUser.setUserInfo(result.name, result.about);
    infoAboutUser.setUserAvatar(result.avatar); // изменить аватар ???
  })
  .catch(err => {
    console.log("getUserInfo(): mistake", err);
});



////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  editPopup.open(); // вызываю метод открытия из класса Popup

  const profileInfo = infoAboutUser.getUserInfo(); // вызвали метод из класса UserInfo
  nameInput.value = profileInfo.profileName;
  jobInput.value = profileInfo.profileAboutInfo;

  profileValidation.removeValidationErrors(); // вызвали метод чтобы форма всегда при открытии была чистой от ошибок поля
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  addFotoPopup.open();
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});


//// Создание карточки
function createCard(name, link) {
  const cardElement = new Card(name, link, templateSelector, handlerPreview).createCard()
  return cardElement;
}

// Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  api.uploadNewCard(name, link) // метод из апи - добавить нов карточку с именем и ссылкой
    .then((result) => {
      //console.log(result);
      cardsSection.addItem(createCard(name, link), false); // всё прошло- добавим карточку на страницу
    })
    .catch(err => {
      console.log("mistake", err);
    });
};


//// экзм класса PopupWithImage
const popupWithZoomPhoto = new PopupWithImage('.popup_zoom');
popupWithZoomPhoto.setEventListeners();

// функция открывает попап с фото
function handlerPreview(name, link) {
  popupWithZoomPhoto.open(name, link);
};

//
function handlerSubmitProfile(data) {
  api.profileEditing (data.nickName, data.about) // редактирование профиля - изм имя, работу и сохранить
    .then((result) => {
      infoAboutUser.setUserInfo(data.nickName, data.about); // вызвали М из UserInfo кот принимает новые данные чела и добавляет их на страницу
    })
    .catch(err => {
      console.log("profileEditing(): mistake", err);
    });

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
// enableValidation();
//const popupConfirmDelete = new PopupWithSuиmmitDelete(popupDeleteConfirm); // попап а вы уверены удалить карточку

//// экзм Классов попапов
const editPopup = new PopupWithForm('.popup_edit', handlerSubmitProfile);
const addFotoPopup = new PopupWithForm('.popup_add', handlerSubmitForm);

editPopup.setEventListeners();
addFotoPopup.setEventListeners();
