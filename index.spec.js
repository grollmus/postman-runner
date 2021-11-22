describe('postman-runner', () => {
  beforeEach(() => {
    process.argv = ['', ''];
  });

  it('should fail when no path to collection was provided.', () => {
    expect(() => require('./index.js')).toThrow('No path to collection provided! Use --collection');
  });

  it('should run collection multiple times.', () => {
    jest.doMock('newman', () => {
      return { run: jest.fn(() => {}) };
    });
    const newman = require('newman');

    process.argv = ['test', '--collection="./sample-collections/TSTcloud.postman_collection.json"', '--runCount=30'];

    require('./index.js');
    expect(newman.run).toHaveBeenCalledTimes(30);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
