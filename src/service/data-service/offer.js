'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../constants`)

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

  // метод который создаёт новое объявление
  // полученные данные мы просто добавляем в массив — хранилище
  create(offer) {
    const newOffer = Object
      .assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);

    this._offers.push(newOffer);
    return newOffer;
  }

  // метод который редактирует определённое объявление
  update(id, offer) {
    const oldOffer = this._offers
      .find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }
};

module.exports = OfferService;