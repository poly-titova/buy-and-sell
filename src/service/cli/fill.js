'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {
  getRandomInt,
  shuffle,
} = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COMMENTS = 4;
const FILE_NAME = `fill-db.sql`;
const {
  OfferType,
  SumRestrict,
  PictureRestrict
} = require(`./mockData`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;

const readFiles = async (path) => {
  try {
    const result = await fs.readFile(path, `utf8`);
    return result.split(`\n`);
  } catch (err) {
    console.error(err);
  }
};

const generateComments = (count, offerId, userCount, comments) => (
  Array(count).fill({}).map(() => ({
    userId: getRandomInt(1, userCount),
    offerId: offerId,
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, categoryCount, userCount, sentences, comments) => (
  Array(count).fill({}).map((_, index) => ({
    category: [getRandomInt(1, categoryCount)],
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), index + 1, userCount, comments),
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: OfferType[Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)]],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    userId: getRandomInt(1, userCount)
  }))
);

module.exports = {
  name: `--fill`,
  async run(userIndex) {
    const CATEGORIES = await readFiles(pathCategories);
    const SENTENCES = await readFiles(pathSentences);
    const TITLES = await readFiles(pathTitles);
    const COMMENTS = await readFiles(pathComments);
    
    const [count] = userIndex;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    const users = [
      {
        email: `ivanov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Иван`,
        lastName: `Иванов`,
        avatar: `avatar1.jpg`
      },
      {
        email: `petrov@example.com`,
        passwordHash: `5f4dcc3b5aa765d61d8327deb882cf99`,
        firstName: `Пётр`,
        lastName: `Петров`,
        avatar: `avatar2.jpg`
      }
    ];

    const offers = generateOffers(countOffer, titles, categories.length, users.length, sentences, commentSentences);

    const comments = offers.flatMap((offer) => offer.comments);

    const offerCategories = offers.map((offer, index) => ({offerId: index + 1, categoryId: offer.category[0]}));

    const userValues = users.map(
        ({email, passwordHash, firstName, lastName, avatar}) =>
          `('${email}', '${passwordHash}', '${firstName}', '${lastName}', '${avatar}')`
    ).join(`,\n`);

    const categoryValues = categories.map((name) => `('${name}')`).join(`,\n`);

    const offerValues = offers.map(
        ({title, description, type, sum, picture, userId}) =>
          `('${title}', '${description}', '${type}', ${sum}, '${picture}', ${userId})`
    ).join(`,\n`);

    const offerCategoryValues = offerCategories.map(
        ({offerId, categoryId}) =>
          `(${offerId}, ${categoryId})`
    ).join(`,\n`);

    const commentValues = comments.map(
        ({text, userId, offerId}) =>
          `('${text}', ${userId}, ${offerId})`
    ).join(`,\n`);
  }
};
