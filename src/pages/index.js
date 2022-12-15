import '../pages/index.css';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithSubmmitDelete } from "../components/PopupWithSubmmitDelete.js";
import { formEdit, formAdd,formAvatar, editAvatar, nameInput , jobInput, buttonOpenEdit, buttonOpenAdd, templateSelector, setting } from "../utils/constants.js";

//// экзм Классов попапов
const popupProfile = new PopupWithForm('.popup_edit', handlerSubmitProfile); // попап редактирования имени, работы
const popupAddFoto = new PopupWithForm('.popup_add', handlerSubmitForm); // попап добавления нов карточки
const popupChangeAvatar = new PopupWithForm('.popup_change-avatar', handleChangeAvatar); // попап поменять аватар
const popupDeleteConfirm = new PopupWithSubmmitDelete('.popup_delete-card'); // попап подтв удаления карточки

popupProfile.setEventListeners();
popupAddFoto.setEventListeners();
popupDeleteConfirm.setEventListeners();
popupChangeAvatar.setEventListeners();

//// экзм класса UserInfo
const infoAboutUser = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__job',
  avatarSelector : '.profile__avatar'
});

//// экзмпляр апи
const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-54", // ссылка на бэкенд
  headers: {
    authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    "Content-type": 'application/json'
  }
});


let myId = undefined;

// 1 Получение исходной информации о пользователе (обо мне)
Promise.all( [api.getUserInfo(), api.getInitialCards()] )
  .then(([userInfo, cards]) => {
    infoAboutUser.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar); // установили имя кот пришло в отв от сервера
    infoAboutUser.setUserAvatar(userInfo.avatar); // установили аватар пришел в ответе от сервера
    myId = userInfo._id

    cardsSection.rendererAllItems(cards); // отрисовали
    console.log(cards);
  })
  .catch(err => {
    console.log("Не получилось загрузить информацию о пользователе и карточки: ", err);
});

// 3 колбэк для попапа редактирования профиля
function handlerSubmitProfile(data) {
  popupChangeAvatar.renderLoading
  api.editingProfile (data.nickName, data.about) // м из апи - изм имя, работу и сохранить
    .then((result) => {
      infoAboutUser.setUserInfo(data.nickName, data.about, data.avatar); // вызвали М из UserInfo кот принимает новые данные чела и добавляет их на страницу
      popupChangeAvatar.close();
    })
    .catch(err => {
      console.log("Не получилось изменить данные: ", err);
    })
    .finally(() => {
      popupChangeAvatar.renderLoading(false)
    })
}

// 6 меняем аватар
function handleChangeAvatar (data) {
  popupChangeAvatar.renderLoading(true);

  api.updateAvatar(data.avatarlink)
    .then((result) => {
      //infoAboutUser.setUserInfo(result.name, result.about, result.avatar);
      infoAboutUser.setUserAvatar(result.avatar);
      popupChangeAvatar.close();
  })
  .catch(err => {
    console.log("Не получилось обновить аватар: ", err);
  })
  .finally(() => {
    popupChangeAvatar.renderLoading(false);
  })
}

// 7 Функция поставить и снять лайк
function handlePutLike(shouldLike, cardId, updateLikesList, switchLike) {
  if (shouldLike) {
    api.addLike(cardId)
      .then((result) => {
        switchLike();
        updateLikesList(result.likes);
      })
      .catch(err => {
        console.log("Не получилось поставить like: ", err);
      });
  } else {
    api.deleteLike(cardId)
      .then((result) => {
        switchLike();
        updateLikesList(result.likes);
      })
      .catch(err => {
        console.log("Не получилось снять like: ", err);
      });
  }
}

//////

// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  popupProfile.open(); // вызываю метод открытия из класса Popup

  const profileInfo = infoAboutUser.getUserInfo(); // вызвали метод из класса UserInfo
  nameInput.value = profileInfo.profileName;
  jobInput.value = profileInfo.profileAboutInfo;

  profileValidation.removeValidationErrors(); // вызвали метод чтобы форма всегда при открытии была чистой от ошибок поля
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  popupAddFoto.open();
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});


////// Создание карточки
function createCard(name, link, likes, cardId, ownerId) {

  const handleDeleteCard = (cardId, currentCard) => {
    popupAddFoto.renderLoading(true);
    const actionOnConfirm = () => {

      api.removeCard(cardId) // удаление карточки
        .then((result) => {
          console.log(result);
          currentCard.deletePhoto();
          popupDeleteConfirm.close()
        })
        .catch((err) => {
          console.log("Ошибка при удалении карточки: ", err);
        })
        .finally(() => {
          popupAddFoto.renderLoading(false);
        })
    };
    popupDeleteConfirm.open(actionOnConfirm);
  };

  const cardElement = new Card(name, link, likes, templateSelector, cardId, myId, ownerId, handlerPreview, handleDeleteCard, handlePutLike).create(); // в конце метод из Card

  return cardElement;
}

// 4 Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  popupAddFoto.renderLoading(true);

  api.uploadNewCard (name, link) // метод из апи - добавить нов карточку с именем и ссылкой
    .then((result) => {
      cardsSection.addItem(createCard(result.name, result.link, result.likes, result.id, result.owner._id), false); // экзм Section, все прошло- добавим карточку на страницу
      popupAddFoto.close();
    })
    .catch(err => {
      console.log("Не получилось добавить новую карточку: ", err);
    })
    .finally(() => {
      popupAddFoto.renderLoading(false);
    })
};


// функция открывает попап с фото
function handlerPreview(name, link) {
  popupWithZoomPhoto.open(name, link);
};

// функция открыть попап изменить аватар
editAvatar.addEventListener('click', () => {
  popupChangeAvatar.open();
});

//
function handlerSubmitForm(data) {
  addCard(data.title, data.link);
}


////// ЭКЗЕМПЛЯРЫ КЛАССОВ //////

//// экзм Kлассов валидации
const profileValidation = new FormValidator(setting, formEdit);
const newCardValidation = new FormValidator(setting, formAdd);
const avatarValidation = new FormValidator(setting, formAvatar);

profileValidation.enableValidation();
newCardValidation.enableValidation();
avatarValidation.enableValidation();

//// экзм класса PopupWithImage
const popupWithZoomPhoto = new PopupWithImage('.popup_zoom');
popupWithZoomPhoto.setEventListeners();

//// экзм класса Section (добавить карточку)
const cardsSection = new Section ({
  renderer: (item) => {
    cardsSection.addItem(createCard(item.name, item.link, item.likes, item._id, item.owner._id), true); //
  }
  }, '.elements__list'
);
