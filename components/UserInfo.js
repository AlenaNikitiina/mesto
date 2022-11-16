export class UserInfo {
  constructor ({ nameSelector, aboutInfoSelector }) {
    this._userName = document.querySelector(nameSelector); // имя
    this._userAboutInfo = document.querySelector(aboutInfoSelector); // инфа о себе
  }

  // Метод возвращает объект с данными пользователя.пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo () {
    //console.log(this._userName, "==========", this._userName.textContent);
    return {
      profileName: this._userName.textContent,
      profileAboutInfo: this._userAboutInfo.textContent,
    }
  }

  // Метод который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (newProfileName, newProfileAboutInfo) {
    this._userName.textContent = newProfileName,
    this._userAboutInfo.textContent = newProfileAboutInfo;
  }

}
