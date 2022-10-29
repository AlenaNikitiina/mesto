// Находим форму в DOM
//const formElementAll = document.querySelectorAll('.popup__form'); // все попапы с формами
const formEdit = document.querySelector('.form__edit'); // форма редактирования профиля
const formAdd = document.querySelector('.form__add'); // форма добавления карточки
// Про открытие и закрытие попапа
const popupEdit = document.querySelector('.popup_edit');// нашли попапы
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
const popupAll = document.querySelectorAll('.popup');
// Находим поля формы в DOM, в которых можно изменения писать
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
const titleInput = document.querySelector('.titleInput'); //из инпутов
const linkInput = document.querySelector('.linkInput');
// куда будут заноситься изменения имени и работы
const titleName = document.querySelector('.titleName');
const titleJob = document.querySelector('.titleJob');
// кнопки открытия и закрытия попапов (трех)
const buttonOpenEdit = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
const buttonOpenAdd = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const popupCloseButtons = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик
// Шесть карточек «из коробки»
const fotoCards = document.querySelector('.elements__list'); // получаем элемент. ul
const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
//zoom попап
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');
// валидация
const formInput = document.querySelector('.form__input'); // нашли инпут
const popupSaveButton = document.querySelector('.form__submit-add') // находим кнопку сабмита в форме нового места
// массив объектов Cards
var cards = []


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

// функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

// функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

// функция закрытия попапов по нажатию на Escape
const closeByEscape = (evt) => {
  if (evt.key === 'Escape') {
    const openedNowPopup = document.querySelector('.popup_opened')
    closePopup(openedNowPopup);
  }
}

// функции Открыть форму попапов по нажатию на кнопку
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  });
  buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});

// закрыть попапы нажав на оверлей или крестик
popupAll.forEach((item) => {
  item.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close-button')) {
      closePopup(item);
    }
  })
})


////


// функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    newCard = new Card(item.name, item.link, templateItem);
    cards.push(newCard); // добавляем вновь созданную карту в массив карточек
    console.log(cards.lenght);
    fotoCards.append(newCard.getElement()); //добавили элемент в DOM
    //fotoCards.append(createCard(item.name, item.link, templateItem)); //добавили элемент в DOM
  });
}

// функция отправки формы и создает новую карточку от человека
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

// функция добавления новой карточки в начало сайта
function addCard(name, link) {
  newCard = new Card(name, link, templateItem);
  cards.push(newCard); // добавляем вновь созданную карту в массив карточек
  fotoCards.prepend(newCard.getElement()); //добавили элемент в DOM
};


// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', submitHandlerForm);
formAdd.addEventListener('submit', createNewCard);

render();

