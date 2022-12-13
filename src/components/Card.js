export class Card {
  constructor(name, link, likes, templateSelector, cardId, myUserId, ownerId, handlePreview, handleDeleteOnClick, handlePutLike) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = cardId;
    this._myUserId = myUserId;
    this._ownerId = ownerId;
    this._templateItem = document.querySelector(templateSelector).content;
    this._handlePreview = handlePreview;
    this._handleDeleteOnClick = handleDeleteOnClick;
    this._handlePutLike = handlePutLike;

    this._haveMyLike = false;

    this._likes.forEach( (item) => {
      if (item._id === this._myUserId) { // сравниваем со своим
        this._haveMyLike = true;
      }
    });

    this._canDelete = this._myUserId === this._ownerId; // если да то оставить мусорку

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

    if (this._haveMyLike)
      this._buttonLike.classList.toggle('element__like_active');

    // активируем мусорку, если карточка наша
    this._trashButton.classList.add(this._canDelete ? 'element__trash-button_visible' : 'element__trash-button_hidden')

  };

  create () {
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
    if (this._canDelete) {
      this._trashButton.addEventListener('click', () => {
        this._handleDeleteOnClick(this._cardId, this);
      });
    }
    this._fotoZoomOpen.addEventListener('click', () => {
      this._handlePreview(this._name, this._link);
    });
  };

};
