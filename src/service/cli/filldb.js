"use strict";

const fs = require(`fs`).promises;
const {
  getPictureFilename,
  getRandomInt,
  shuffle
} = require(`../utils`);
const { getLogger } = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const defineModels = require(`../models`);
const Aliase = require(`../models/aliase`);
const { ExitCode, MAX_ID_LENGTH } = require(`../constants`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;

const pathCategories = `./data/categories.txt`;
const pathSentences = `./data/sentences.txt`;
const pathTitles = `./data/titles.txt`;
const pathComments = `./data/comments.txt`;

const {
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./mockData`);

const logger = getLogger({});

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.split(`\n`);
  } catch (err) {
    console.error(err);
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const getRandomSubarray = (items) => {
  items = items.slice();
  let count = getRandomInt(1, items.length - 1);
  const result = [];
  while (count--) {
    result.push(
      ...items.splice(
        getRandomInt(0, items.length - 1), 1
      )
    );
  }
  return result;
};

const generateOffers = (count, CATEGORIES, SENTENCES, TITLES, COMMENTS) =>
  Array(count)
    .fill({})
    .map(() => ({
      id: nanoid(6),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      picture: getPictureFilename(
        getRandomInt(PictureRestrict.min, PictureRestrict.max)
      ),
      description: shuffle(SENTENCES)
        .slice(1, 5)
        .join(` `),
      type: Object.keys(OfferType)[
        Math.floor(Math.random() * Object.keys(OfferType).length)
      ],
      sum: getRandomInt(SumRestrict.min, SumRestrict.max),
      categories: getRandomSubarray(CATEGORIES),
      comments:
        Array(getRandomInt(0, COMMENTS.length - 1))
          .fill({})
          .map(() => ({
            text: shuffle(COMMENTS).slice(0, getRandomInt(1, 3)).join(``),
            id: nanoid(MAX_ID_LENGTH)
          }))
    }));

module.exports = {
  name: `--filldb`,
  async run(userIndex) {
    try {
      logger.info(`Trying to connect to database...`);
      await sequelize.authenticate();
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
    logger.info(`Connection to database established`);

    const { Category, Offer } = defineModels(sequelize);
    await sequelize.sync({ force: true });

    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);
    const COMMENTS = await readFiles(pathComments);

    const categoryModels = await Category.bulkCreate(
      CATEGORIES.map((item) => ({ name: item }))
    );

    const [count] = userIndex;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(countOffer, TITLES, categoryModels, SENTENCES, COMMENTS);
    const offerPromises = offers.map(async (offer) => {
      const offerModel = await Offer.create(offer, { include: [Aliase.COMMENTS] });
      await offerModel.addCategories(offer.CATEGORIES);
    });
    await Promise.all(offerPromises);
  }
};
