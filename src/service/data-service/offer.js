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

  // метод который получает данные только для определённого объявления
  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }
};

module.exports = OfferService;