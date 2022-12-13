export class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector); // попап в котором находимся
    this._handleEscClose = this._handleEscClose.bind(this); // привязали 1 раз
  };

  // Метод открытия попапов
  open () {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose); // передаем ссылку (на кнопки можно вещать слушать документ)
  };

  // Метод закрытия попапов
  close () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose); // передаем и удаляем ссылку
  };

  // Метод, закрывает попап по нажатию на Esc
  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close(); }
  };

  // Метод,который добавляет слушатель клика крестику (иконке) закрытия попапа
  setEventListeners () {
    const popupCloseButtons = this._popup.querySelector('.popup__close-button');
    popupCloseButtons.addEventListener('click', () => {
      this.close();
    });
    // клик вне формы
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  };



  /*
  _renderLoading(isLoading, statusText) {
    if (isLoading) {
      this._popup.querySelector('.popup__save-button').textContent = 'Сохранение...';
    } else {
      this._popup.querySelector('.popup__save-button').textContent = statusText;
    }
  }
*/
}
