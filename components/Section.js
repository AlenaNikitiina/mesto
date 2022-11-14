import {fotoCards } from "../utils/constants.js";

export class Section {
  constructor ( { items, renderer }, containerSelector ) {
    this._items = items; // массив с именами линками карточек? this._renderedItems = items;
    this._renderer = renderer;
    console.log(containerSelector)
    this._container = document.querySelector(containerSelector); // контейнер куда вставляем элементы/ карточки
    // Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
    // Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице, она лежит в индекс.жс
  }

  // метод, кот отвечает за отрисовку всех элементов
  rendererAllItems () {
    this._items.forEach((item) => {
      this._renderer(item); // вызвали метод ниже кот добавит в дом
    });
  }

  // который принимает DOM-элемент и добавляет его в контейнер.
  addItem (element) {
    console.log(this._container)
    this._container.append(element); // принимает параметр element и вставляет его в контейнер методом append
  }

  // Метод, удаляет содержимое поля
  //clear () { this._container.innerHTML = ''; }

}

