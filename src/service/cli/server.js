'use strict';

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const routes = require(`../api`);
const { getLogger } = require(`../lib/logger`);

// подключим логгер
const logger = getLogger({ name: `api` });

// подключим статус-коды
const { HttpCode, API_PREFIX } = require(`../constants`);

// порт по умолчанию и имя файла с моками
const DEFAULT_PORT = 3000;

// создание express сервера
const app = express();

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`))

module.exports = {
  name: `--server`,
  async run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  }
};