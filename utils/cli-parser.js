const getCliArguments = function () {
  const args = {};
  process.argv.slice(1).map((element) => {
    const matches = element.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      args[matches[1]] = matches[2].replace(/^['"]/, '').replace(/['"]$/, '');
    }
  });
  return args;
};

module.exports = {
  getCliArguments,
};
