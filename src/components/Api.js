/*получить список всех карточек в виде массива (GET)
добавить карточку (POST)
удалить карточку (DELETE)
получить данные пользователя (GET)
заменить данные пользователя (PATCH)
заменить аватар (PATCH)
“залайкать” карточку (PUT)
удалить лайк карточки (DELETE)*/

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

  // достать все карточки с сервера
  getAllCards() {
    return fetch(this._url + `/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  getUserInfo() {
    return fetch(this._url + `/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkServerAnswer);
  }

}
