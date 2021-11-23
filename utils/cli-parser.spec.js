const cliParser = require('./cli-parser.js');

describe('cli-parser', () => {
  it('should return valid runner args', () => {
    process.argv = ['path', '--collection=bar', '--runCount=20', '--foo=bar'];
    const args = cliParser.getCliArguments();
    expect(args).toStrictEqual({ collection: 'bar', runCount: 20 });
  });
});
