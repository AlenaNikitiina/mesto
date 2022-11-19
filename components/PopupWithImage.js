import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);
    this._imgLink = this._popup.querySelector('.popup__image')
    this._imgFigcaption = this._popup.querySelector('.popup__figcaption')
  }

  // перезапишем открытия попапов
  openPopup (name, link) {
    super.openPopup();
    //this._name.alt = name;
    //this._link.src = link;
    //this._name.textContent = name;
    this._name = name;
    this._link = link;

    this._imgLink.src = this._link;
    this._imgFigcaption.textContent = this._name;
    this._imgLink.alt = this._name;
    }

}
