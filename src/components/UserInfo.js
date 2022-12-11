export class UserInfo {
  constructor ({ nameSelector, aboutInfoSelector, avatarSelector }) {
    this._userName = document.querySelector(nameSelector); // имя
    this._userAboutInfo = document.querySelector(aboutInfoSelector); // инфа о себе
    this._userAvatar = document.querySelector(avatarSelector); // фото профиля
  }

  // Метод возвращает объект с данными пользователя.пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo () {
    return {
      profileName: this._userName.textContent,
      profileAboutInfo: this._userAboutInfo.textContent,
      profileAvatar: this._userAvatar,
    }
  }

  // Метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (newProfileName, newProfileAboutInfo, newProfileAvatar) {
    this._userName.textContent = newProfileName,
    this._userAboutInfo.textContent = newProfileAboutInfo;
    this._userAvatar.src = newProfileAvatar
  }

}
