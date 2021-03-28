import { isPackageInstalled } from './package-helper';

describe('Package helper', () => {
  describe('isPackageInstalled()', function () {
    it('when a package is installed', function () {
      expect(isPackageInstalled('eslint-config-airbnb-base')).toBeTruthy();
    });

    it('when a package is not installed', function () {
      expect(isPackageInstalled('foo-bar')).toBeFalsy();
    });
  });
});
