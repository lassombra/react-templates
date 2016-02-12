Package.describe({
    name: 'lassombra:react-templates-compiler',
    version: '0.0.4',
    summary: 'Compiler plugin that converts *.rt files to be used by react components.',
    documentation: 'README.md'
});

Npm.depends({'react-templates':'0.1.20'});

Package.onUse(function (api) {
    api.addFiles('compiler.js', 'server');
    api.export('ReactCompiler', 'server');
});

Package.onTest(function (api) {
    api.use(["tinytest", "underscore"]);
});