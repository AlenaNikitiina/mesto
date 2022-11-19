import { Card } from "../components/Cards.js";
import { FormValidator } from "../components/FormValidator.js";
import { Popup } from "../components/Popup.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
//import { PopupWithImage } from "../components/PopupWithImage.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateSelector, initialCards, setting } from "../utils/constants.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

// Обработчик «отправки» формы
function submitHandlerForm (evt) {
  evt.preventDefault();
  //old
  //titleName.textContent = nameInput.value;
  //titleJob.textContent = jobInput.value;

  //new
  infoAboutUser.setUserInfo(nameInput.value, jobInput.value); // вызвали метод из класса UserInfo
  editPopup.closePopup(); //вызвали функцию которая закрывает форму при сохранении

};

// Функция должна открывать попап с картинкой (zoompopup) при клике на карточку
const handleCardClick = (selector) => {
  const newPopup = new Popup(selector); // создаём экз
  newPopup.openPopup();
}

// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  editPopup.openPopup(); // вызываю метод открытия из класса Popup
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
  addFotoPopup.openPopup(); //

  formAdd.reset(); // очисти импуты формы
  newCardValidation.removeValidationErrors() // чтобы форма всегда при открытии была чистой от ошибок поля
});

/*
// Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      const popupToClose = new Popup(item);
      popupToClose.closePopup();
    }
  })
});
*/

/*// OLD Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);}
  })});
*/

//// Создания карточек
/* function render ее теперь исп в сектион
// Функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link, templateSelector, handleCardClick);
    fotoCards.append(newCard.createCard()); //добавили элемент в DOM
  });
}; render();
*/

// Функция добавляет новую карточку в начало сайта от человека
function addCard (name, link) {
  const newCard = new Card(name, link, templateSelector, handleCardClick); //handlePreview вызвать?

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


//// экзм Kлассов валидации
const profileValidation = new FormValidator(setting, formEdit); // экземпляр Класса
const newCardValidation = new FormValidator(setting, formAdd); // экземпляр Класса

profileValidation.enableValidation();
newCardValidation.enableValidation();

//// экзм Классов попапов
//const editPopup = new Popup(popupEdit); // экземпляр Класса, редактирования
//const addFotoPopup = new Popup(popupAdd); // экземпляр Класса, добавления
const editPopup = new PopupWithForm(popupEdit, handlerSubmitProfile);
const addFotoPopup = new PopupWithForm(popupAdd, handlerSubmitForm);

//// экзм класса Section (создания карточки)
const createNewCards = new Section ({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item.name, item.link, templateSelector, handleCardClick);
    createNewCards.addItem(newCard.createCard());
  }
}, '.elements__list'
);
createNewCards.rendererAllItems(); // метод, кот отвечает за отрисовку всех элементов из класса Section



//// экзм класса UserInfo
const infoAboutUser = new UserInfo( {nameSelector: '.profile__name', aboutInfoSelector: '.profile__job'} )
console.log(infoAboutUser)
//// экзм класса PopupWithImage
//const PopupWithZoomPhoto = new PopupWithImage('.popup_zoom')
/*
function handlePreview(name, link) {
  PopupWithZoomPhoto.open(name, link);
  PopupWithZoomPhoto.setEventListeners();
};
*/



//
function handlerSubmitProfile(data) {
  //текстконтект инпутов на странице -  data(value инпута формы).Name( name="Name" из html)
  infoAboutUser.setUserInfo(data.Name, data.Job);
}

//
function handlerSubmitForm(data) {
  const formValue = {
    //имя карточки = data(value инпута формы).Name( name="placeName" из html)
    name: data.name,
    link: data.link,
  };
  cardList.addItem(addCard(formValue)); // ??
}
