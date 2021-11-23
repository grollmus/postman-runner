const validator = {
  set: function (obj, prop, value) {
    if (prop === 'runCount') {
      value = Number.parseInt(value);
      if (!Number.isInteger(value)) {
        throw new TypeError('The runCount is not an integer!');
      }
      if (value <= 0) {
        throw new Error('Provided runCount is less or equal than 0!');
      }
    }

    if (prop === 'collection') {
      if (!value) throw new Error('No path to collection provided! Use --collection');
    }

    obj[prop] = value;
    return true;
  },
};

module.exports = {
  validator,
};
