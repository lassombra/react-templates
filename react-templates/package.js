Package.describe({
  name: 'lassombra:react-templates',
  version: '0.0.3',
  summary: 'Compiler plugin that converts *.rt files to be used by react components.',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'react-templates-compiler',
  use: ['lassombra:react-templates-compiler@0.0.4'],
  sources: ['plugin.js']
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('underscore@1.0.4');
  api.use('react-runtime@0.14.4');
  api.addFiles('runtime.js');
  api.imply('react-runtime');
  api.imply('underscore');
});

Package.onTest(function (api) {
  api.use(["tinytest", "underscore"]);
});
