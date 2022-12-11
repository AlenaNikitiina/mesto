export class Card {
  constructor(name, link, likes, templateSelector, id, handlePreview, handleDeleteOnClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handlePreview = handlePreview;
    this._handleDeleteOnClick = handleDeleteOnClick;

    // клонируем уже элемент разметки
    this._myHtmlElement = this._templateItem.querySelector('.elements__card').cloneNode(true);
    // наполняем содержимым
    this._myHtmlElement.querySelector('.element__title').textContent = name; //добавляем подпись под фоткой

    this._fotoZoomOpen = this._myHtmlElement.querySelector('.element__foto'); // попап зум картинки
    this._fotoZoomOpen.src = link; // добавили атрибут
    this._fotoZoomOpen.alt = name;

    // лайк
    this._buttonLike = this._myHtmlElement.querySelector('.element__like'); // нашли кнопку лайка

    // мусорка
    this._trashButton = this._myHtmlElement.querySelector('.element__trash-button'); // нашли мусорку

    //
    this._setListeners();

    this.putLikes();
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

  // счетчик лайков
  putLikes () {
    const likeCount = this._myHtmlElement.querySelector('.element__like-counter'); // нашли счетчик лайков
    likeCount.textContent = this._likes.length;
  }

  // всем слушатели
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._likeIt();
    });
    this._trashButton.addEventListener('click', () => {
      this._handleDeleteOnClick(this._id);
      // was  this._deletePhoto();
    });
    this._fotoZoomOpen.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  };

};
