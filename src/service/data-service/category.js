class CategoryService {
  // конструктор класса принимает один аргумент — offers, 
  // тот самый массив информации с объявлениями
  constructor(offers) {
    this._offers = offers;
  }

  // формирование массива всех категорий для которых есть объявления
  findAll() {
    const categories = this._offers.reduce((acc, offer) => {
      acc.add(...offer.category);
      return acc;
      // сохраняем лишь уникальные элементы
    }, new Set());

    return [...categories];
  }
}

module.exports = CategoryService;