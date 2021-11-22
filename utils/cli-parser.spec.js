import { getCliArguments } from './cli-parser';

describe('cli-parser', () => {
  it('should return arguments', () => {
    process.argv = 'test --xyz=var --an=blu'
    const args = getCliArguments();
    expect(args).toBe('');
  });
});
