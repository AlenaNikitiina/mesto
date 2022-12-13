import '../pages/index.css';
import { Api } from "../components/Api.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithSubmmitDelete } from "../components/PopupWithSubmmitDelete.js";
import { formEdit, formAdd,formAvatar, popupConfirmDelete, trashButton, editAvatar, nameInput , jobInput, buttonOpenEdit, buttonOpenAdd, templateSelector, setting } from "../utils/constants.js";

//// экзм Классов попапов
const editPopup = new PopupWithForm('.popup_edit', handlerSubmitProfile); // попап редактирования имени, работы
const addFotoPopup = new PopupWithForm('.popup_add', handlerSubmitForm); // попап добавления нов карточки
//const popupDeleteConfirm = new PopupWithForm('.popup_delete-card', handleDeleteOnClick); // попап подтв удаления карточки
const popupDeleteConfirm = new PopupWithSubmmitDelete('.popup_delete-card'); // попап подтв удаления карточки
const changeAvatarPopup = new PopupWithForm('.popup__change-avatar', handleChangeAvatar); // попап поменять аватар


let myId

//// экзмпляр апи
const api = new Api({
  url:"https://mesto.nomoreparties.co/v1/cohort-54", // ссылка на бэкенд
  headers: {
    authorization: '6fda6390-e74a-4775-b246-a9640a3f8173', // токен
    "Content-type": 'application/json'
  }
});

// 1 Получение исходной информации о пользователе (обо мне)
api.getUserInfo()
  .then((result) => {
    infoAboutUser.setUserInfo(result.name, result.about, result.avatar); // установили имя кот пришло в ответе от сервера
    infoAboutUser.setUserAvatar(result.avatar); // установили аватар пришел в ответе от сервера
    myId = res._id
  })
  .catch(err => {
    console.log("mistake", err);
});

// 2 Получили чужие карточки загруженные с сервера
api.getInitialCards()
  .then((result) => {
    cardsSection.rendererAllItems(result);
    console.log(result)
  })
  .catch(err => {
    console.log("Не получилось загрузить карточки", err);
});

// 3 колбэк для попапа редактирования профиля
function handlerSubmitProfile(data) {
  changeAvatarPopup.renderLoading ///////
  api.editingProfile (data.nickName, data.about) // м из апи - изм имя, работу и сохранить
    .then((result) => {
      infoAboutUser.setUserInfo(data.nickName, data.about, data.avatar); // вызвали М из UserInfo кот принимает новые данные чела и добавляет их на страницу
    })
    .catch(err => {
      console.log("Не получилось изменить данные", err);
    })
    .finally(() => {
      changeAvatarPopup.renderLoading(false) }) ////////
}

// 6 меняем аватар
function handleChangeAvatar (data) {
  changeAvatarPopup.renderLoading(true);
  api.updateAvatar(data.avatarlink)
    .then((result) => {
      infoAboutUser.setUserInfo(result.name, result.about, result.avatar);
      changeAvatarPopup.close();
  })
  .catch(err => {
    console.log("Не получилось обновить аватар", err);
  })
  .finally(() => {
    changeAvatarPopup.renderLoading(false);
  })
}

// 7 Ф поставить и снять лайк
function handlePutLike(shouldLike, cardId, updateLikesList) {
  if (shouldLike) {
    api.addLike(cardId)
      .then((result) => {
        updateLikesList(result.likes);
      })
      .catch(err => {
        console.log("Не получилось поставить like", err);
      });
  } else {
    api.deleteLike(cardId)
      .then((result) => {
        updateLikesList(result.likes);
      })
      .catch(err => {
        console.log("Не получилось снять like", err);
      });
  }
}



//////

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


////// Создание карточки
function createCard(name, link, likes, id) {

  const handleDeleteCard = (id, currentCard) => {
    const actionOnConfirm = () => {
      console.log("actionOnConfirm ", id);
      addFotoPopup.renderLoading(true) /////////

      api.removeCard(id)
        .then((result) => {
          console.log(result);
          currentCard.deletePhoto();
        })
        .catch((error) => {
          console.log(`Ошибка при удалении карточки: ${error}`);
        })
        .finally(() => {
          popupDeleteConfirm.close();
          addFotoPopup.renderLoading(true) //////////
        })
    };
    console.log("handleDeleteCard");
    popupDeleteConfirm.open(actionOnConfirm);
  };
  const cardElement = new Card(name, link, likes, templateSelector, id, handlerPreview, handleDeleteCard, handlePutLike).createCard();
  return cardElement;
}

// 4  Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  //addFotoPopup._renderLoading(true)
  api.uploadNewCard (name, link) // метод из апи - добавить нов карточку с именем и ссылкой
    .then((result) => {
      //cardsSection.addItem(createCard(name, link), false); // добавим карточку на страницу
      cardsSection.addItem(createCard(result.name, result.link, result.likes, result.id), false); // всё прошло- добавим карточку на страницу
    })
    .catch(err => {
      console.log("Не получилось добавить новую карточку", err);
    })
    .finally(() => {
      //addFotoPopup._renderLoading(false, 'Сохранение...');
    })
};


// функция открывает попап с фото
function handlerPreview(name, link) {
  popupWithZoomPhoto.open(name, link);
};

// ф открывает попап удаления
function openDeletePhotoPopup () {
  popupDeleteConfirm.open();
}

// ф открыть попап изменить аватар
editAvatar.addEventListener('click', () => {
  changeAvatarPopup.open();
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

//// экзм класса Section (создания карточки)
const cardsSection = new Section ({
  renderer: (item) => {
    //cardsSection.addItem(createCard(item.name, item.link), true); //
    cardsSection.addItem(createCard(item.name, item.link, item.likes, item._id), true); //
  }
  }, '.elements__list'
);


//// экзм класса UserInfo
const infoAboutUser = new UserInfo({
  nameSelector: '.profile__name',
  aboutInfoSelector: '.profile__job',
  avatarSelector : '.profile__avatar'
});

//// экзм класса PopupWithImage
const popupWithZoomPhoto = new PopupWithImage('.popup_zoom');
popupWithZoomPhoto.setEventListeners();


editPopup.setEventListeners();
addFotoPopup.setEventListeners();
popupDeleteConfirm.setEventListeners();
changeAvatarPopup.setEventListeners();

// Ф удалить ток свою карточку
function handleDeleteOnClick(id) {
  console.log("handleDeleteOnClick ", id);
  api.removeCard(id)
  .then((result) => {
    console.log(result)
    //.deletePhoto();
    popupDeleteConfirm.close();
  })
}



/*
function renderLoading(isLoading, statusText) {
  if (isLoading === true) {
    document.querySelector('.popup__save-button').textContent = 'Сохранение...';
  } else {
    document.querySelector('.popup__save-button').textContent = statusText;
  }
}
*/

