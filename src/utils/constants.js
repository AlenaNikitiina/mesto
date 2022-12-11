//// Все константы проекта
// Формы
//const formElementAll = document.querySelectorAll('.popup__form'); // все попапы с формами
export const formEdit = document.querySelector('.form__edit'); // форма редактирования профиля
export const formAdd = document.querySelector('.form__add'); // форма добавления карточки
export const formAvatar = document.querySelector('.form__avatar'); // форма добавления карточки
// Про открытие и закрытие попапа
export const popupEdit = document.querySelector('.popup_edit');// нашли попапы
export const popupAdd = document.querySelector('.popup_add');
export const popupZoom = document.querySelector('.popup_zoom');
export const popupAll = document.querySelectorAll('.popup');
export const popupSelector = '.popup'
// Находим поля формы в DOM, в которых можно изменения писать
export const nameInput = document.querySelector('.nameInput');
export const jobInput = document.querySelector('.jobInput');
export const titleInput = document.querySelector('.titleInput'); //из инпутов
export const linkInput = document.querySelector('.linkInput');
// Куда будут заноситься изменения имени и работы
export const titleName = document.querySelector('.titleName');
export const titleJob = document.querySelector('.titleJob');
// Кнопки открытия и закрытия попапов
export const buttonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
export const buttonOpenAdd = document.querySelector('.profile__add-button'); //кнопка добавления нового места
export const popupCloseButtons = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик

export const editAvatar = document.querySelector('.profile__avatar'); // редактирование аватара
export const trashButton = document.querySelector('.element__trash-button') // кнопка мусорки
//export const popupConfirmDelete = document.querySelector('.popup_delete-card') // попап подтверждения - удалить укарточку?

// Шесть карточек «из коробки»
export const fotoCards = document.querySelector('.elements__list'); // получаем элемент. ul
export const templateSelector = '.element-template'
export const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
// zoom попап
export const popupImage = document.querySelector('.popup__image');
export const popupFigcaption = document.querySelector('.popup__figcaption');
// Валидация
export const formInput = document.querySelector('.form__input'); // нашли инпут

//
export const setting = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorClassActiv: 'form__input-error_active',
  submitButtonSelector: '.form__submit',
  buttonElementInactiv: 'form__submit_inactive',
}
