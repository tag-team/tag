'use strict';

describe('tag-sorted', function () {
    it('should be tested with karma', function () {
        expect(true).toBe(true);
    });

    it('should always be green as well', function () {
        var simpleTable = window.__html__['test/fixtures/simpleTable.html'];

        var div = document.createElement('div');
        div.innerHTML = simpleTable;
        var elements = div.childNodes;

        console.log(elements);
    });
});
