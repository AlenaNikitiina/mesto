import { Popup } from "./Popup.js"

export class PopupWithSubmmitDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._submitForm = this._popup.querySelector('#delete-card');
  }

  open(handleConfirmDelete) {
    super.open();
    this._handleConfirmDelete = handleConfirmDelete;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmDelete = (evt) => {
      evt.preventDefault();
      this._handleConfirmDelete();
    }
    this._submitForm.addEventListener('submit', this._confirmDelete);
  }
}

