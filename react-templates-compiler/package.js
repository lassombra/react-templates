Package.describe({
    name: 'lassombra:react-templates-compiler',
    version: '0.0.5',
    summary: 'Compiler plugin that converts *.rt files to be used by react components.',
    documentation: 'README.md',
    git: 'https://github.com/lassombra/react-templates'
});

Npm.depends({'react-templates':'0.1.20'});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.addFiles('compiler.js', 'server');
    api.export('ReactCompiler', 'server');
});

Package.onTest(function (api) {
    api.use(["tinytest", "underscore"]);
    api.use('ecmascript');
    api.use('lassombra:react-templates-compiler');
});