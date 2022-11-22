export class Card {
  constructor(name, link, templateSelector, handlePreview) {
    this._name = name;
    this._link = link;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handlePreview = handlePreview;

    // клонируем уже элемент разметки
    this._myHtmlElement = this._templateItem.querySelector('.elements__card').cloneNode(true);
    // наполняем содержимым
    this._myHtmlElement.querySelector('.element__title').textContent = name;

    this._fotoZoomOpen = this._myHtmlElement.querySelector('.element__foto'); // попап зум картинки
    this._fotoZoomOpen.src = link;
    this._fotoZoomOpen.alt = name;

    // лайк
    this._buttonLike = this._myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка

    // мусорка
    this._trashButton = this._myHtmlElement.querySelector('.element__trash-button'); // нашли мусорку

    //
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
    this._fotoZoomOpen.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  };

};
