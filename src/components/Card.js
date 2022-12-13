export class Card {
  constructor(name, link, likes, templateSelector, cardId, handlePreview, handleDeleteOnClick, handlePutLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handlePreview = handlePreview;
    this._handleDeleteOnClick = handleDeleteOnClick;
    this._handlePutLike = handlePutLike;

    this._haveMyLike = false;

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

    this._putLikes();
  };

  createCard () {
    return this._myHtmlElement;
  };

  _likeIt () {
    //console.log("card cardId ", this._cardId, this._name);
    this._buttonLike.classList.toggle('element__like_active');

    this._handlePutLike(!this._haveMyLike, this._cardId, this.updateLikesList.bind(this));
    this._haveMyLike = !this._haveMyLike;
    //console.log("like switch");
  };

  // _deletePhoto () {
  deletePhoto () {
    this._myHtmlElement.remove();
    this._myHtmlElement = null;
  };

  _zoomPhoto (evt) {
    this._handlePreview(this._name, this._link);
  };

  // подсчет числа лайков
  _putLikes () {
    const likeCount = this._myHtmlElement.querySelector('.element__like-counter'); // нашли счетчик лайков
    likeCount.textContent = this._likes.length;
  }

  // обновление списка лайков
  updateLikesList(likesList) {
    this._likes = likesList;
    this._putLikes();
  }


  //   this._element.querySelector('.card__delete-button')
  //.classList.add(this._userId === this._ownerId ? 'card__delete-button_visible' : 'card__delete-button_hcardIdden');

  // всем слушатели
  _setListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._likeIt();
    });
    this._trashButton.addEventListener('click', () => {
      this._handleDeleteOnClick(this._cardId, this);
      //this._deletePhoto();
    });
    this._fotoZoomOpen.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  };

};
