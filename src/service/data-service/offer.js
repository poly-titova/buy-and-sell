'use strict';

class OfferService {
  // конструктор принимает данные о всех объявлениях 
  // и сохраняет их в одноимённое приватное свойство
  constructor(offers) {
    this._offers = offers;
  }

  // метод который возвращает все объявления
  findAll() {
    return this._offers;
  }
};

module.exports = OfferService;