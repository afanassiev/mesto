export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }



  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item)
    });
    // initialCards.forEach((itemElement) => {


      // const card = new Card(itemElement, '.item__template');
      // const cardElement = card.generateCard();
      // this._addItem(cardElement);
    // });
  }

  addItem(item) {
    this._container.prepend(item);
  }

}