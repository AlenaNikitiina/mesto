export class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  // проверка ответа от сервера. Венысено в метод, чтобы не писать одно и тоже
  _checkServerAnswer (response) {
    if (response.ok) {
      return response.json(); // если все ок
    } else {
      Promise.reject(`Ошибка: ${response.status}`); //если все не ок скажи ошибка
    }
  }

  // 1 Получить информацию о пользователе обо мне
  getUserInfo () {
    return fetch(this._url + `/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 2 Загрузка списка карточек с сервера
  getInitialCards () {
    return fetch(this._url + `/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 3 Редактирование профиля
  editingProfile (newName, newAbout) {
    return fetch(this._url + `/users/me`, {
      method: 'PATCH', // заменить имя и работу
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newAbout
    })})
    .then(this._checkServerAnswer);
  }

  // 4 Добавить новую карточку
  uploadNewCard (name, link) {
    return fetch(this._url + `/cards`, {
      method: 'POST', // добавить карточку (POST)
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })})
      .then(this._checkServerAnswer);
  }

  // 5 Удалить карточку, ток свою
  removeCard (id) {
    return fetch(this._url + `/cards`, + id, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkServerAnswer);
  };

  // 6 Поменять аватар
  updateAvatar (avatarLink) { //ссылка на нов аватар
    return fetch(this._url + `/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink,
      })})
      .then(this._checkServerAnswer);
  }

  // Поставить лайк

  // Поставить лайк


}





/*
2 получить список всех карточек в виде массива (GET)
4 добавить карточку (POST)
5 удалить карточку (DELETE)
1 получить данные пользователя (GET)
3 заменить данные пользователя (PATCH)

заменить аватар (PATCH)
“залайкать” карточку (PUT)
удалить лайк карточки (DELETE)*/
