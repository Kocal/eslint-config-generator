import { isPackageInstalled } from './package-helper';

describe('Package helper', () => {
  describe('isPackageInstalled()', () => {
    it('when a package is installed', () => {
      expect(isPackageInstalled('eslint-config-airbnb-base')).toBeTruthy();
    });

    it('when a package is not installed', () => {
      expect(isPackageInstalled('foo-bar')).toBeFalsy();
    });
  });
});
