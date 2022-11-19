import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    //this._popupSelector.querySelector('.form');
    this._imgLink = this._popupSelector.querySelector('.popup__image')
    this._imgFigcaption = this._popupSelector.querySelector('.popup__figcaption')
  }

  // перезапишем открытия попапов
  openPopup (name, link) {
    super.openPopup();

    this._imgLink.src = link;
    this._imgCaption.textContent = name;
    this._imgLink.alt = name;
  }

}
