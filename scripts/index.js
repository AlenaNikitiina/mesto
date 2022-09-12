//1// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
//куда будут заноситься изменения
let titleName = document.querySelector('.titleName');
let titleJob = document.querySelector('.titleJob');

// Обработчик «отправки» формы и evt.preventDefault - убирает перезагрузку страницы
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;

  //будут меняться в профиле
  titleName.textContent = nameValue;
  titleJob.textContent = jobValue;
 //вызвали функцию которая закрывает форму при сохранении
  closePopup();
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


//2// Про открытие и закрытие попапа
const popupEl = document.querySelector('.popup')
//кнопки открытия и закрытия попапа
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupEl.querySelector('.popup__close-button');

// функция открыть форму по нажатию на кнопку
openPopupButton.addEventListener('click', () => {
  popupEl.classList.add('popup_opened');
})
// функция закрыть форму по нажатию на кнопку
closePopupButton.addEventListener('click', () => {
  popupEl.classList.remove('popup_opened');
})
// функция закрыть форму
function closePopup() {
  popupEl.classList.remove('popup_opened');
}
