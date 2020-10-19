import { generateConfig } from '../dist';

describe('config-generator', function () {
  it('test', function () {
    expect(generateConfig()).toEqual({});
  });
});
