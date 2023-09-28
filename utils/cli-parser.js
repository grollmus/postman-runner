const { validator } = require('./args-validator.js');
const chalk = require('chalk');

const parseAllCliArguments = function () {
  const args = {};
  process.argv.slice(1).map((element) => {
    const matches = element.match('--([a-zA-Z0-9]+)=?(.*)');
    if (matches) {
      args[matches[1]] = matches[2] ? matches[2].replace(/^['"]/, '').replace(/['"]$/, '') : true;
    }
  });
  return args;
};

const getCliArguments = () => {
  const { runCount = 10, collection, insecure, folder = '' } = parseAllCliArguments();

  try {
    const validatedArgs = new Proxy({}, validator);
    validatedArgs.runCount = runCount;
    validatedArgs.collection = collection;
    validatedArgs.insecure = insecure;
    validatedArgs.folder = folder;
    return validatedArgs;
  } catch (error) {
    console.error(chalk.bold.bgRed(error.message));
  }
};

module.exports = {
  getCliArguments,
};
