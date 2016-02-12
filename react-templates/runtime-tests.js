if (Meteor.isClient) {
    Tinytest.add('react templates runtime - tests get run', test => {
        test.isTrue(true);
    });
    Tinytest.add('react templates runtime - _.assign is defined', test => {
        test.isNotUndefined(_.assign);
    });
    Tinytest.add('react templates runtime - _.assign assigns own variables', test => {
        let setup = {a:true, b:true};
        let assigned = _.assign({}, setup);
        test.isTrue(assigned.a);
        test.isTrue(assigned.b);
    });
    Tinytest.add('react templates runtime - _.assign does not assign prototype variables', test => {
        let prototype = {c:true};
        let setup = Object.create(prototype);
        setup.a = true;
        setup.b = true;
        let assigned = _.assign({}, setup);
        test.isFalse(assigned.c);
    });
}