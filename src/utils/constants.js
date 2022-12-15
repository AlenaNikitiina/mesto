//// Все константы проекта
// Формы
export const formEdit = document.querySelector('.form__edit'); // форма редактирования профиля
export const formAdd = document.querySelector('.form__add'); // форма добавления карточки
export const formAvatar = document.querySelector('.form__avatar'); // форма добавления карточки
// Попапа
export const popupZoom = document.querySelector('.popup_zoom');
export const popupSelector = '.popup'
export const editAvatar = document.querySelector('.profile__avatar'); // img редактирование аватара
// Кнопки открытия и закрытия попапов
export const buttonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
export const buttonOpenAdd = document.querySelector('.profile__add-button'); //кнопка добавления нового места
export const popupCloseButtons = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик

export const templateSelector = '.element-template'
// Находим поля формы в DOM, в которых можно изменения писать
export const nameInput = document.querySelector('.nameInput');
export const jobInput = document.querySelector('.jobInput');
export const titleInput = document.querySelector('.titleInput'); // из инпутов
export const linkInput = document.querySelector('.linkInput');
// Куда будут заноситься изменения имени и работы
export const titleName = document.querySelector('.titleName');
export const titleJob = document.querySelector('.titleJob');

//
export const setting = {
  formSelector: '.popup__form',
  inputSelector: '.form__input',
  inputErrorClass: 'form__input_type_error',
  inputErrorClassActiv: 'form__input-error_active',
  submitButtonSelector: '.form__submit',
  buttonElementInactiv: 'form__submit_inactive',
}
