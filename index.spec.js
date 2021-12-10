describe('postman-runner', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error');
  beforeEach(() => {
    jest.resetModules();
    process.argv = ['', ''];
  });

  it('should fail when no path to collection was provided.', () => {
    require('./index.js');
    expect(consoleErrorSpy).toHaveBeenCalledWith('No path to collection provided! Use --collection');
  });

  it('should fail when runCount is 0.', () => {
    process.argv = ['test', '--collection="./sample-collections/TSTcloud.postman_collection.json"', '--runCount=0'];
    require('./index.js');
    expect(consoleErrorSpy).toHaveBeenCalledWith('Provided runCount is less or equal than 0!');
  });

  it('should fail when runCount is not an integer.', () => {
    process.argv = ['test', '--collection="./sample-collections/TSTcloud.postman_collection.json"', '--runCount=asdf'];
    require('./index.js');
    expect(consoleErrorSpy).toHaveBeenCalledWith('The runCount is not an integer!');
  });

  it('should run collection 10 times when no runcount is provided.', () => {
    jest.doMock('newman', () => {
      return { run: jest.fn(() => {}) };
    });
    const newman = require('newman');

    const newmanRunSpy = jest.spyOn(newman, 'run');
    process.argv = ['test', '--collection="./sample-collections/TSTcloud.postman_collection.json"'];

    require('./index.js');
    expect(newmanRunSpy).toHaveBeenCalledTimes(10);
  });

  it('should run collection multiple times.', () => {
    jest.doMock('newman', () => {
      return { run: jest.fn(() => {}) };
    });
    const newman = require('newman');

    const newmanRunSpy = jest.spyOn(newman, 'run');
    process.argv = ['test', '--collection="./sample-collections/TSTcloud.postman_collection.json"', '--runCount=30'];

    require('./index.js');
    expect(newmanRunSpy).toHaveBeenCalledTimes(30);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
