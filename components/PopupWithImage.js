import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._link = this._popup.querySelector('.popup__image')
    this._name = this._popup.querySelector('.popup__figcaption')
  }

  // перезапишем открытия попапов
  openPopup (name, link) {
    super.openPopup();
    this._name.alt = name;
    this._link.src = link;
    this._name.textContent = name;
    }

}
