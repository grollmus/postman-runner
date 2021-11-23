const { validator } = require('./args-validator.js');

describe('args validator', () => {
  it('should fail when no path to collection was provided.', () => {
    expect(() => validator.set({}, 'collection', undefined)).toThrow('No path to collection provided! Use --collection');
  });

  it('should set collection.', () => {
    const actual = {};
    expect(validator.set(actual, 'collection', 'valueofcollection')).toBeTruthy();
    expect(actual.collection).toBe('valueofcollection');
  });

  it('should fail when runCount is 0.', () => {
    expect(() => validator.set({}, 'runCount', 0)).toThrow('Provided runCount is less or equal than 0!');
  });

  it('should fail when runCount is not an integer.', () => {
    expect(() => validator.set({}, 'runCount', 'thisisnotaninteger')).toThrow('The runCount is not an integer!');
  });

  it('should set runCount when it is a valid integer.', () => {
    const actual = {};
    expect(validator.set(actual, 'runCount', 30)).toBeTruthy();
    expect(actual.runCount).toBe(30);
  });
});
