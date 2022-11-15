export class Section {
  constructor ( { items, renderer }, containerSelector ) {
    this._renderedItems = items; // это Свойство — это массив данных, которые нужно добавить на страницу при инициализации класса.
    this._renderer = renderer; // — это функция, которая отвечает за создание и отрисовку данных на странице, она лежит в индекс.жс
    this._container = document.querySelector(containerSelector); // контейнер куда вставляем элементы/ карточки
  }

  // метод, кот отвечает за отрисовку всех элементов
  rendererAllItems () {
    this._renderedItems.forEach((item) => {
      this._renderer(item); // вызвали метод ниже кот добавит в дом
    });
  }

  // который принимает DOM-элемент и добавляет его в контейнер.
  addItem (element) {
    this._container.append(element); // принимает параметр element и вставляет его в контейнер методом append
  }

  // Метод, удаляет содержимое поля
  //clear () { this._container.innerHTML = ''; }

}
