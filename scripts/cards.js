import { popupZoom, popupImage, popupFigcaption } from "./constants.js";

export class Card {
  constructor(name, link, templateItem, openPopupFunc) {
    this._name = name;
    this._link = link;
    this._templateItem = templateItem;
    this._openPopupFunc = openPopupFunc;
    console.log(typeof this._openPopupFunc)

    this._myHtmlElement = templateItem.cloneNode(true); //копируем содержимое тега темплате
    //наполняем содержимым
    this._myHtmlElement.querySelector('.element__title').textContent = name;
    const fotoZoomOpen = this._myHtmlElement.querySelector('.element__foto'); // открыть попап зум картинки
    fotoZoomOpen.src = link;
    fotoZoomOpen.alt = name;

    //лайк
    const buttonLike = this._myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка
    buttonLike.addEventListener('click', (item) => {
      this._likeIt(buttonLike);
    });

    //мусорка
    const trashButton = this._myHtmlElement.querySelector('.element__trash-button'); // нашли кнопку мусорки
    trashButton.addEventListener("click", this._deletePhoto);

    // увелечение фотографий
    //fotoZoomOpen.addEventListener('click', this._zoomPhoto); //они все приватные ?
    //fotoZoomOpen.addEventListener('click', function(evt) {this._zoomPhoto(evt)}); //они все приватные ?
    fotoZoomOpen.addEventListener('click', this._zoomPhoto.bind(this));

  //console.log(this)
  }

  getElement() {
    return this._myHtmlElement;
  }

  _likeIt (item) {
    item.classList.toggle('element__like_active');
  }

  _deletePhoto (evt) {
    const currentPhoto =  evt.target.closest('.elements__card');
    currentPhoto.remove();
  }

  _zoomPhoto (evt) {
    const picture = evt.target;
    popupImage.src = picture.src;
    popupImage.alt = picture.alt;
    popupFigcaption.textContent = picture.alt;
    //console.log(this)
    //console.log(typeof this._openPopupFunc)
    this._openPopupFunc(popupZoom);
  }

};
