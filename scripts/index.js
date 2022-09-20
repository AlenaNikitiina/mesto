//1// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM, в которых можно изменения писать
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
//куда будут заноситься изменения имени и работы
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
const popupEl = document.querySelector('.popup');
//кнопки открытия и закрытия попапа
const openPopupButton = document.querySelector('.profile__edit-button');
const closePopupButton = popupEl.querySelector('.popup__close-button');

// функция Открыть форму по нажатию на кнопку
openPopupButton.addEventListener('click', () => {
  popupEl.classList.add('popup_opened');
})
// функция Закрыть форму по нажатию на кнопку
closePopupButton.addEventListener('click', () => {
  popupEl.classList.remove('popup_opened');
})
// функция закрыть попап
function closePopup() {
  popupEl.classList.remove('popup_opened');
}


//3////////////////////////////////////////////////////////////////////////////////////////////////////////////
const initialCards = [
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

const list = document.querySelector('.elements__list'); // получаем элемент. ul
const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
//const likeButton = document.querySelector('.element__like'); //нашли кнопку лайка
//const Button = document.querySelector('.'); будет кнопка мусорки

////вызвали функцию для каждого элемента из массива
function render() {
  initialCards.forEach(renderCard);
}

////Основаная функция. которая создает карточку с линками и именами из массива выше
function renderCard(name, link) {
  const newHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
  //наполняем содержимым
  newHtmlElement.querySelector('.element__title').textContent = name;
  newHtmlElement.querySelector('.element__foto').src = link;
  newHtmlElement.querySelector('.element__foto').alt = name;
  //добавили элемент в DOM
  //list.append(newHtmlElement);

  return newHtmlElement;
  //setListenersForItem(newHtmlElement); //назначаем слушатели внутри каждого элемента newHtmlElement-готовая карточка
}

// функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
initialCards.forEach((item) => {
  list.append(renderCard(item.name, item.link));
});

//функция вернуть готовую карточку
function setListenersForItem(event) {
  return ;

}
