import { Card } from "./cards.js";
import { setting, FormValidator } from "./validate.js";
import { formEdit, formAdd, popupEdit, popupAdd, popupAll, nameInput , jobInput, titleInput, linkInput, titleName, titleJob, buttonOpenEdit, buttonOpenAdd, fotoCards, templateItem, popupSaveButton, cards, validators, initialCards } from "./constants.js";

// Обработчик «отправки» формы
function submitHandlerForm (evt) {
  evt.preventDefault();

  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupEdit);
  //new
  evt.submitter.classList.add('popup__button_disabled');
  evt.submitter.setAttribute('disabled', true);
  formEdit.reset();
}

// Функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// Функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// Функция закрытия попапов по нажатию на Escape
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedNowPopup = document.querySelector('.popup_opened')
    closePopup(openedNowPopup);
  }
}

// Функции Открыть форму попапов по нажатию на кнопку
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  });
  buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// Закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  })
})


////
// Функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    let newCard = new Card(item.name, item.link, templateItem, openPopup);
    cards.push(newCard); // добавляем вновь созданную карточку в массив карточек
    fotoCards.append(newCard.getElement()); //добавили элемент в DOM
  });
}

// Функция отправки формы и создает новую карточку от человека
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  // вызвали функцию которая добавит новую карточку
  addCard(titleValue, linkValue)
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupAdd);

  formAdd.reset(); // очистить поля
  popupSaveButton.classList.add('form__submit_inactive');
  popupSaveButton.setAttribute('disabled', true);
}

// Функция добавления новой карточки в начало сайта
function addCard (name, link) {
  let newCard = new Card(name, link, templateItem, openPopup);
  cards.push(newCard); // добавляем вновь созданную карточку в массив карточек
  fotoCards.prepend(newCard.getElement()); //добавили элемент в DOM
};


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', submitHandlerForm);
formAdd.addEventListener('submit', createNewCard);

render();

// 5 Функция которая найдёт и переберёт все формы на странице
const findEnableValidation = (setting) => {
  // Найдём все формы с указанным классом в DOM, сделаем из них массив
  const formList = Array.from(document.querySelectorAll(setting.formSelector));
  // Переберём его
  formList.forEach((formElementAll) => {
    let newValidator = new FormValidator(setting, formElementAll);
    newValidator.enableValidation();
    validators.push(newValidator);
    //setEventListeners(formElementAll, setting); // Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

findEnableValidation (setting);

