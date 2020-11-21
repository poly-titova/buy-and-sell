"use strict";

const DEFAULT_COMMAND = `--help`;
const USER_ARGV_INDEX = 2;
const ExitCode = {
  success: 0,
  fail: 1
};

module.exports = {
  DEFAULT_COMMAND,
  USER_ARGV_INDEX,
  ExitCode
};

// описали различные статус-коды
module.exports.HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

module.exports.API_PREFIX = `/api`;
module.exports.MAX_ID_LENGTH = 6;

module.exports.Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`
}