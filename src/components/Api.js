export class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;

    // чтобы не писать одно и тоже
    this._checkServerAns = (response) => {
      if (response.ok) {
        return response.json(); // если все ок
      } else {
        Promise.reject(`Ошибка: ${response.status}`); //если все не ок скажи ошибка
      }
    }
  }



  deleteCard() {}

  addNewCard ( {name} ) {
    return fetch(this._url, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify( {name} )
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // если все ок
        } else {
          Promise.reject(`Ошибка: ${response.status}`); //если все не ок скажи ошибка
        }
      })
  }


}
