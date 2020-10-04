'use strict';

// подключим дополнительные пакеты
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

// подключим статус-коды
const { HttpCode } = require(`../constants`);

// порт по умолчанию и имя файла с моками
const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;

module.exports = {
  name: `--server`,
  run(args) {
    const [userPort] = args;
    const port = Number(parseInt(userPort, 10)) || DEFAULT_PORT;
  }
};