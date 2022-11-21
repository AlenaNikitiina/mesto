export class Card {
  constructor(name, link, templateSelector, handlePreview) {
    this._name = name;
    this._link = link;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handlePreview = handlePreview;

    this._popupImage = document.querySelector('.popup__image'); // нашли картинку
    this._popupFigcaption = document.querySelector('.popup__figcaption'); // нашли подпись к картинке

    // клонируем уже элемент разметки
    this._myHtmlElement = this._templateItem.querySelector('.elements__card').cloneNode(true);
    // наполняем содержимым
    this._myHtmlElement.querySelector('.element__title').textContent = name;
    const fotoZoomOpen = this._myHtmlElement.querySelector('.element__foto'); // попап зум картинки
    fotoZoomOpen.src = link;
    fotoZoomOpen.alt = name;

    //this._popupImage = this._myHtmlElement.querySelector('.popup__image'); // нашли картинку
    //this._popupFigcaption = this._myHtmlElement.querySelector('.popup__figcaption'); // нашли подпись к картинке

    // лайк
    this._buttonLike = this._myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка

    // мусорка
    this._trashButton = this._myHtmlElement.querySelector('.element__trash-button'); // нашли мусорку

    // увелечение фотографий
    fotoZoomOpen.addEventListener('click', this._zoomPhoto.bind(this));

    this._setListeners();
  };

  createCard () {
    return this._myHtmlElement;
  };

  _likeIt () {
    this._buttonLike.classList.toggle('element__like_active');
  };

  _deletePhoto () {
    this._myHtmlElement.remove();
    this._myHtmlElement = null;
  };

  _zoomPhoto (evt) {
    const picture = evt.target;
    this._popupImage.src = picture.src;
    this._popupImage.alt = picture.alt;
    this._popupFigcaption.textContent = picture.alt;
    this._handlePreview(this._name, this._link);
  };

  // всем слушатели
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._likeIt();
    });
    this._trashButton.addEventListener('click', () => {
      this._deletePhoto();
    });
    this._popupImage.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  };

};
