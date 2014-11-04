'use strict';

describe('tag-sorted', function () {
    it('should load and create simple table', function () {
        var simpleTable = window.__html__['test/fixtures/simpleTable.html'];

        var div = document.createElement('div');
        div.innerHTML = simpleTable;
        var table = div.childNodes[0]; 

        console.log(table);

        table.sortByColumn(1, true);

        console.log(table);
    });
});
