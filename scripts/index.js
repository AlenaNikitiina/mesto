// Находим форму в DOM
const formElement = document.querySelector('.popup__form');
// Про открытие и закрытие попапа
const popupEdit = document.querySelector('.popup_edit');// нашли попапы
const popupAdd = document.querySelector('.popup_add');
const popupZoom = document.querySelector('.popup_zoom');
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
const list = document.querySelector('.elements__list'); // получаем элемент. ul
const templateItem = document.querySelector('.element-template').content; //получаем содержимое template
//zoom попап
const popupImage = document.querySelector('.popup__image');
const popupFigcaption = document.querySelector('.popup__figcaption');


// Обработчик «отправки» формы и evt.preventDefault - убирает перезагрузку страницы
function submitHandlerForm (evt) {
  evt.preventDefault();

  //const nameValue = nameInput.value;
  //const jobValue = jobInput.value;
  //будут меняться в профиле
  //titleName.textContent = nameValue;
  //titleJob.textContent = jobValue;

  titleName.textContent = nameInput.value;
  titleJob.textContent = jobInput.value;

 //вызвали функцию которая закрывает форму при сохранении
  closePopup(popupEdit);
}

//function a () {
  //nameInput.value = titleName.textContent;
  //jobInput.value = titleJob.textContent;

  //const nameValue = nameInput.value;
  //const jobValue = jobInput.value;

  //titleName.textContent = nameInput.value;
  //titleJob.textContent = jobInput.value;

  //nameInput.value = titleName.textContent;
  //jobInput.value = titleJob.textContent;}


// функция открытия попапов
function openPopup (item) {
  item.classList.add('popup_opened');
}
// функция закрытия попапов
function closePopup (item) {
  item.classList.remove('popup_opened');
}

// функция закрыть попапы по нажатию на кнопку крестик
popupCloseButtons.forEach(button => {
  button.addEventListener('click', () =>
  closePopup(button.closest('.popup')));
});

// функции Открыть форму попапов по нажатию на кнопку
buttonOpenEdit.addEventListener('click', () => {
  openPopup(popupEdit); // вызываю функцию открытия
  nameInput.value = titleName.textContent;
  jobInput.value = titleJob.textContent;
  });

buttonOpenAdd.addEventListener('click', () => {
  openPopup(popupAdd);
});


// Основаная функция. которая создает карточку с линками и именами из массива выше
function createCard(name, link) {
  const newHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
  //наполняем содержимым
  newHtmlElement.querySelector('.element__title').textContent = name;
  const fotoZoomOpen = newHtmlElement.querySelector('.element__foto'); // открыть попап зум картинки
  fotoZoomOpen.src = link;
  fotoZoomOpen.alt = name;

  //лайк
  const buttonLike = newHtmlElement.querySelector('.element__like'); // нашли кнопку лайка
  buttonLike.addEventListener('click', (item) => {
    likeIt(buttonLike);
  });
  //функция постановки лайка
  function likeIt (item) {
  item.classList.toggle('element__like_active');
  };
  //мусорка
  const trashButton = newHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
  trashButton.addEventListener("click", (evt) => {
    const currentPhoto =  evt.target.closest('.elements__card');
    currentPhoto.remove();
  });
  // увелечение фотографий
  fotoZoomOpen.addEventListener('click', function (evt) {
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
    list.append(createCard(item.name, item.link)); //добавили элемент в DOM
  });
}
render();

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

// функция добавления новой карточки в начало сайта
function addCard(name, link) {
  const newCard = createCard(name, link);
  list.prepend(newCard); //добавили элемент в DOM
};

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
popupEdit.addEventListener('submit', submitHandlerForm);
popupAdd.addEventListener('submit', createNewCard);
