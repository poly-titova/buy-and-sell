'use strict';

const {HttpCode} = require(`../constants`);

const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];
const HTTP_CODE_BAD_REQUEST = 400;

module.exports = (req, res, next, schema) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  async (req, res, next) => {
    const { body } = req;

    try {
      await schema.validateAsync(body, { abortEarly: false });
    } catch (err) {
      const { details } = err;
      res.status(HTTP_CODE_BAD_REQUEST).json({
        message: details.map((errorDescription) => errorDescription.message),
        data: body
      });
      return;
    }

    next();
  }

  if (!keysExists) {
    res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }

  next();
};
