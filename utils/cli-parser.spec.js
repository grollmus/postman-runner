const cliParser = require('./cli-parser.js');

describe('cli-parser', () => {
  it.each([
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--foo=bar'],
      expected: { collection: 'bar', runCount: 20, insecure: undefined, folder: '' },
    },
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--insecure'],
      expected: { collection: 'bar', runCount: 20, insecure: true, folder: '' },
    },
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--insecure=false'],
      expected: { collection: 'bar', runCount: 20, insecure: 'false', folder: '' },
    },
    {
      argv: ['path', '--collection=bar', '--runCount=20', '--folder=thisismycustomfolder'],
      expected: { collection: 'bar', runCount: 20, insecure: undefined, folder: 'thisismycustomfolder' },

    },
  ])('should return valid runner args', ({ argv, expected }) => {
    process.argv = argv;
    const args = cliParser.getCliArguments();
    expect(args).toStrictEqual(expected);
  });
});
