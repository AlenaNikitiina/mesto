import { Card } from "./cards.js";
import { FormValidator } from "./validate.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateSelector, popupSaveButton, initialCards, setting } from "./constants.js";

// Обработчик «отправки» формы
function submitHandlerForm (evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;

  closePopup(popupEdit); //вызвали функцию которая закрывает форму при сохранении

  // сделай кпонку отключенной //кажется это вообще не надо
  //evt.submitter.classList.add('popup__button_disabled');
  //evt.submitter.setAttribute('disabled', true);
  //formEdit.reset();
};

// Функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
};

// Функция закрытия попапов по нажатию на Escape
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedNowPopup = document.querySelector('.popup_opened')
    closePopup(openedNowPopup);
  }
};

// Функция Открыть форму попапа по нажатию на кнопку редактирования профиля
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
});

// Функция Открыть форму попапа по нажатию на кнопку добавления карточки
buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);
  newCardValidation.disableSubmitButton(); // сделай кнопку сохранения актив/не актив
});

// Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  })
});



////
// Функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    const newCard = new Card(item.name, item.link, templateSelector, openPopup);
    fotoCards.append(newCard.generateCard()); //добавили элемент в DOM
  });
};

render();


// Функция отправки формы и создает новую карточку от человека
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  addCard(titleValue, linkValue);  // вызвали функцию которая добавит новую карточку
  closePopup(popupAdd);  //вызвали функцию которая закрывает форму при сохранении

  formAdd.reset(); // очистить поля
  // это удалить, когда др заработает
  //popupSaveButton.classList.add('form__submit_inactive');
  //popupSaveButton.setAttribute('disabled', true);
};

// Функция добавления новой карточки в начало сайта
function addCard (name, link) {
  const newCard = new Card(name, link, templateSelector, openPopup);
  fotoCards.prepend(newCard.generateCard()); //добавили элемент в DOM
};


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', submitHandlerForm);
formAdd.addEventListener('submit', createNewCard);


// 5 Функция которая найдёт и переберёт все формы на странице
const findEnableValidation = (setting) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(setting.formSelector));

  // Переберём его
  formList.forEach((formElementAll) => {
    const newValidator = new FormValidator(setting, formElementAll);
    newValidator.enableValidation();
    //setEventListeners(formElementAll, setting); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

findEnableValidation (setting);

//
const profileValidation = new FormValidator(setting, formEdit);
const newCardValidation = new FormValidator(setting, formAdd);

profileValidation.enableValidation();
newCardValidation.enableValidation();
