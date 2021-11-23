const { validator } = require('./args-validator.js');

const parseAllCliArguments = function () {
  const args = {};
  process.argv.slice(1).map((element) => {
    const matches = element.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      args[matches[1]] = matches[2].replace(/^['"]/, '').replace(/['"]$/, '');
    }
  });
  return args;
};

const getCliArguments = () => {
  const { runCount = 10, collection } = parseAllCliArguments();

  const validatedArgs = new Proxy({}, validator);
  validatedArgs.runCount = runCount;
  validatedArgs.collection = collection;

  return validatedArgs;
};

module.exports = {
  getCliArguments,
};
