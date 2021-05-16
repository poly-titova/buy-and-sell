"use strict";

const Aliase = require(`../models/aliase`);

class OfferService {
  constructor(sequelize) {
    this._Offer = sequelize.models.Offer;
    this._Comment = sequelize.models.Comment;
    this._Category = sequelize.models.Category;
  }

  async create(offerData) {
    const offer = await this._Offer.create(offerData);
    await offer.addCategories(offerData.categories);
    return offer.get();
  }

  async drop(id) {
    const deletedRows = await this._Offer.destroy({
      where: { id }
    });
    return !!deletedRows;
  }

  findOne(id) {
    return this._Offer.findByPk(id, { include: [Aliase.CATEGORIES] });
  }

  async update(id, offer) {
    const [affectedRows] = await this._Offer.update(offer, {
      where: { id }
    });
    return !!affectedRows;
  }

  async findAll(needComments) {
    const include = [Aliase.CATEGORIES];
    if (needComments) {
      include.push(Aliase.COMMENTS);
    }
    const offers = await this._Offer.findAll({ include });
    return offers.map((item) => item.get());
  }

  async findPage({ limit, offset }) {
    const { count, rows } = await this._Offer.findAndCountAll({
      limit,
      offset,
      include: [Aliases.CATEGORIES],
      distinct: true
    });
    return { count, offers: rows };
  }
}

module.exports = OfferService;
