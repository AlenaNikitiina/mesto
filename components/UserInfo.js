export class UserInfo {
  constructor ({ userName, userAboutInfo }) {
    this._userName = document.querySelector(userName); // имя
    this._userAboutInfo = document.querySelector(userAboutInfo); // инфа о себе
  }

  // возвращает объект с данными пользователя.пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo () {
    return {
      userName: this._userName.textContent,
      userAboutInfo: this._userAboutInfo.textContent,
    }
  }

  // который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (userName, userAboutInfo) {
    this._userName.textContent = userName,
    this._userAboutInfo.textContent = userAboutInfo;
  }

}




/*
 // возвращает объект с данными пользователя.пригодится когда данные пользователя нужно будет подставить в форму при открытии
  getUserInfo () {
    return {
      profileName: this._userName.textContent,
      profileAabout: this._userAboutInfo.textContent,
    }
  }

  // который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo (profileName, profileAabout) {
    this._userName.textContent = profileName,
    this._userAboutInfo.textContent = profileAabout;
    */
