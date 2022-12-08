import '../pages/index.css';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupZoom, popupDeleteConfirm, trashButton, nameInput , jobInput, buttonOpenEdit, buttonOpenAdd, templateSelector, initialCards, setting } from "../utils/constants.js";


//// экзм класса UserInfo
const infoAboutUser = new UserInfo( {
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__job',
  userAvatar : '.profile__avatar'} );

//// Апи
// экзмпляр апи
const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-54",
  headers: {
    authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    "Content-type": 'aplication/json'
  }
});

//// экзм класса Section (создания карточки)
const cardsSection = new Section ({
  renderer: (item) => {
    cardsSection.addItem(createCard(item.name, item.link), true); //
  }
  }, '.elements__list'
);

// чужие загруженные с сервера карточки
api.getAllCards()
  .then((result) => {
    cardsSection.rendererAllItems(result);
  })
  .catch(err => {
    console.log("getAllCards(): mistake", err);
  });


// грузим информацию о пользователе
api.getUserInfo()
  .then((result) => {
    infoAboutUser.setUserInfo(result.name, result.about);
    infoAboutUser.setUserAvatar(result.avatar);
    console.log(result);
  })
  .catch(err => {
    console.log("getUserInfo(): mistake", err);
  });




////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  //const newCard = new Card(name, link, templateSelector, handleCardClick); also work
  //cardsSection.addItem((new Card(name, link, templateSelector, handlerPreview)).createCard(), false);
  cardsSection.addItem(createCard(name, link), false);
};


//// экзм класса PopupWithImage
const popupWithZoomPhoto = new PopupWithImage('.popup_zoom');
popupWithZoomPhoto.setEventListeners();

// ф открывает попап с фото
function handlerPreview(name, link) {
  popupWithZoomPhoto.open(name, link);
};

//
function handlerSubmitProfile(data) {
  //infoAboutUser.setUserInfo(data.nickName, data.about); // вызвали М из UserInfo кот принимает новые данные чела и добавляет их на страницу
  //infoAboutUser.setUserInfo(data.nickName, "глажу котят"); // вызвали М из UserInfo кот принимает новые данные чела и
  api.profileEditing (data.nickName, data.about)
    .then((result) => {
      // у нас всё прошло гладко - обновив инфу на странице
      infoAboutUser.setUserInfo(data.nickName, data.about);
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


