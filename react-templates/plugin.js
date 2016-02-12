Plugin.registerCompiler({
  extensions: ['rt'],
}, function () {
  return new ReactCompiler();
});

