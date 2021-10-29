function readPackage(pkg, context) {
  if (pkg.dependencies && pkg.dependencies['caniuse-lite']) {
    pkg.dependencies['caniuse-lite'] = '^1.0.30001272';
    context.log(`${pkg.name} caniuse-lite use ${pkg.dependencies['caniuse-lite']}.`)
  }

  return pkg
}

module.exports = {
  hooks: {
    readPackage
  }
}
