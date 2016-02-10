# React Templates for Meteor

Early Alpha, Meteor build wrapper for [https://github.com/wix/react-templates](https://github.com/wix/react-templates)

Currently no tests are in place, but those are coming.  Unfortunately, react-templates doesn't understand Meteor packages, so I've had to do some tweaking.  This won't be as necessary after Meteor 1.3, but in the meantime, this is how it is.

## How to use
Simply place your templates in a file that ends in `.rt`.  That file will be compiled into a render function.  The name of the render function will be either the file name, or the contents of a comment at the top of the file of the format `<!-- name="name-to-use" -->`.

The name will be processed into a camelCased version of the original non camel-case name.  (All non-word characters will be stripped, and following characters will be pushed to upper case).

Finally, the function will be the result of an IIFE which wraps React and _ so they must be in scope at the time the file would run.  Don't worry, I took care of that for you.  This package implies react and underscore so that your render functions should work flawlessly.  Other components you use simply need to be in Meteor global or package global scope in order to render correctly.  And don't worry, as long as they start with a capital letter, the compiler knows to use the React class and not try to use some html tag.  Be watching for examples shortly.

### License

Released Under MIT
