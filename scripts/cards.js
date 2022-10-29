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

class Card {
  constructor(name, link, templateItem) {
    this.myHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
    //наполняем содержимым
    this.myHtmlElement.querySelector('.element__title').textContent = name;
    const fotoZoomOpen = this.myHtmlElement.querySelector('.element__foto'); // открыть попап зум картинки
    fotoZoomOpen.src = link;
    fotoZoomOpen.alt = name;

    //лайк
    const buttonLike = this.myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка
    buttonLike.addEventListener('click', (item) => {
      this._likeIt(buttonLike);
    });

    //мусорка
    const trashButton = this.myHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
    trashButton.addEventListener("click", this._deletePhoto);

    // увелечение фотографий
    fotoZoomOpen.addEventListener('click', this._zoomPhoto);
  }

  getElement() {
    return this.myHtmlElement;
  }

  _likeIt (item) {
    item.classList.toggle('element__like_active');
  }

  _deletePhoto(evt) {
    const currentPhoto =  evt.target.closest('.elements__card');
    currentPhoto.remove();
  }

  _zoomPhoto(evt) {
    const picture = evt.target;
    popupImage.src = picture.src;
    popupImage.alt = picture.alt;
    popupFigcaption.textContent = picture.alt;
    openPopup(popupZoom);
  }
};
