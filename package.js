Package.describe({
  name: 'lassombra:react-templates',
  version: '0.0.1',
  summary: 'Compiler plugin that converts *.rt files to be used by react components.',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: 'react-templates-compiler',
  use: ['lassombra:react-templates-compiler@0.0.2'],
  sources: ['plugin.js']
});

Package.onUse(function (api) {
  api.use('isobuild:compiler-plugin@1.0.0');
  api.use('underscore');
  api.use('react');
  api.addFiles('runtime.js');
  api.imply('react');
  api.imply('underscore');
});

Package.onTest(function (api) {
  api.use(["tinytest", "underscore"]);
});
