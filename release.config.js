module.exports = {
  extends: '@kocal/semantic-release-preset',
  branches: [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main', // Until https://github.com/semantic-release/semantic-release/issues/1581 is fixed
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
};
