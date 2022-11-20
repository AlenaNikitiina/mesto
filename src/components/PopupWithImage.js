import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    //this._popupSelector.querySelector('.form');
    this._imgLink = this._popupSelector.querySelector('.popup__image')
    this._imgFigcaption = this._popupSelector.querySelector('.popup__figcaption')
  }

  // перезапишем открытия попапов
  open (name, link) {
    super.open(); // родительский

    this._imgLink.src = link;
    this._imgLink.alt = name;
    this._imgFigcaption.textContent = name;
  }

}
