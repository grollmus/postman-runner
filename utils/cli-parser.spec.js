const cliParser = require('./cli-parser.js');

describe('cli-parser', () => {
  it('should return arguments', () => {
    process.argv = ['path', '--foo=bar', '--foobar=false'];
    const args = cliParser.getCliArguments();
    expect(args).toStrictEqual({ foo: 'bar', foobar: 'false' });
  });
});
