/**
 * These are all closed up in the closure created by Meteor.
 *
 * This mechanism is handy for things like this where I don't really want
 * to create them every time someone instantiates the compiler as they can
 * be 100% shared between all instances.
 */
var compiler = Npm.require('react-templates');
var defineRegex = /define\(\[(\s*\'[\w\/]*\',?)*\s*\], function/m;
var commentRegex = /<!--.*-->/m;
var nameRegex = /name="(.*)"/m;

// constructor doesn't need to do anything.  The prototype will do all of the work.
function Compiler() {}
Compiler.prototype.processFilesForTarget = function(files) {
    files.forEach(function (file) {
        var contents = file.getContentsAsString();
        var displayName = file.getDisplayPath();
        var compiled = this.processFile(displayName, contents);
        file.addJavaScript({data: compiled, path: file.getPathInPackage() + '.js'});
    });
};
/**
 * Returns a string containing the compiled output (instead of passing it through to meteor automatically.
 */
Compiler.prototype.processFile = function(displayName, contents) {
    var name = getFunctionName(displayName, contents);
    return createIIFE(contents, name);
};

/**
 * Takes an arbitrary string and converts it to a camel cased string
 * containing only letters and nubmers ('word' characters)
 * @param name {string} name with any allowed characters.
 * @returns {string} camel cased version
 */
function toCamelCase(name) {
    var tokens = name.split(/\W+/g);
    var first = tokens.shift();
    tokens = tokens.map(function (token) {
        return token.charAt(0).toUpperCase() + token.slice(1);
    });
    tokens.unshift(first);
    return tokens.join('');
}

/**
 * Helper function to extract a name defined in comments.
 * Ordinarily, the react-templates compiler builds IIFEs without names
 * intending them to be wrapped.  We have to create a name here since
 * we aren't wrapping by default
 *
 * Name comments need to be at the beginning, and should take the form
 * <!-- name="{some name}" -->
 *
 * @param displayName {string} the name of the file
 * @param contents {string} the contents of the file
 * @returns {string}
 */
function getFunctionName(displayName, contents) {
    var name = displayName;
    name = name.split('/').pop();
    name = name.split('.rt')[0];
    // comment will have the first HTML comment in the contents if one exists.
    var comment = commentRegex.exec(contents);
    comment = comment && comment[0];
    if (comment) {
        // try to parse out a name, format name="{name}" we only care about the part in the quotes
        var tempName = nameRegex.exec(comment);
        tempName = tempName && tempName[1];
        if (tempName) {
            // IF we got a name from the comments, replace the name we're holding onto.
            name = tempName;
        }
    }
    // camel case whatever we got on our way back out.
    return toCamelCase(name);
}

/**
 * The work horse.  This actually creates the javascript code which will close on React and underscore
 * to create a render function.  The render function may have inline helper functions which are defined
 * by the compiler.
 *
 * @param contents {string} the contents of the .rt file to convert into an IIFE returning a React render function
 * @param name {string} the name of the render function to be returned by the IIFE.
 * @returns {string} full javascript implementation of an IIFE closing on React and underscore and placing a function in
 * global scope (package global if in a package).  Intended to be consumed by Meteor's javascript compilation process.
 */
function createIIFE(contents, name) {
    // first step is to just run the compiler.  This outputs an AMD compatible define function.
    // Meteor doesn't cooperate with AMD compatible defines, so it really isn't ideal.
    // TODO: Implement a Meteor module system for this compiler.  Probably will have to fork the compiler to do so.
    var compiled = compiler.convertTemplateToReact(contents);
    // the first regex strips off all of the module definitions from AMD defines.  This line sets up the IIFE
    compiled = compiled.replace(defineRegex, name + ' = (function');
    // The output from the compiled function contains an ending ); which we don't want.  Strip it.
    compiled = compiled.slice(0, compiled.length - 2);
    // Close the IIFE and invoke closing on React and _.  Both should be in scope for whatever package uses this.
    // The template package will actually imply these as they must be in the scope of the target package.
    compiled += ')(React, _);';
    return compiled;
}

// Give it the export name so that Meteor Exports can find this.
ReactCompiler = Compiler;