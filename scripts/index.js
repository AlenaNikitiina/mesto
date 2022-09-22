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

//1// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
//2// Про открытие и закрытие попапа
const popupEdit = document.querySelector('.popup_edit');// нашли попапы
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
// Находим поля формы в DOM, в которых можно изменения писать
const nameInput = document.querySelector('.nameInput');
const jobInput = document.querySelector('.jobInput');
const titleInput = document.querySelector('.titleInput'); //из инпутов
const linkInput = document.querySelector('.linkInput');
//куда будут заноситься изменения имени и работы
let titleName = document.querySelector('.titleName');
let titleJob = document.querySelector('.titleJob');
//кнопки открытия и закрытия попапов (трех)
const openEditButton = document.querySelector('.profile__edit-button'); //кнопка редактирования профиля и открытия попапа
const openAddButton = document.querySelector('.profile__add-button'); //кнопка добавления нового места
const closePopupButton = document.querySelectorAll('.popup__close-button'); // кнопка закрыть попап, крестик

// Обработчик «отправки» формы и evt.preventDefault - убирает перезагрузку страницы
function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  //будут меняться в профиле
  titleName.textContent = nameValue;
  titleJob.textContent = jobValue;
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener('submit', formSubmitHandler);
popupAdd.addEventListener('submit', createNewCard);

//функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
}
// функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
}

// функции Открыть форму попапов по нажатию на кнопку
openEditButton.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
});
openAddButton.addEventListener('click', () => {
  openPopup(popupAdd);
});

//функция закрыть попапы по нажатию на кнопку крестик
closePopupButton.forEach(button => {
  button.addEventListener('click', () =>
  closePopup(button.closest('.popup')));
});


//// Шесть карточек «из коробки»
const list = document.querySelector('.elements__list'); // получаем элемент. ul
const templateItem = document.querySelector('.element-template').content; //получаем содержимое template

//Основаная функция. которая создает карточку с линками и именами из массива выше
function renderCard(name, link) {
  const newHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
  //наполняем содержимым
  newHtmlElement.querySelector('.element__title').textContent = name;
  newHtmlElement.querySelector('.element__foto').src = link;
  newHtmlElement.querySelector('.element__foto').alt = name;

  //лайк
  const likeButton = newHtmlElement.querySelector('.element__like'); //нашли кнопку лайка
  likeButton.addEventListener('click', (item) => {
    like(likeButton);
  });
  //функция постановки лайка
  function like (item) {
  item.classList.toggle('element__like_active');
  };
  //мусорка
  const trashButton = newHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
  trashButton.addEventListener("click", (evt) => {
    evt.target.parentElement.remove();
  });
  //zoom попап
  const openFotoZoom = newHtmlElement.querySelector('.element__foto'); // открыть попап зум картинки
  const popupImage = document.querySelector('.popup__image');
  const popupFigcaption = document.querySelector('.popup__figcaption');
  openFotoZoom.addEventListener('click', function (evt) {
    const picture = evt.target;
    popupImage.src = picture.src;
    popupImage.alt = picture.alt;
    popupFigcaption.textContent = picture.alt;
    openPopup(popupZoom);
  });

  return newHtmlElement;
}

// функция создания карточек для каждого эл-та из массива. (переберет 6 раз и каждому назначит имя, линк, альт)
function render () {
  initialCards.forEach((item) => {
    list.append(renderCard(item.name, item.link)); //добавили элемент в DOM
  });
}
render();

//функция добавления новой карточки в начало сайта
function addCard(name, link) {
  const newCard = renderCard(name, link);
  list.prepend(newCard); //добавили элемент в DOM
};

// функция отправки формы и создает новую карточку от человека
function createNewCard (evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;
  // вызвали функцию которая добавит новую карточку
  addCard(titleValue, linkValue)
 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupAdd);
}
