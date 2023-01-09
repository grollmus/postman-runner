const cliParser = require('./cli-parser.js');

describe('cli-parser', () => {
  it.each([
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--foo=bar'],
      expected: { collection: 'bar', runCount: 20, insecure: undefined },
    },
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--insecure'],
      expected: { collection: 'bar', runCount: 20, insecure: true },
    },
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--insecure=false'],
      expected: { collection: 'bar', runCount: 20, insecure: 'false' },
    },
  ])('should return valid runner args', ({ argv, expected }) => {
    process.argv = argv;
    const args = cliParser.getCliArguments();
    expect(args).toStrictEqual(expected);
  });
});
