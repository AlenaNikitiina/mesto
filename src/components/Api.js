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

  //1 достать все чужие карточки с сервера (Загрузка информации о пользователе с сервера)
  getAllCards() {
    return fetch(this._url + `/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }


  // 2 грузим информацию о пользователе
  getUserInfo() {
    return fetch(this._url + `/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then(this._checkServerAnswer);
  }

  // 3 Редактирование профиля save new info
  profileEditing (name, about) {
    return fetch(this._url + `/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
    .then(this._checkServerAnswer),
    });
  }



  removeCard (id) {
    return fetch(this._url + '/cards' + id)
  }

}



/*
addLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: "PUT",
    headers: this._headers,
  }).then(this._checkResponse);
}

deleteLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: "DELETE",
    headers: this._headers,
  }).then(this._checkResponse);
}
*/
