import { popupZoom, popupImage, popupFigcaption } from "./constants.js";

export class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handleCardClick = handleCardClick;

    //this._myHtmlElement = this._templateItem.cloneNode(true); //копируем содержимое тега темплате (было)
    this._myHtmlElement = this._templateItem.querySelector('.elements__card').cloneNode(true); // клонируем уже элемент разметки

    // наполняем содержимым
    this._myHtmlElement.querySelector('.element__title').textContent = name;
    const fotoZoomOpen = this._myHtmlElement.querySelector('.element__foto'); // попап зум картинки
    fotoZoomOpen.src = link;
    fotoZoomOpen.alt = name;

    // лайк
    this._buttonLike = this._myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка
    this._buttonLike.addEventListener('click', () => {
      this._likeIt();
    });

    // мусорка (не приватная, исп ток в одном методе)
    const trashButton = this._myHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
    trashButton.addEventListener('click', (evt) => {
      this._deletePhoto(evt);
    });

    // увелечение фотографий
    fotoZoomOpen.addEventListener('click', this._zoomPhoto.bind(this));
  }

  createCard () {
    return this._myHtmlElement;
  }

  _likeIt () {
    this._buttonLike.classList.toggle('element__like_active');
  }

  _deletePhoto () {
    this._myHtmlElement.remove();
    this._myHtmlElement = null;
  }

  _zoomPhoto (evt) {
    const picture = evt.target;
    popupImage.src = picture.src;
    popupImage.alt = picture.alt;
    popupFigcaption.textContent = picture.alt;
    this._handleCardClick(popupZoom);
  };

};
