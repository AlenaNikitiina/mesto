//// Все константы проекта
// Формы
export const formEdit = document.querySelector('.form__edit'); // форма редактирования профиля
export const formAdd = document.querySelector('.form__add'); // форма добавления карточки
// Про открытие и закрытие попапа
export const popupEdit = document.querySelector('.popup_edit');// нашли попапы
export const popupAdd = document.querySelector('.popup_add');
export const popupZoom = document.querySelector('.popup_zoom');
export const popupAll = document.querySelectorAll('.popup');
// Находим поля формы в DOM, в которых можно изменения писать
export const nameInput = document.querySelector('.nameInput');
export const jobInput = document.querySelector('.jobInput');
export const titleInput = document.querySelector('.titleInput'); //из инпутов
export const linkInput = document.querySelector('.linkInput');
// Куда будут заноситься изменения имени и работы
export const titleName = document.querySelector('.titleName');
export const titleJob = document.querySelector('.titleJob');
// Кнопки открытия и закрытия попапов (трех)
export const buttonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
export const buttonOpenAdd = document.querySelector('.profile__add-button'); //кнопка добавления нового места
export const popupCloseButtons = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик
// Шесть карточек «из коробки»
export const fotoCards = document.querySelector('.elements__list'); // получаем элемент. ul
export const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
// zoom попап
export const popupImage = document.querySelector('.popup__image');
export const popupFigcaption = document.querySelector('.popup__figcaption');
// Валидация
export const formInput = document.querySelector('.form__input'); // нашли инпут
export const popupSaveButton = document.querySelector('.form__submit-add') // находим кнопку сабмита в форме нового места
// Массив объектов Cards
export let cards = [];
// Массив объектов FormValidator
export let validators = [];
// Массив с именами карточек и линками
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
