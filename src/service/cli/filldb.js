"use strict";

const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);
const { getLogger } = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const initDatabase = require(`../lib/init-db`);
const passwordUtils = require(`../lib/password`);

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;

const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const logger = getLogger({});

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.trim().split(`\n`);
  } catch (err) {
    logger.error(`Error when reading file: ${err.message}`);
    return [];
  }
};

const generateComments = (count, comments, users) => (
  Array(count).fill({}).map(() => ({
    user: users[getRandomInt(0, users.length - 1)].email,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `)
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

const getPictureFileName = (number) => `item${number.toString().padStart(2, 0)}.jpg`;

const generateOffers = (count, titles, categories, sentences, comments, users) => (
  Array(count).fill({}).map(() => ({
    user: users[getRandomInt(0, users.length - 1)].email,
    title: titles[getRandomInt(0, titles.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(sentences).slice(1, 5).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    categories: getRandomSubarray(categories),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments, users),
  }))
);

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

    const categories = await readFiles(FILE_CATEGORIES_PATH);
    const sentences = await readFiles(FILE_SENTENCES_PATH);
    const titles = await readFiles(FILE_TITLES_PATH);
    const comments = await readFiles(FILE_COMMENTS_PATH);
    const users = [
      {
        name: `Иван Иванов`,
        email: `ivanov@example.com`,
        passwordHash: await passwordUtils.hash(`ivanov`),
        avatar: `avatar01.jpg`
      },
      {
        name: `Пётр Петров`,
        email: `petrov@example.com`,
        passwordHash: await passwordUtils.hash(`petrov`),
        avatar: `avatar02.jpg`
      }
    ];

    const [count] = userIndex;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const offers = generateOffers(countOffer, titles, categories, sentences, comments, users);

    return initDatabase(sequelize, { offers, categories, users });
  }
};
